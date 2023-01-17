$(document).ready(function () {
    if (Cookies.get(C_COOKIE_CONSENT) == app.plugin.cookiconsent.true) {
        // Cookie Consent - Allowed
        app.plugin.cookiconsent.granted = true;
    }

    if (!api.uri.getNoHeader())
        //  Get Header
        api.content.load('#header', 'template/header.html');

    if (!api.uri.getNoNavbar())
        // Get Navigation
        api.content.load('#navigation', 'template/navigation.html');
    if (!api.uri.getBody()) {
        document.title = app.label.entity["home"].pageTitle
        // Get Default Body
        api.content.load('#body', 'entity/home/');
        history.replaceState(
            {
                pRelativeURL: 'entity/home/',
                pNav_link_SelectorToHighlight: null,
                pNav_menu_SelectorToHighlight: null
            },
            '',
            "?body=entity/home/"
        );
    } else {
        // Get Custom Body
        api.content.load(
            '#body',
            api.uri.getBody(),
            null,
            null,
            null,
            null
        );

        //get the page title from the navigation json
        var pageTitle = null;
        $.each(app.navigation.menu, function (index, value) {
            var entity = $.grep(value.links, function (element) {
                return element.path == api.uri.getBody();
            });
            if (entity.length) {
                pageTitle = app.label.entity[entity[0].name].pageTitle
            }

        });

        document.title = pageTitle || app.label.entity["home"].pageTitle;
    }


    if (!api.uri.getNoFooter())
        // Get Footer
        api.content.load('#footer', 'template/footer.html');

    // Get Cookie Consent
    api.content.load("#cookie", "template/cookie.html");

    // Get Spinner
    api.content.load('#spinner', 'template/spinner.html');

    // Get Modal
    api.content.load('#modal', 'template/modal.html');

    // Get template
    api.content.load('#template', 'template/index.html');

    //custom sb-admin-2 functions
    // Toggle the side navigation
    $("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
        if ($(".sidebar").hasClass("toggled")) {
            $('.sidebar .collapse').collapse('hide');
        };
    });

    // Close any open menu accordions when window is resized below 768px
    // issue on mobile when scrolling, resize is triggered
    // https://stackoverflow.com/questions/40437015/window-resize-executes-when-scrolling-on-mobile-devices
    var dwidth = $(window).width();
    $(window).on("resize", function () {
        var wwidth = $(window).width();
        if (dwidth !== wwidth) {
            if ($(window).width() < 768) {
                $('.sidebar .collapse').collapse('hide');
            };

            // Toggle the side navigation when window is resized below 480px
            if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
                $("body").addClass("sidebar-toggled");
                $(".sidebar").addClass("toggled");
                $('.sidebar .collapse').collapse('hide');
            };
        };

    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
        if ($(window).width() > 768) {
            var e0 = e.originalEvent,
                delta = e0.wheelDelta || -e0.detail;
            this.scrollTop += (delta < 0 ? 1 : -1) * 30;
            e.preventDefault();
        }
    });

    // Scroll to top button appear
    $(document).on('scroll', function () {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    // Smooth scrolling using jQuery easing
    $(document).on('click', 'a.scroll-to-top', function (e) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top)
        }, 1000, 'easeInOutExpo');
        e.preventDefault();
    });
});

if (window.innerWidth < 576) {
    $(".sidebar").addClass("toggled");
}

window.onpopstate = function (event) {
    //if any modals open, close them first to prevent modal background remainaing
    $('.modal').modal('hide');
    if (event.state) {
        api.content.load(
            "#body",
            event.state.pRelativeURL,
            event.state.pParams,
            null,
            event.state.pNav_link_SelectorToHighlight,
            event.state.pNav_menu_SelectorToHighlight
        )
    }
    else {
        api.content.load(
            '#body',
            api.uri.getBody(),
            null,
            null,
            null,
            null
        );
    }
};