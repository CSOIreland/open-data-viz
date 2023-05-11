/*******************************************************************************
Custom JS application specific ukrainearrivalsresponse.accommodationdemand.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table

app.ukrainearrivalsresponse.accommodationdemand = {};
app.ukrainearrivalsresponse.accommodationdemand.config = {};
app.ukrainearrivalsresponse.accommodationdemand.ajax = {};
app.ukrainearrivalsresponse.accommodationdemand.callback = {};

//#endregion

app.ukrainearrivalsresponse.accommodationdemand.ajax.getHeadlineFiguresMetadata = function () {
    $.each(app.ukrainearrivalsresponse.accommodationdemand.config.headlineData, function (index, value) {
        var matrix = value.query.extension.matrix;
        app.library.pxStat.getMetaData(matrix, "app.ukrainearrivalsresponse.accommodationdemand.callback.getHeadlineFiguresMetadata", index.toString());
    });
};

app.ukrainearrivalsresponse.accommodationdemand.callback.getHeadlineFiguresMetadata = function (data, index) {
    var timeDimension = app.library.jsonStat.getTimeDimensionCode(data);
    var timeLast = app.library.jsonStat.getTimeLast(data, 1)[0];
    var query = app.ukrainearrivalsresponse.accommodationdemand.config.headlineData[parseInt(index)].query;
    query.dimension[timeDimension].category.index = [timeLast];
    app.library.pxStat.getData(query, "app.ukrainearrivalsresponse.accommodationdemand.callback.renderHeadlineFigure", index.toString());
};

app.ukrainearrivalsresponse.accommodationdemand.callback.renderHeadlineFigure = function (data, index) {
    var element = app.ukrainearrivalsresponse.accommodationdemand.config.headlineData[parseInt(index)].element;

    $(element).text(app.library.utility.formatNumber(data.value[0]));
};


//#region Draw Charts
app.ukrainearrivalsresponse.accommodationdemand.drawCharts = function () {

    pxWidget.draw.init(
        'chart',
        "pxwidget2499478851",
        $.extend(true, {}, app.ukrainearrivalsresponse.accommodationdemand.config.chart.percentageCurrentlyOccupiedOfPpsnIssued)
    );
}

//#endregion

