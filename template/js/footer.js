/*******************************************************************************
Footer
*******************************************************************************/
$(document).ready(function () {

    //Set footer content
    app.footer.render.contact();
    app.footer.render.links();
    app.footer.render.social();
    app.footer.render.watermark();

    //smoother rendering of dynamic footer
    $("#footer .footer").fadeIn(1000);

    // Bind Privacy click event
    $("#footer").find("[name=privacy]").once("click", function (e) {
        e.preventDefault();
        // Load the Privacy (language specific) into the Modal
        api.content.load("#modal-read-privacy .modal-body", "internationalisation/privacy/" + app.label.language.iso.code + ".html");
        $("#modal-read-privacy").modal("show");

    });

    if (app.config.beta) {
        $("#footer [name=status]").show();
    };

    // $('[data-toggle="tooltip"]').tooltip();

    /*  //init bootstrap breatpoints for toggle panel
     $(window).on('init.bs.breakpoint', function (e) {
         bsBreakpoints.toggle(e.breakpoint);
     });
 
     $(window).on('new.bs.breakpoint', function (e) {
         bsBreakpoints.toggle(e.breakpoint);
     });
     bsBreakpoints.init();
 */

    app.footer.render.breakPoint();
    $(window).on("resize", function () {
        app.footer.render.breakPoint();
    });

    // Translate labels language (Last to run)
    app.library.html.parseStaticLabel();
});