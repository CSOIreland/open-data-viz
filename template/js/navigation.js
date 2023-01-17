/*******************************************************************************
Navigation
*******************************************************************************/
// Load the navigation.json into the application
api.ajax.config("template/json/navigation.json", function (navigation) {
    app.navigation.menu = navigation;
}, { async: false });
$(document).ready(function () {
    $("#navigation").find("[name=selected-lng-name]").text(app.label.language.iso.name);
    $("#navigation").find("[name=lng-toggle][iso-code=" + app.label.language.iso.code + "]").find("[name=lng-selected-icon]").show();
    app.navigation.draw();

    $("#navigation").find("[name=lng-toggle]").once("click", function () {
        app.label.language.iso.code = $(this).attr("iso-code");
        app.label.language.iso.name = $(this).attr("iso-name");

        $("#navigation").find("[name=selected-lng-name]").text($(this).attr("iso-name"));
        $("#navigation").find("[name=lng-toggle]").find("[name=lng-selected-icon]").hide();
        $("#navigation").find("[name=lng-toggle][iso-code=" + $(this).attr("iso-code") + "]").find("[name=lng-selected-icon]").show();
        Cookies.set(C_COOKIE_LANGUAGE, app.label.language, app.config.plugin.jscookie.persistent);
        // Force page reload
        window.location.href = window.location.pathname;
    })

    // Translate labels language (Last to run)
    app.library.html.parseStaticLabel();
});