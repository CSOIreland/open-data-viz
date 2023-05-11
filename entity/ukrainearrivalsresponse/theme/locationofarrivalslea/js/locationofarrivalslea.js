// Load the config.json into the application
api.ajax.config("entity/ukrainearrivalsresponse/theme/locationofarrivalslea/config/locationofarrivalslea.config.json", function (config) {
    // Parse JSON string into object
    app.ukrainearrivalsresponse.locationofarrivalslea.config = config;

}, { async: false });

$(document).ready(function () {

    app.ukrainearrivalsresponse.locationofarrivalslea.ajax.getHeadlineFiguresMetadata();
    app.ukrainearrivalsresponse.locationofarrivalslea.ajax.getCountyData();
    app.ukrainearrivalsresponse.locationofarrivalslea.ajax.getLeaData();
    // app.ukrainearrivalsresponse.locationofarrivalslea.drawMap();
    //draw widget queue always last
    // pxWidget.draw.queue();
    // Translate labels language (Last to run)
    app.library.html.parseStaticLabel();

});