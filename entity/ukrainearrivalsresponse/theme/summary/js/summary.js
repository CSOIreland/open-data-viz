// Load the config.json into the application
api.ajax.config("entity/ukrainearrivalsresponse/theme/summary/config/summary.config.json", function (config) {
    // Parse JSON string into object
    app.ukrainearrivalsresponse.summary.config = config;

}, { async: false });


$(document).ready(function () {
    app.ukrainearrivalsresponse.summary.ajax.getMetadata();
    app.ukrainearrivalsresponse.summary.ajax.getHeadlineFiguresMetadata();
    app.ukrainearrivalsresponse.summary.ajax.getPercentagesMetadata();
    // app.ukrainearrivalsresponse.summary.ajax.getChartMetadata();
    // app.ukrainearrivalsresponse.summary.drawCharts();
    //draw widget queue always last
    // pxWidget.draw.queue();
    // Translate labels language (Last to run)
    app.library.html.parseStaticLabel();
});