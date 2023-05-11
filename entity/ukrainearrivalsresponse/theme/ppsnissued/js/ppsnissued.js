// Load the config.json into the application
api.ajax.config("entity/ukrainearrivalsresponse/theme/ppsnissued/config/ppsnissued.config.json", function (config) {
    // Parse JSON string into object
    app.ukrainearrivalsresponse.ppsnissued.config = config;

}, { async: false });

$(document).ready(function () {
    app.ukrainearrivalsresponse.ppsnissued.ajax.getMetadata();
    app.ukrainearrivalsresponse.ppsnissued.ajax.getHeadlineFiguresMetadata();
    app.ukrainearrivalsresponse.ppsnissued.ajax.getChartMetadata();
    //draw widget queue always last
    // pxWidget.draw.queue();
    // Translate labels language (Last to run)
    app.library.html.parseStaticLabel();


    // app.ukrainearrivalsresponse.ppsnissued.getChartMetadata();
});