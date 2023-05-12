// Load the config.json into the application
api.ajax.config("entity/las/config/las.config.json", function (config) {
    // Parse JSON string into object
    app.las.config = config;
}, { async: false });
api.spinner.stop()
// Load the Widget Snippet into the application
api.ajax.config(C_APP_URL_PXWIDGET_SNIPPET_2_4_6, function (snippet) {
    app.las.snippetCode = snippet;
}, { dataType: "html", async: false });

$(document).ready(function () {
    if (window.innerWidth < 576) {
        $(".sidebar").addClass("toggled");
    }
    //load specific widget library
    jQuery.ajax({
        "url": C_APP_URL_PXWIDGET_ISOGRAM_2_4_6,
        "dataType": "script",
        "async": false,
        "error": function (jqXHR, textStatus, errorThrown) {
            api.modal.exception(app.label.static["api-ajax-exception"]);
        },
        "success": function () {
            app.las.heading();
            app.las.buildSelections();
            app.las.theme.buildThemes();

            $("#visual-las-themes").find("[name='theme-card'] a").once("click", function (e) {
                e.preventDefault();
                app.las.theme.renderTheme($(this).attr("theme"));
            });

            if (api.uri.getParam("boundary")) {
                app.las.goTo.boundary = api.uri.getParam("boundary");
                $("#visual-las-boundary-select").find("[name=boundaries]").val(app.las.goTo.boundary).trigger("change");
            };

            if (api.uri.getParam("guid")) {
                $('#visual-las-select-tab').tab('show');
                app.las.goTo.guid = api.uri.getParam("guid");
            };

            if (api.uri.getParam("theme")) {
                app.las.goTo.theme = api.uri.getParam("theme");
            };
        }
    });

    //load google maps addres search
    jQuery.ajax({
        "url": "https://maps.googleapis.com/maps/api/js?key=" + app.las.config.autoComplete.key + "&libraries=places&callback=initMapIma",
        "dataType": "script",
        "async": false,
        "error": function (jqXHR, textStatus, errorThrown) {
            api.modal.exception(app.label.static["api-ajax-exception"]);
        }
    });

    //Link for sharing
    $(".sharethis-sticky-share-buttons").attr("data-url", window.location.href);



    $("#visual-las").find("[name=theme]").once("mouseover", function () {
        var colour = $(this).find(".card").attr("colour");
        $(this).find(".card").addClass("shadow-lg");
        $(this).find(".card-body").addClass("bg-" + colour);
        $(this).find(".card-header").addClass("bg-" + colour).addClass("text-light");
        $(this).find("[name=icon-heading]").removeClass("text-" + colour).addClass("text-light");
    });

    $("#visual-las").find("[name=theme]").once("mouseout", function () {
        var colour = $(this).find(".card").attr("colour");
        $(this).find(".card").removeClass("shadow-lg");
        $(this).find(".card-header").removeClass("bg-" + colour).removeClass("text-light");
        $(this).find(".card-body").removeClass("bg-" + colour);
        $(this).find("[name=icon-heading]").removeClass("text-light").addClass("text-" + colour);
    });

    $("#visual-las-search-content").find("[name=my-location]").once("click", function () {
        app.las.geo.getCurrentPosition(app.las.callback.getMyLocationSuccess)
    });

    $("#visual-las-map-wrapper").find("[name=multi-area-card]").find("[name=reset]").once("click", function () {
        app.las.featuresLayers.resetStyle();
        app.las.featureRequested = null;
    });


    $("#visual-las-themes").find("[name=all-data]").once("click", app.las.theme.selectAllThemes);


    // Translate labels language (Last to run)
    app.library.html.parseStaticLabel();
});