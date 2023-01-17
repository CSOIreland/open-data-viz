

// Load the config.json into the application
api.ajax.config("entity/cpi/config/cpi.config.json", function (config) {
    // Parse JSON string into object
    app.cpi.config = config;
}, { async: false });


$(document).ready(function () {
    if (window.innerWidth < 576) {
        $(".sidebar").addClass("toggled");
    }
    app.cpi.heading();
    app.cpi.ajax.getMetadata();
    $('[data-toggle="tooltip"]').tooltip();
    app.library.html.parseStaticLabel();

    $("#visual-cpi").find("[name=compare-country]").once("click", function () {
        $("#visual-cpi").find("[name=compare-country]").each(function (index) {
            $(this).attr("aria-pressed", "false").removeClass("active");
        });

        $("#visual-cpi").find("[name=compare-country]").attr("aria-pressed", "false");
        $(this).attr("aria-pressed", "true");

        if ($(this).data("compare") == "-") {
            $("#visual-cpi-select-compare").modal("show");
        }
        else {
            app.cpi.callback.drawComapreChart($(this).data("compare"));
        }

    });

    $("#visual-cpi").find("[name=consumer-item]").once("click", function () {
        $("#visual-cpi").find("[name=consumer-item]").each(function (index) {
            $(this).attr("aria-pressed", "false").removeClass("active");
        });

        $("#visual-cpi").find("[name=consumer-item]").attr("aria-pressed", "false");
        $(this).attr("aria-pressed", "true");

        if ($(this).data("item") == "-") {
            $("#visual-cpi-select-average-prices").modal("show");
        }
        else {
            //app.cpi.callback.drawComapreChart($(this).data("item"));
            app.cpi.callback.drawAveragePricesChart($(this).data("item"));
        }

    });



    app.cpi.ajax.getEurostatData();
    app.cpi.ajax.drawCpiTimelineChart();
    app.cpi.ajax.drawCpiTimelineTable();
    app.cpi.ajax.drawHicpTimelineChart();
    app.cpi.ajax.drawHicpTimelineTable();
    app.cpi.callback.drawContributionsTable();


});