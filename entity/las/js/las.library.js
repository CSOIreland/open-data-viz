/*******************************************************************************
Custom JS application specific ima.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table
app.las = {};
app.las.ajax = {};
app.las.callback = {};
app.las.geojson = null;
app.las.selectedBoundary = null;
app.las.map = null;
app.las.saleliteLayer = null;
app.las.marker = null;
app.las.allAreas = [];
app.las.featuresLayers = [];
app.las.featureRequested = null;
app.las.goTo = {};
app.las.goTo.boundary = null;
app.las.goTo.guid = null;
app.las.goTo.theme = null;
app.las.snippetCode = null;
app.las.sateliteLayer = null;
app.las.timeSeries = null;
//#endregion

app.las.heading = function () {
    var heading = $("#template").find("[name=entity-heading]").clone();
    heading.find("[name=heading-text]").text(app.label.entity.las["title"]);
    heading.find("[name=sub-heading-text]").html(app.label.entity.las["explanation"]);
    $('meta[name=description]').attr('description', app.label.entity.las["metaDescription"]);
    $("#visual-las").find("[name=heading]").append(heading);
    app.library.html.fullScreen($("#visual-las"));
};

app.las.buildSelections = function () {    //boundaries
    $.each(app.las.config.boundaries, function (index, value) {
        $("#visual-las-boundary-select").find("[name=boundaries]").append(
            $("<option>", {
                "value": value.classification,
                "text": value.name
            })
        ).once("change", async function () {
            $("#visual-las-themes").hide();
            api.spinner.start();
            await new Promise(resolve => setTimeout(resolve, 400));
            app.las.ajax.getGeojson();
            if (app.las.goTo.guid) {
                $("#visual-las-map-wrapper").find("[name=select-area]").val(app.las.goTo.guid).trigger("change").trigger({
                    type: 'select2:select',
                    params: {
                        data: $("#visual-las-map-wrapper").find("[name=select-area]").select2('data')[0]
                    }
                });
            }
            app.las.goTo.guid = null;

            var theme = api.uri.getParam("theme") || null;
            var guid = api.uri.getParam("guid") || null;
            var boundary = $(this).val();

            history.replaceState({}, '', "?body=" + api.uri.getParam("body") + "&boundary=" + $("#visual-las-boundary-select").find("[name=boundaries]").val() + (boundary == api.uri.getParam("boundary") && guid ? "&guid=" + guid : "") + (theme ? "&theme=" + theme : ""));
            //Link for sharing
            $(".sharethis-sticky-share-buttons").attr("data-url", window.location.href);
            api.spinner.stop();
        });
        api.spinner.stop();
    });

    app.las.ajax.getGeojson();

};

app.las.populateAreasDropdown = function () {
    app.las.allAreas = app.las.geo.getFeaturesForSelect(app.las.geojson);
    //populate dropdown in modal with month (select 2)
    $("#visual-las-map-wrapper").find("[name=select-area]").empty().append($("<option>")).select2({
        minimumInputLength: 0,
        allowClear: true,
        width: '80%',
        placeholder: "Select an Area",
        data: app.las.allAreas
    }).once('select2:select', function (e) {
        if ($(this).val()) {
            app.las.selectAreasFromDropdown($(this).val());
        }
    });
};

app.las.selectAreasFromDropdown = function (guid) {
    app.las.featuresLayers.eachLayer(function (layer) {
        if (layer.feature.properties.code == guid) {
            var center = turf.center(layer.feature);
            var coordinates = {
                latitude: center.geometry.coordinates[1],
                longitude: center.geometry.coordinates[0]
            };
            app.las.placeChanged(coordinates, guid, true);
            return
        };
    });
};

app.las.ajax.getGeojson = function () {

    app.las.selectedBoundary = $.grep(app.las.config.boundaries, function (element, index) {
        return element.classification == $("#visual-las-boundary-select").find("[name=boundaries]").val();
    });

    api.ajax.static(app.las.selectedBoundary[0].url, function (data) {
        // Parse JSON string into object
        app.las.geojson = data;
        app.las.populateAreasDropdown();
        app.las.renderMap();

    }, { async: false });

    if (app.las.goTo.theme) {
        if (app.las.goTo.theme == "all") {
            $("#visual-las-themes").find("[name=all-data]").trigger("click");
        }
        else {
            $("#visual-las-themes").find("[name='theme-card'] a[theme='" + app.las.goTo.theme + "']").trigger("click");
        }

    }
    app.las.goTo.theme = null;
};

app.las.renderMap = function () {
    if (app.las.map) {
        app.las.map.remove();
    };
    app.las.map = L.map('visual-las-map', {
        maxBounds: app.las.geo.getMaxBounds(app.las.geojson)
    });

    //Open street map, no labels
    var osmLayer = L.tileLayer(app.las.config.baseMap.leaflet.url, app.las.config.baseMap.leaflet.options).addTo(app.las.map);
    //esri OSI basemap
    var osiLayer = L.esri.tiledMapLayer(app.las.config.baseMap.esri.baseMapOSI).addTo(app.las.map);
    //esri satelite basemap
    app.las.saleliteLayer = L.tileLayer(app.las.config.baseMap.esri.saletileLayer.url, {
        attribution: app.las.config.baseMap.esri.saletileLayer.attribution
    });

    var featuresLayersOptions = {
        "weight": app.las.selectedBoundary[0].weight,
        "color": "#2F6D67",
        "onEachFeature": function (feature, layer) {
            layer.on("click", function (e) {
                //clear any selection from dropdown
                $("#visual-las-map-wrapper").find("[name=select-area]").val(null).trigger('change')
                var coordinates = {
                    latitude: e.latlng.lat,
                    longitude: e.latlng.lng
                };

                app.las.placeChanged(coordinates, layer.feature.properties.code, false);
                $('html, body').animate({ scrollTop: $('#visual-las-themes').offset().top }, 1000);

            });
            layer.on("mouseover", function (e) {
                layer.bindTooltip(layer.feature.properties.en).openTooltip(e.latlng);
                layer.setStyle({
                    'weight': 3
                });


            });
            layer.on("mouseout", function (e) {
                layer.setStyle({
                    'weight': app.las.selectedBoundary[0].weight
                });
            });
        }
    };

    app.las.featuresLayers = L.geoJSON(app.las.geojson, featuresLayersOptions).addTo(app.las.map);

    app.las.map.fitBounds(app.las.featuresLayers.getBounds());
    app.las.map.setMinZoom(app.las.map.getZoom());

    L.easyButton('fas fa-home', function () {
        app.las.map.fitBounds(app.las.featuresLayers.getBounds());
    }, "Reset").addTo(app.las.map);

    L.easyButton({
        states: [{
            stateName: 'show-satelite',
            icon: 'fas fa-globe',
            title: 'Satelite View',
            onClick: function (control) {
                app.las.map.removeLayer(osmLayer);
                app.las.map.removeLayer(osiLayer);
                app.las.map.addLayer(app.las.saleliteLayer);
                control.state('remove-satelite');
                app.las.featuresLayers.setStyle({
                    "color": "#FFFFFF"
                });
            }
        }, {
            icon: 'fas fa-globe',
            stateName: 'remove-satelite',
            onClick: function (control) {
                app.las.map.addLayer(osmLayer);
                app.las.map.addLayer(osiLayer);
                app.las.map.removeLayer(app.las.saleliteLayer);
                control.state('show-satelite');
                app.las.featuresLayers.setStyle({
                    "color": "#2F6D67"
                });
            },
            title: 'Remove Satelite View'
        }]
    }).addTo(app.las.map);

    if ($("#visual-las-map-wrapper-search").val().trim().length) {
        var place = autocomplete.getPlace();
        if (place) {
            var coordinates = {
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng()
            };

            app.las.placeChanged(coordinates, null, true);
            app.las.map.setView([coordinates.latitude, coordinates.longitude], 13);
        }
    }
};

app.las.placeChanged = function (coordinates, code, showMarker) {
    $("#visual-las-themes").find("[name=boundary]").html($("#visual-las-boundary-select").find("[name=boundaries]").find('option:selected').text());
    var feature = null;
    if (!code) {
        feature = app.las.geo.getFeatureFromCoordinates(app.las.geojson, coordinates);
        if (!feature) {
            api.modal.error("Location is not in the selected boundary.");
            return;
        }
    }

    code = code || feature.properties.code;
    var area = $.grep(app.las.allAreas, function (element, index) {
        return element.id == code;
    });

    $("#visual-las-themes").find("[name=single-area-name]").html(area[0].text);

    //Link for sharing
    $(".sharethis-sticky-share-buttons").attr("data-url", window.location.href);
    var theme = api.uri.getParam("theme") || null;
    history.replaceState({}, '', "?body=" + api.uri.getParam("body") + "&boundary=" + $("#visual-las-boundary-select").find("[name=boundaries]").val() + "&guid=" + code + (theme ? "&theme=" + theme : ""));

    $("#visual-las-themes").show();
    if (app.las.marker) {
        app.las.map.removeLayer(app.las.marker)
    };

    if (showMarker) {
        app.las.marker = L.marker([coordinates.latitude, coordinates.longitude]).addTo(app.las.map).on('click', function (e) {  //must be lat/long for leaflet
            $('html, body').animate({ scrollTop: $('#visual-las-themes').offset().top }, 1000);
        });
    }

    app.las.featuresLayers.eachLayer(function (layer) {

        app.las.featuresLayers.resetStyle(layer);
        if (app.las.map.hasLayer(app.las.saleliteLayer)) {
            layer.setStyle({
                "color": "#FFFFFF"
            });
        };
        if (layer.feature.properties.code == code) {
            app.las.featureRequested = null;
            app.las.featureRequested = layer.feature.properties.code;
            layer.setStyle({
                'fillColor': 'yellow',
                'weight': app.las.selectedBoundary[0].weight,
                'opacity': 1
            });  //highlights selected.
            //fit bounds to circle
            app.las.map.fitBounds(layer.getBounds());
            return
        }
    });
};



//#region my location
app.las.callback.getMyLocationSuccess = function (position) {
    $("#visual-las-map-wrapper-search").val("");
    //get the feature that marker is in
    var coordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    };

    app.las.placeChanged(coordinates, null, true);
    //clear any selection from dropdown
    $("#visual-las-map-wrapper").find("[name=select-area]").val(null).trigger('change')

};
//#endregion my location

//#region google maps API autocomplete
initMapIma = function () {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('visual-las-map-wrapper-search'), {
        componentRestrictions: { country: 'ie' }
    });

    autocomplete.addListener('place_changed', app.las.callback.autoCompleteOnPlaceChanged);

};

app.las.callback.autoCompleteOnPlaceChanged = function () {
    var place = autocomplete.getPlace();
    //get the feature that marker is in
    var coordinates = {
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng()
    };

    app.las.placeChanged(coordinates, null, true);
    app.las.map.setView([coordinates.latitude, coordinates.longitude], 13);
};
//#endregion google maps API autocomplete

//#region pdf
app.las.ajax.getPdf = function (theme, guid, areaName) {
    api.ajax.jsonrpc.request(
        app.config.url.api.pdf.jsonrpc,
        "PDFapi.Data.Convert_API.Create",
        {
            "urls": [encodeURI(app.config.url.application + "?body=entity/ima/cop/2016&pdf=true&noheader=true&nonavbar=true&nofooter=true"
                + "&theme=" + theme
                + "&boundarycode=" + $("#visual-las-boundary-select").find("[name=boundaries]").val()
                + "&guid=" + guid
                + "&areaName=" + areaName)
            ],
            "printOptions": {
                "scale": .8,
                "displayHeaderFooter": true,
                "headerTemplate": "",
                "footerTemplate": "<div style='padding-left: 10px'>"
                    + "<span style='font-size:10px;' class='pageNumber'></span> "
                    + "<span style='font-size:10px'>/</span> "
                    + "<span style='font-size:10px' class='totalPages'></span>"
                    + "</div>"

            },
            "returnType": "base64String"
        },
        "app.las.callback.getPdfOnSuccess",
        {
            "areaName": areaName,
            "theme": theme
        },
        "app.las.callback.getPdfOnError"

    );
};

app.las.callback.getPdfOnSuccess = function (data, params) {
    var fileName = (app.las.config.title + "_" + params.areaName + "_" + (params.theme == "all" ? "all_themes" : "theme_" + params.theme)).replace(/ /g, "_").toLowerCase();
    app.library.utility.download(fileName, data, "pdf", "application/pdf", true);
    api.spinner.stop();
};

app.las.callback.getPdfOnError = function () {
    api.spinner.stop();
};
//#endregion