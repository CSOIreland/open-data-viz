/*******************************************************************************
Custom JS application specific mip.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table
app.mip = {};
app.mip.config = {};
app.mip.ajax = {};
app.mip.callback = {};

//#endregion

app.mip.heading = function () {
    var heading = $("#template").find("[name=entity-heading]").clone();
    heading.find("[name=heading-text]").text(app.label.entity.measuringIrelandsProgress["title"]);
    heading.find("[name=sub-heading-text]").html(app.label.entity.measuringIrelandsProgress["explanation"]);
    $("#visual-mip").find("[name=heading]").append(heading);
    app.library.html.fullScreen($("#visual-mip"));
}
