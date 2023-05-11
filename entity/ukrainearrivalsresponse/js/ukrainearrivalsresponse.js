// Load the config.json into the application
api.ajax.config("entity/ukrainearrivalsresponse/config/ukrainearrivalsresponse.config.json", function (config) {
    // Parse JSON string into object
    app.ukrainearrivalsresponse.config = config;

}, { async: false });

$(document).ready(function () {

    /*  app.ukrainearrivalsresponse.heading = function () {
         var heading = $("#template").find("[name=entity-heading]").clone();
         heading.find("[name=heading-text]").text(app.label.entity.ukraineArrivalsResponse["title"]);
         heading.find("[name=sub-heading-text]").html(app.label.entity.ukraineArrivalsResponse["explanation"]);
         $("#visual-mip").find("[name=heading]").append(heading);
         app.library.html.fullScreen($("#visual-mip"));
     } */


    app.ukrainearrivalsresponse.heading();

    //Dynamically load a specific version of the widget library
    jQuery.ajax({
        "url": C_APP_URL_PXWIDGET_ISOGRAM_2_4_8,
        "dataType": "script",
        "async": false,
        "error": function (jqXHR, textStatus, errorThrown) {
            api.modal.exception(app.label.static["api-ajax-exception"]);
        },
        "success": function () {
            app.ukrainearrivalsresponse.populateThemeDropdown();
            api.content.load('#visual-ukraine-arrivals-response-theme-content', $('option:selected', this).attr('entity-path'));
        }
    });

    $("#visual-ukraine").find("[name=theme-select]").on('change', function () {
        var themepath = $('option:selected', this).attr('entity-path');
        api.content.load('#visual-ukraine-arrivals-response-theme-content', themepath);
        $("#visual-ukraine").find("[name=visual-ukraine-arrivals-response-theme-content-card]").find("[name=label]").empty().text($("#visual-ukraine").find("[name=theme-select] option:selected").attr("theme-title"));
    });


    $("#visual-ukraine").find("[name=next-button]").on("click", function () {
        /*   var test = $("#visual-ukraine").find("[name=theme-select] option:selected")
  
          $("#visual-ukraine").find("[name=theme-select]").val("SWP").trigger('change'); */
        var select = document.getElementById('theme-select');
        select.selectedIndex++;

    })
    //

    $("#visual-ukraine").find("[name=previous-button]").on("click", function () {
        var select = document.getElementById('theme-select');
        select.selectedIndex--;

    })
    // app.ukrainearrivalsresponse.nextButton();
    // app.ukrainearrivalsresponse.previousButton();

    //draw widget queue always last
    // pxWidget.draw.queue();
    // Translate labels language (Last to run)
    app.library.html.parseStaticLabel();
});