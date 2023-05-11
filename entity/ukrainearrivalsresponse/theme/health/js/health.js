// Load the config.json into the application
api.ajax.config("entity/ukrainearrivalsresponse/theme/health/config/health.config.json", function (config) {
    // Parse JSON string into object
    app.ukrainearrivalsresponse.health.config = config;

}, { async: false });


$(document).ready(function () {

    app.ukrainearrivalsresponse.health.ajax.getHeadlineFiguresMetadata();
    app.ukrainearrivalsresponse.health.drawCharts();
    //draw widget queue always last
    //pxWidget.draw.queue();
    // Translate labels language (Last to run)
    app.library.html.parseStaticLabel();
});