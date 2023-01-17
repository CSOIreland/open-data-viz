/*******************************************************************************
Application - Plugin 
*******************************************************************************/
var app = app || {};

app.plugin = {};

/*******************************************************************************
Application - Plugin - Cookie consent
*******************************************************************************/
app.plugin.cookiconsent = {};
app.plugin.cookiconsent.true = "true";
app.plugin.cookiconsent.false = "false";
app.plugin.cookiconsent.granted = false;

app.plugin.cookiconsent.allow = function () {
    app.plugin.cookiconsent.granted = true;
    // Set to TRUE the Cookie Consent
    Cookies.set(C_COOKIE_CONSENT, app.plugin.cookiconsent.true, app.config.plugin.jscookie.persistent);

    // Hide the banner

    //update google analytics consent
    gtag('consent', 'update', {
        'analytics_storage': 'granted'
    });
    $("#cookie").find("[name=cookie-banner]").fadeOut();

    //update google analytics
    app.plugin.ga.set();
};

app.plugin.cookiconsent.deny = function (reload) {
    reload = reload || false;
    app.plugin.cookiconsent.granted = false;
    // Set to FALSE the Cookie Consent

    Cookies.set(C_COOKIE_CONSENT, app.plugin.cookiconsent.false, $.extend(true, {}, app.config.plugin.jscookie.persistent, { "expires": 7 }));

    //update google analytics consent
    gtag('consent', 'update', {
        'analytics_storage': 'denied'
    });

    if (reload) {
        // Force page reload in order to unload (not set at all) cookies from different domains (i.e. sharethis)
        window.location.href = window.location.pathname;
    } else {
        $("#cookie").find("[name=cookie-banner]").fadeOut();
    }
};

/*******************************************************************************
Application - Plugin - PxWidget
*******************************************************************************/
app.plugin.pxWidget = {};

/* app.plugin.pxWidget.load = function () {
    if (typeof pxWidget === "undefined") {
        //Load dynamically the ISOGRAM
        jQuery.ajax({
            "url": C_APP_URL_PXWIDGET_ISOGRAM,
            "dataType": "script",
            "error": function (jqXHR, textStatus, errorThrown) {
                api.modal.exception(app.label.static["api-ajax-exception"]);
            }
        });
    }
}; */

/*******************************************************************************
Application - Plugin - JQuery extensions
*******************************************************************************/

//Unbind all events prior to binding a new event using .on
(function ($) {
    $.fn.once = function () {
        return this.off(arguments[0]).on(arguments[0], arguments[1]);
    };
})(jQuery);

/*******************************************************************************
Application - Plugin - Google Analytics
*******************************************************************************/
app.plugin.ga = {};
//
app.plugin.ga.set = function () {
    if (app.plugin.cookiconsent.granted) {
        //enable for debugging
        /* console.log({
            "search": api.uri.getSearch(),
            "title": document.title,
            "page_location": location.href
        }); */
        gtag('set', 'page_path', "/" + api.uri.getSearch());
        gtag('set', 'page_location', location.href);
        gtag('event', 'page_view', {
            "page_title": document.title
        });
    }
};
