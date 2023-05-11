// Load the config.json into the application
api.ajax.config("entity/ukrainearrivalsresponse/theme/employment/config/employment.config.json", function (config) {
    // Parse JSON string into object
    app.ukrainearrivalsresponse.employment.config = config;

}, { async: false });

$(document).ready(function () {

    app.ukrainearrivalsresponse.employment.ajax.getHeadlineFiguresMetadata();
    //draw widget queue always last
    // pxWidget.draw.queue();
    // Translate labels language (Last to run)
    app.library.html.parseStaticLabel();

    app.ukrainearrivalsresponse.employment.drawCharts();

});