$(document).ready(function () {
    if (window.innerWidth < 576) {
        $(".sidebar").addClass("toggled");
    }
    app.home.heading();

    $("#visual-home").find("[name=entity-link]").once("mouseover", function () {
        $(this).addClass("shadow-lg");
    });

    $("#visual-home").find("[name=entity-link]").once("mouseout", function () {
        $(this).removeClass("shadow-lg");
    });

    $("#visual-home").find("[name=entity-link]").each(function (index) {
        api.content.navigate($(this), $(this).attr("entity-path"), null, null, app.label.entity[$(this).attr("entity-name")].pageTitle, app.plugin.cookiconsent.granted);
    });

    // Translate labels language (Last to run)
    app.library.html.parseStaticLabel();
});