// Load the config.json into the application
api.ajax.config("entity/ima/config/ima.config.json", function (config) {
    // Parse JSON string into object
    app.ima.rootConfig = config;
}, { async: false });
api.spinner.stop()
// Load the Widget Snippet into the application
api.ajax.config(C_APP_URL_PXWIDGET_SNIPPET_2_4_2, function (snippet) {
    app.ima.snippetCode = snippet;
}, { dataType: "html", async: false });

// Load the config.json into the application
api.ajax.config(app.ima.rootConfig.entity[api.uri.getParam("body")].config, function (config) {
    // Parse JSON string into object
    app.ima.config = config;
}, { async: false });


$(document).ready(function () {
    if (window.innerWidth < 576) {
        $(".sidebar").addClass("toggled");
    }
    //check if pdf
    if (api.uri.getParam("pdf")) {
        api.content.load("#body", "entity/ima/index.pdf.html")
        return
    }

    //load google maps addres search
    jQuery.ajax({
        "url": "https://maps.googleapis.com/maps/api/js?key=" + app.ima.rootConfig.autoComplete.key + "&libraries=places&callback=initMapIma",
        "dataType": "script",
        "async": false,
        "error": function (jqXHR, textStatus, errorThrown) {
            api.modal.exception(app.label.static["api-ajax-exception"]);
        }
    });

    //Link for sharing
    $(".sharethis-sticky-share-buttons").attr("data-url", window.location.href);

    //load ima template
    api.content.load("#visual-ima-template", "entity/ima/ima.template.html");

    app.ima.heading();
    app.ima.buildSelections();
    app.ima.theme.buildThemes();

    if (api.uri.getParam("boundary")) {
        app.ima.goTo.boundary = api.uri.getParam("boundary");
        $("#visual-ima-selections").find("[name=boundaries]").val(app.ima.goTo.boundary).trigger("change");
    };

    if (api.uri.getParam("guid")) {
        $('#visual-ima-select-tab').tab('show');
        app.ima.goTo.guid = api.uri.getParam("guid");
    };

    if (api.uri.getParam("theme")) {
        app.ima.goTo.theme = api.uri.getParam("theme");
    };

    $("#visual-ima").find("[name=theme]").once("mouseover", function () {
        var colour = $(this).find(".card").attr("colour");
        $(this).find(".card").addClass("shadow-lg");
        $(this).find(".card-body").addClass("bg-" + colour);
        $(this).find(".card-header").addClass("bg-" + colour).addClass("text-light");
        $(this).find("[name=icon-heading]").removeClass("text-" + colour).addClass("text-light");
    });

    $("#visual-ima").find("[name=theme]").once("mouseout", function () {
        var colour = $(this).find(".card").attr("colour");
        $(this).find(".card").removeClass("shadow-lg");
        $(this).find(".card-header").removeClass("bg-" + colour).removeClass("text-light");
        $(this).find(".card-body").removeClass("bg-" + colour);
        $(this).find("[name=icon-heading]").removeClass("text-light").addClass("text-" + colour);
    });

    $("#visual-ima-search-content").find("[name=my-location]").once("click", function () {
        app.ima.geo.getCurrentPosition(app.ima.callback.getMyLocationSuccess)
    });

    $("#visual-ima-map-wrapper").find("[name=multi-area-card]").find("[name=reset]").once("click", function () {
        app.ima.featuresLayers.resetStyle();
        app.ima.featureRequested = null;
        app.ima.drawMultiAreaTable();
    });

    $("#visual-ima-themes").find("[name='theme-card'] a").once("click", function (e) {
        e.preventDefault();
        app.ima.theme.renderTheme($(this).attr("theme"));
    });

    $("#visual-ima-themes").find("[name=all-data]").once("click", app.ima.theme.selectAllThemes);


    $("#visual-ima-all-themes-modal").find("[name=download-all-pdf-data]").once("click", function () {
        api.spinner.start();
        app.ima.ajax.getPdf("all", $(this).attr("guid"), $(this).attr("area-name"));
    });

    $("#visual-ima-theme-modal").find("[name=download-pdf-data]").once("click", function () {
        api.spinner.start();
        app.ima.ajax.getPdf($(this).attr("theme"), $(this).attr("guid"), $(this).attr("area-name"));
    });

    // Translate labels language (Last to run)
    app.library.html.parseStaticLabel();
});