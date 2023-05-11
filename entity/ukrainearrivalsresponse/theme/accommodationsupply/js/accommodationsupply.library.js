/*******************************************************************************
Custom JS application specific ukrainearrivalsresponse.accommodationsupply.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table

app.ukrainearrivalsresponse.accommodationsupply = {};
app.ukrainearrivalsresponse.accommodationsupply.config = {};
app.ukrainearrivalsresponse.accommodationsupply.ajax = {};
app.ukrainearrivalsresponse.accommodationsupply.callback = {};

//#endregion

//#region get Headline Data
app.ukrainearrivalsresponse.accommodationsupply.ajax.getHeadlineFiguresMetadata = function () {
    $.each(app.ukrainearrivalsresponse.accommodationsupply.config.headlineData, function (index, value) {
        var matrix = value.query.extension.matrix;
        app.library.pxStat.getMetaData(matrix, "app.ukrainearrivalsresponse.accommodationsupply.callback.getHeadlineFiguresMetadata", index.toString());
    });
};

app.ukrainearrivalsresponse.accommodationsupply.callback.getHeadlineFiguresMetadata = function (data, index) {
    var timeDimension = app.library.jsonStat.getTimeDimensionCode(data);
    var timeLast = app.library.jsonStat.getTimeLast(data, 1)[0];
    var query = app.ukrainearrivalsresponse.accommodationsupply.config.headlineData[parseInt(index)].query;
    query.dimension[timeDimension].category.index = [timeLast];
    app.library.pxStat.getData(query, "app.ukrainearrivalsresponse.accommodationsupply.callback.renderHeadlineFigure", index.toString());
};

app.ukrainearrivalsresponse.accommodationsupply.callback.renderHeadlineFigure = function (data, index) {
    var element = app.ukrainearrivalsresponse.accommodationsupply.config.headlineData[parseInt(index)].element;

    $(element).text(app.library.utility.formatNumber(data.value[0]));
};

//#endregion get Headline Data

app.ukrainearrivalsresponse.accommodationsupply.drawCharts = function () {

    // Total Emergency Beds Chart
    pxWidget.draw.init(
        'chart',
        "pxwidget1319315481",
        $.extend(true, {}, app.ukrainearrivalsresponse.accommodationsupply.config.chart.totalEmergencyBedsAvailable)
    );

    // Total Independent Beds Units Chart
    pxWidget.draw.init(
        'chart',
        "pxwidget1319315482",
        $.extend(true, {}, app.ukrainearrivalsresponse.accommodationsupply.config.chart.totalIndependentBedsUnitsAvailable)
    );

    // Total Serviced Beds Chart
    pxWidget.draw.init(
        'chart',
        "pxwidget1319315483",
        $.extend(true, {}, app.ukrainearrivalsresponse.accommodationsupply.config.chart.totalServicedBedsAvailable)
    );

    // Total Independent Beds Shared Chart
    pxWidget.draw.init(
        'chart',
        "pxwidget1319315484",
        $.extend(true, {}, app.ukrainearrivalsresponse.accommodationsupply.config.chart.totalIndependentBedsSharedAvailable)
    );
}