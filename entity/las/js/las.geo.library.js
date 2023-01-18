/*******************************************************************************
Application - Geo 
*******************************************************************************/
app = app || {};

app.las.geo = {};
app.las.geo.ajax = {};

app.las.geo.getFeaturesForSelect = function (geoJson) {
    var allAreas = [];
    $.each(geoJson.features, function (index, value) {
        allAreas.push({
            "id": value.properties.code,
            "text": value.properties.en
        })
    });

    // sort by name
    allAreas.sort(function (a, b) {
        var textA = a.text.toUpperCase(); // ignore upper and lowercase
        var textB = b.text.toUpperCase(); // ignore upper and lowercase
        if (textA < textB) {
            return -1;
        }
        if (textA > textB) {
            return 1;
        }

        // names must be equal
        return 0;
    });

    return allAreas;
};

app.las.geo.getMaxBounds = function (geoJson) {
    var enveloped = turf.envelope(geoJson);
    var height = (enveloped.bbox[1] - enveloped.bbox[3]);
    var width = (enveloped.bbox[0] - enveloped.bbox[2]);
    return [
        [enveloped.bbox[1] + (height / 2), enveloped.bbox[2] - (width / 2)],
        [enveloped.bbox[3] - (height / 2), enveloped.bbox[0] + (width / 2)]
    ];
};

app.las.geo.getFeaturesInRadius = function (geoJson, coordinates, buffer) {
    var buffered = turf.buffer(turf.point([coordinates.longitude, coordinates.latitude]), buffer);
    var features = [];

    $.each(geoJson.features, function (index, value) {
        if (turf.booleanIntersects(buffered.geometry, value.geometry)) {
            features.push(value.properties.code)
        }
    });
    return features
};

app.las.geo.getFeatureFromCoordinates = function (geoJson, coordinates) {
    var feature = null;
    var points = turf.points([
        [coordinates.longitude, coordinates.latitude] //must be long/lat for turf
    ]);
    $.each(geoJson.features, function (index, value) {
        if (value.geometry.type == "Polygon") {
            var searchWithin = turf.polygon(value.geometry.coordinates);

            var ptsWithin = turf.pointsWithinPolygon(points, searchWithin);
            if (ptsWithin.features.length) {
                feature = value;
                return false;
            }
        }
        else { //must be MultiPolygon
            $.each(value.geometry.coordinates, function (index2, valueCordinates) {
                var searchWithin = turf.polygon(valueCordinates);

                var ptsWithin = turf.pointsWithinPolygon(points, searchWithin);
                if (ptsWithin.features.length) {
                    feature = value;
                    return false;
                }
            });
        }
    });

    return feature;

};

app.las.isInGeoJSON = function (geoJson, coordinates) {
    var points = turf.points([
        [coordinates.longitude, coordinates.latitude] //must be long/lat for turf
    ]);
    return turf.pointsWithinPolygon(points, geoJson).features.length ? true : false;
};

app.las.geo.getCurrentPosition = function (callbackOnSuccess) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callbackOnSuccess, app.las.geo.getCurrentPositioCallbackOnError);
    } else {
        api.modal.error("Geolocation is not available. Please ensure your device supports Geolocation and that you have allowed access to your location.")
    }
};

app.las.geo.getCurrentPositioCallbackOnError = function () {
    api.modal.error("Geolocation is not available. Please ensure your device supports Geolocation and that you have allowed access to your location.")
};