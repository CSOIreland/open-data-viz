/*******************************************************************************
Custom JS application specific ukrainearrivalsresponse.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table
app.ukrainearrivalsresponse = {};
app.ukrainearrivalsresponse.config = {};
app.ukrainearrivalsresponse.ajax = {};
app.ukrainearrivalsresponse.callback = {};

//#endregion

app.ukrainearrivalsresponse.heading = function () {
    var heading = $("#template").find("[name=entity-heading]").clone();
    heading.find("[name=heading-text]").text(app.label.entity.uar["title"]);
    heading.find("[name=sub-heading-text]").html(app.label.entity.uar["explanation"]);
    $('meta[name=description]').attr('description', app.label.entity.uar["metaDescription"]);
    $("#visual-ukraine").find("[name=heading]").append(heading);
    app.library.html.fullScreen($("#visual-ukraine"));
};

app.ukrainearrivalsresponse.populateThemeDropdown = function () {
    $.each(app.ukrainearrivalsresponse.config.themes, function (index, value) {
        $("#visual-ukraine").find("[name=theme-select]").append(
            $("<option>", {
                "value": value.value,
                "text": app.label.static[value.label],
                "theme-title": app.label.static[value.title],
                "entity-path": value.entityPath
            })
        )
    });

    api.content.load('#visual-ukraine-arrivals-response-theme-content', $("#visual-ukraine").find("[name=theme-select] option:selected").attr("entity-path"));
    $("#visual-ukraine").find("[name=visual-ukraine-arrivals-response-theme-content-card]").find("[name=label]").empty().text($("#visual-ukraine").find("[name=theme-select] option:selected").attr("theme-title"));
};

