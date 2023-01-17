/*******************************************************************************
Header
*******************************************************************************/

$(document).ready(function () {
    // Set Title
    $("#header [name=title]").html(app.config.title);
    // Set Logo
    $("#header [name=logo]").html(app.config.title).attr('alt', app.config.url.header.logo.alt).attr('src', app.config.url.header.logo.src);
    if (app.config.beta) {
        $("#header [name=status]").show();
    };

    // Translate labels language (Last to run)
    app.library.html.parseStaticLabel();
});