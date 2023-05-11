/*******************************************************************************
Custom JS application specific ukrainearrivalsresponse.maritalstatus.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table

app.ukrainearrivalsresponse.maritalstatus = {};
app.ukrainearrivalsresponse.maritalstatus.config = {};
app.ukrainearrivalsresponse.maritalstatus.ajax = {};
app.ukrainearrivalsresponse.maritalstatus.callback = {};

//#endregion

app.ukrainearrivalsresponse.maritalstatus.drawCharts = function () {

    pxWidget.draw.init(
        'chart',
        "pxwidget5881378051",
        $.extend(true, {}, app.ukrainearrivalsresponse.maritalstatus.config.chart.maritalStatusMalesCumulative)
    );

    pxWidget.draw.init(
        'chart',
        "pxwidget7961473641",
        $.extend(true, {}, app.ukrainearrivalsresponse.maritalstatus.config.chart.maritalStatusFemalesCumulative)
    );

    pxWidget.draw.init(
        'chart',
        "pxwidget784434471",
        $.extend(true, {}, app.ukrainearrivalsresponse.maritalstatus.config.chart.maritalStatusMalesByArrival)
    );

    pxWidget.draw.init(
        'chart',
        "pxwidget1381003061",
        $.extend(true, {}, app.ukrainearrivalsresponse.maritalstatus.config.chart.maritalStatusFemalesByArrival)
    );
}