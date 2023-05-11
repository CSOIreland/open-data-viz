/*******************************************************************************
Custom JS application specific ukrainearrivalsresponse.health.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table

app.ukrainearrivalsresponse.health = {};
app.ukrainearrivalsresponse.health.config = {};
app.ukrainearrivalsresponse.health.ajax = {};
app.ukrainearrivalsresponse.health.callback = {};

//#endregion

//#region get Headline Data
app.ukrainearrivalsresponse.health.ajax.getHeadlineFiguresMetadata = function () {
    $.each(app.ukrainearrivalsresponse.health.config.headlineData, function (index, value) {
        var matrix = value.query.extension.matrix;
        app.library.pxStat.getMetaData(matrix, "app.ukrainearrivalsresponse.health.callback.getHeadlineFiguresMetadata", index.toString());
    });
};

app.ukrainearrivalsresponse.health.callback.getHeadlineFiguresMetadata = function (data, index) {
    var timeDimension = app.library.jsonStat.getTimeDimensionCode(data);
    var timeLast = app.library.jsonStat.getTimeLast(data, 1)[0];
    var query = app.ukrainearrivalsresponse.health.config.headlineData[parseInt(index)].query;
    query.dimension[timeDimension].category.index = [timeLast];
    app.library.pxStat.getData(query, "app.ukrainearrivalsresponse.health.callback.renderHeadlineFigure", index.toString());
};

app.ukrainearrivalsresponse.health.callback.renderHeadlineFigure = function (data, index) {
    var element = app.ukrainearrivalsresponse.health.config.headlineData[parseInt(index)].element;

    $(element).text(app.library.utility.formatNumber(data.value[0]));
};

//#endregion get Headline Data

app.ukrainearrivalsresponse.health.drawCharts = function () {

    pxWidget.draw.init(
        'chart',
        "pxwidget9463958571",
        $.extend(true, {}, app.ukrainearrivalsresponse.health.config.chart.sevenDayAverage)
    );

    pxWidget.draw.init(
        'table',
        "pxwidget7712588061",
        $.extend(true, {}, app.ukrainearrivalsresponse.health.config.table.sevenDayAverage)
    );

    pxWidget.draw.init(
        'chart',
        "pxwidget8147638291",
        $.extend(true, {}, app.ukrainearrivalsresponse.health.config.chart.medicalCardsCumulative)
    );

    pxWidget.draw.init(
        'table',
        "pxwidget3052434061",
        $.extend(true, {}, app.ukrainearrivalsresponse.health.config.table.medicalCardsCumulative)
    );
}