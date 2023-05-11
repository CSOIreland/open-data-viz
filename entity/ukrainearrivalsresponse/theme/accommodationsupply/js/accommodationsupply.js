// Load the config.json into the application
api.ajax.config("entity/ukrainearrivalsresponse/theme/accommodationsupply/config/accommodationsupply.config.json", function (config) {
    // Parse JSON string into object
    app.ukrainearrivalsresponse.accommodationsupply.config = config;

}, { async: false });

$(document).ready(function () {

    app.ukrainearrivalsresponse.accommodationsupply.ajax.getHeadlineFiguresMetadata();
    //draw widget queue always last
    //pxWidget.draw.queue();
    // Translate labels language (Last to run)
    app.library.html.parseStaticLabel();

    app.ukrainearrivalsresponse.accommodationsupply.drawCharts();

});