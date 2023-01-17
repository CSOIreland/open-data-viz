/*******************************************************************************
Custom JS application specific ima.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table
app.ima = {};
app.ima.ajax = {};
app.ima.callback = {};
app.ima.geojson = null;
app.ima.selectedBoundary = null;
app.ima.map = null;
app.ima.saleliteLayer = null;
app.ima.marker = null;
app.ima.allAreas = [];
app.ima.featuresLayers = [];
app.ima.featureRequested = null;
app.ima.goTo = {};
app.ima.goTo.boundary = null;
app.ima.goTo.guid = null;
app.ima.goTo.theme = null;
app.ima.snippetCode = null;
app.ima.sateliteLayer = null;
app.ima.timeSeries = null;
//#endregion

app.ima.heading = function () {
    var application = app.ima.rootConfig.entity[api.uri.getParam("body")].application;
    var heading = $("#template").find("[name=entity-heading]").clone();

    switch (application) {
        case "cop":
            heading.find("[name=heading-text]").text(app.label.entity.censusMapping["title"]);
            heading.find("[name=sub-heading-text]").html(app.label.entity.censusMapping["explanation"]);
            $('meta[name=description]').attr('description', app.label.entity.censusMapping["metaDescription"]);
            break;
        case "coa":
            heading.find("[name=heading-text]").text(app.label.entity.agrimap["title"]);
            heading.find("[name=sub-heading-text]").html(app.label.entity.agrimap["explanation"]);
            $('meta[name=description]').attr('description', app.label.entity.agrimap["metaDescription"]);
            break;
        default:
            break;
    }




    $("#visual-ima").find("[name=heading]").append(heading);
    app.library.html.fullScreen($("#visual-ima"));
};

app.ima.buildSelections = function () {    //boundaries
    $.each(app.ima.config.boundaries, function (index, value) {
        $("#visual-ima-selections").find("[name=boundaries]").append(
            $("<option>", {
                "value": value.classification,
                "text": value.name
            })
        ).once("change", async function () {
            $("#visual-ima-themes").hide();
            api.spinner.start();
            await new Promise(resolve => setTimeout(resolve, 400));
            app.ima.ajax.getGeojson();
            if (app.ima.goTo.guid) {
                $("#visual-ima-map-wrapper").find("[name=select-area]").val(app.ima.goTo.guid).trigger("change").trigger({
                    type: 'select2:select',
                    params: {
                        data: $("#visual-ima-map-wrapper").find("[name=select-area]").select2('data')[0]
                    }
                });
            }
            app.ima.goTo.guid = null;

            var theme = api.uri.getParam("theme") || null;
            var guid = api.uri.getParam("guid") || null;
            var boundary = $(this).val();

            history.replaceState({}, '', "?body=" + api.uri.getParam("body") + "&boundary=" + $("#visual-ima-selections").find("[name=boundaries]").val() + (boundary == api.uri.getParam("boundary") && guid ? "&guid=" + guid : "") + (theme ? "&theme=" + theme : ""));
            //Link for sharing
            $(".sharethis-sticky-share-buttons").attr("data-url", window.location.href);
            api.spinner.stop();
        });
        api.spinner.stop();
    });

    app.ima.ajax.getGeojson();

};

app.ima.populateAreasDropdown = function () {
    app.ima.allAreas = app.ima.geo.getFeaturesForSelect(app.ima.geojson);
    //populate dropdown in modal with month (select 2)
    $("#visual-ima-map-wrapper").find("[name=select-area]").empty().append($("<option>")).select2({
        minimumInputLength: 0,
        allowClear: true,
        width: '80%',
        placeholder: "Select an Area",
        data: app.ima.allAreas
    }).once('select2:select', function (e) {
        if ($(this).val()) {
            app.ima.selectAreasFromDropdown($(this).val());
        }
    });
};

app.ima.selectAreasFromDropdown = function (guid) {
    app.ima.featuresLayers.eachLayer(function (layer) {
        if (layer.feature.properties.code == guid) {
            var center = turf.center(layer.feature);
            var coordinates = {
                latitude: center.geometry.coordinates[1],
                longitude: center.geometry.coordinates[0]
            };
            app.ima.placeChanged(coordinates, guid, true);
            return
        };
    });
};

app.ima.ajax.getGeojson = function () {

    app.ima.selectedBoundary = $.grep(app.ima.config.boundaries, function (element, index) {
        return element.classification == $("#visual-ima-selections").find("[name=boundaries]").val();
    });

    api.ajax.static(app.ima.selectedBoundary[0].url, function (data) {
        // Parse JSON string into object
        app.ima.geojson = data;
        app.ima.populateAreasDropdown();
        app.ima.renderMap();

    }, { async: false });

    if (app.ima.goTo.theme) {
        if (app.ima.goTo.theme == "all") {
            $("#visual-ima-themes").find("[name=all-data]").trigger("click");
        }
        else {
            $("#visual-ima-themes").find("[name='theme-card'] a[theme='" + app.ima.goTo.theme + "']").trigger("click");
        }

    }
    app.ima.goTo.theme = null;
};

app.ima.renderMap = function () {
    if (app.ima.map) {
        app.ima.map.remove();
    };
    app.ima.map = L.map('visual-ima-map', {
        maxBounds: app.ima.geo.getMaxBounds(app.ima.geojson)
    });

    //Open street map, no labels
    var osmLayer = L.tileLayer(app.ima.config.baseMap.leaflet.url, app.ima.config.baseMap.leaflet.options).addTo(app.ima.map);
    //esri OSI basemap
    var osiLayer = L.esri.tiledMapLayer(app.ima.config.baseMap.esri.baseMap).addTo(app.ima.map);
    //esri satelite basemap
    app.ima.saleliteLayer = L.esri.Vector.vectorBasemapLayer(app.ima.config.baseMap.esri.saletileLayer, { apiKey: app.ima.config.baseMap.esri.apiKey });

    var featuresLayersOptions = {
        "weight": app.ima.selectedBoundary[0].weight,
        "color": "#2F6D67",
        "onEachFeature": function (feature, layer) {
            layer.on("click", function (e) {
                //clear any selection from dropdown
                $("#visual-ima-map-wrapper").find("[name=select-area]").val(null).trigger('change')
                var coordinates = {
                    latitude: e.latlng.lat,
                    longitude: e.latlng.lng
                };

                app.ima.placeChanged(coordinates, layer.feature.properties.code, false);
                $('html, body').animate({ scrollTop: $('#visual-ima-themes').offset().top }, 1000);

            });
            layer.on("mouseover", function (e) {
                layer.bindTooltip(layer.feature.properties.en).openTooltip(e.latlng);
                layer.setStyle({
                    'weight': 3
                });


            });
            layer.on("mouseout", function (e) {
                layer.setStyle({
                    'weight': app.ima.selectedBoundary[0].weight
                });
            });
        }
    };

    app.ima.featuresLayers = L.geoJSON(app.ima.geojson, featuresLayersOptions).addTo(app.ima.map);

    app.ima.map.fitBounds(app.ima.featuresLayers.getBounds());
    app.ima.map.setMinZoom(app.ima.map.getZoom());

    L.easyButton('fas fa-home', function () {
        app.ima.map.fitBounds(app.ima.featuresLayers.getBounds());
    }, "Reset").addTo(app.ima.map);

    L.easyButton({
        states: [{
            stateName: 'show-satelite',
            icon: 'fas fa-globe',
            title: 'Satelite View',
            onClick: function (control) {
                app.ima.map.removeLayer(osmLayer);
                app.ima.map.removeLayer(osiLayer);
                app.ima.map.addLayer(app.ima.saleliteLayer);
                control.state('remove-satelite');
                app.ima.featuresLayers.setStyle({
                    "color": "#FFFFFF"
                });
            }
        }, {
            icon: 'fas fa-globe',
            stateName: 'remove-satelite',
            onClick: function (control) {
                app.ima.map.addLayer(osmLayer);
                app.ima.map.addLayer(osiLayer);
                app.ima.map.removeLayer(app.ima.saleliteLayer);
                control.state('show-satelite');
                app.ima.featuresLayers.setStyle({
                    "color": "#2F6D67"
                });
            },
            title: 'Remove Satelite View'
        }]
    }).addTo(app.ima.map);

    if ($("#visual-ima-map-wrapper-search").val().trim().length) {
        var place = autocomplete.getPlace();
        if (place) {
            var coordinates = {
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng()
            };

            app.ima.placeChanged(coordinates, null, true);
            app.ima.map.setView([coordinates.latitude, coordinates.longitude], 13);
        }
    }
};

app.ima.placeChanged = function (coordinates, code, showMarker) {
    $("#visual-ima-themes").find("[name=boundary]").html($("#visual-ima-selections").find("[name=boundaries]").find('option:selected').text());
    var feature = null;
    if (!code) {
        feature = app.ima.geo.getFeatureFromCoordinates(app.ima.geojson, coordinates);
        if (!feature) {
            api.modal.error("Location is not in the selected boundary.");
            return;
        }
    }

    code = code || feature.properties.code;
    var area = $.grep(app.ima.allAreas, function (element, index) {
        return element.id == code;
    });

    $("#visual-ima-themes").find("[name=single-area-name]").html(area[0].text);

    //Link for sharing
    $(".sharethis-sticky-share-buttons").attr("data-url", window.location.href);
    var theme = api.uri.getParam("theme") || null;
    history.replaceState({}, '', "?body=" + api.uri.getParam("body") + "&boundary=" + $("#visual-ima-selections").find("[name=boundaries]").val() + "&guid=" + code + (theme ? "&theme=" + theme : ""));

    $("#visual-ima-themes").show();
    if (app.ima.marker) {
        app.ima.map.removeLayer(app.ima.marker)
    };

    if (showMarker) {
        app.ima.marker = L.marker([coordinates.latitude, coordinates.longitude]).addTo(app.ima.map).on('click', function (e) {  //must be lat/long for leaflet
            $('html, body').animate({ scrollTop: $('#visual-ima-themes').offset().top }, 1000);
        });
    }

    app.ima.featuresLayers.eachLayer(function (layer) {

        app.ima.featuresLayers.resetStyle(layer);
        if (app.ima.map.hasLayer(app.ima.saleliteLayer)) {
            layer.setStyle({
                "color": "#FFFFFF"
            });
        };
        if (layer.feature.properties.code == code) {
            app.ima.featureRequested = null;
            app.ima.featureRequested = layer.feature.properties.code;
            layer.setStyle({
                'fillColor': 'yellow',
                'weight': app.ima.selectedBoundary[0].weight,
                'opacity': 1
            });  //highlights selected.
            //fit bounds to circle
            app.ima.map.fitBounds(layer.getBounds());
            return
        }
    });
};



//#region my location
app.ima.callback.getMyLocationSuccess = function (position) {
    $("#visual-ima-map-wrapper-search").val("");
    //get the feature that marker is in
    var coordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    };

    app.ima.placeChanged(coordinates, null, true);
    //clear any selection from dropdown
    $("#visual-ima-map-wrapper").find("[name=select-area]").val(null).trigger('change')

};
//#endregion my location

//#region google maps API autocomplete
initMapIma = function () {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('visual-ima-map-wrapper-search'), {
        componentRestrictions: { country: 'ie' }
    });

    autocomplete.addListener('place_changed', app.ima.callback.autoCompleteOnPlaceChanged);

};

app.ima.callback.autoCompleteOnPlaceChanged = function () {
    var place = autocomplete.getPlace();
    //get the feature that marker is in
    var coordinates = {
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng()
    };

    app.ima.placeChanged(coordinates, null, true);
    app.ima.map.setView([coordinates.latitude, coordinates.longitude], 13);
};
//#endregion google maps API autocomplete

//#region pdf
app.ima.ajax.getPdf = function (theme, guid, areaName) {
    api.ajax.jsonrpc.request(
        app.config.url.api.pdf.jsonrpc,
        "PDFapi.Data.Convert_API.Create",
        {
            "urls": [encodeURI(app.config.url.application + "?body=entity/ima/cop/2016&pdf=true&noheader=true&nonavbar=true&nofooter=true"
                + "&theme=" + theme
                + "&boundarycode=" + $("#visual-ima-selections").find("[name=boundaries]").val()
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
        "app.ima.callback.getPdfOnSuccess",
        {
            "areaName": areaName,
            "theme": theme
        },
        "app.ima.callback.getPdfOnError"

    );
};

app.ima.callback.getPdfOnSuccess = function (data, params) {
    var fileName = (app.ima.config.title + "_" + params.areaName + "_" + (params.theme == "all" ? "all_themes" : "theme_" + params.theme)).replace(/ /g, "_").toLowerCase();
    app.library.utility.download(fileName, data, "pdf", "application/pdf", true);
    api.spinner.stop();
};

app.ima.callback.getPdfOnError = function () {
    api.spinner.stop();
};
//#endregion