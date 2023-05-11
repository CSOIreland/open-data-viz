// Load the config.json into the application
api.ajax.config("entity/ukrainearrivalsresponse/theme/locationofarrivalscounty/config/locationofarrivalscounty.config.json", function (config) {
    // Parse JSON string into object
    app.ukrainearrivalsresponse.locationofarrivalscounty.config = config;

}, { async: false });


$(document).ready(function () {


    //draw widget queue always last
    // pxWidget.draw.queue();
    // Translate labels language (Last to run)
    app.library.html.parseStaticLabel();

    app.ukrainearrivalsresponse.locationofarrivalscounty.drawCharts();
});