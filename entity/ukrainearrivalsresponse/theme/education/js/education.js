// Load the config.json into the application
api.ajax.config("entity/ukrainearrivalsresponse/theme/education/config/education.config.json", function (config) {
    // Parse JSON string into object
    app.ukrainearrivalsresponse.education.config = config;

}, { async: false });

$(document).ready(function () {

    app.ukrainearrivalsresponse.education.ajax.getHeadlineFiguresMetadata();
    //draw widget queue always last
    // pxWidget.draw.queue();
    // Translate labels language (Last to run)
    app.library.html.parseStaticLabel();
});