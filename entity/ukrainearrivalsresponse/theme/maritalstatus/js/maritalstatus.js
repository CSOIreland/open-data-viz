// Load the config.json into the application
api.ajax.config("entity/ukrainearrivalsresponse/theme/maritalstatus/config/maritalstatus.config.json", function (config) {
    // Parse JSON string into object
    app.ukrainearrivalsresponse.maritalstatus.config = config;

}, { async: false });

$(document).ready(function () {

    app.ukrainearrivalsresponse.maritalstatus.drawCharts();
    //draw widget queue always last
    //pxWidget.draw.queue();
    // Translate labels language (Last to run)
    app.library.html.parseStaticLabel();
});