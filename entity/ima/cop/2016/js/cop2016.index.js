$(document).ready(function () {
    jQuery.ajax({
        "url": C_APP_URL_PXWIDGET_ISOGRAM_2_4_2,
        "dataType": "script",
        "async": false,
        "error": function (jqXHR, textStatus, errorThrown) {
            api.modal.exception(app.label.static["api-ajax-exception"]);
        }
    });
});