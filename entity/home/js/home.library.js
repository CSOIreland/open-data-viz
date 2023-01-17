/*******************************************************************************
Custom JS application specific group.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table
app.home = {};
app.home.ajax = {};
app.home.callback = {};

//#endregion

app.home.heading = function () {
    var heading = $("#template").find("[name=entity-heading]").clone();
    heading.find("[name=heading-text]").append(app.label.entity.home["title"]);
    heading.find("[name=sub-heading-text]").append(app.label.entity.home["explanation"]);
    $('meta[name=description]').attr('description', app.label.entity.home["metaDescription"]);
    $("#visual-home").find("[name=heading]").append(heading);
    app.library.html.fullScreen($("#visual-home"));
};

