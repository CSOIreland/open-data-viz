// Load the config.json into the application
api.ajax.config("entity/ukrainearrivalsresponse/theme/socialwelfarepayment/config/socialwelfarepayment.config.json", function (config) {
    // Parse JSON string into object
    app.ukrainearrivalsresponse.socialwelfarepayment.config = config;

}, { async: false });

$(document).ready(function () {

    app.ukrainearrivalsresponse.socialwelfarepayment.ajax.getHeadlineFiguresMetadata();
    //draw widget queue always last
    // pxWidget.draw.queue();
    // Translate labels language (Last to run)
    app.library.html.parseStaticLabel();

    app.ukrainearrivalsresponse.socialwelfarepayment.drawCharts();
});