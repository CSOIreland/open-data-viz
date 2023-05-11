/*******************************************************************************
Custom JS application specific ukrainearrivalsresponse.arrivalkey.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table

app.ukrainearrivalsresponse.arrivalkey = {};
app.ukrainearrivalsresponse.arrivalkey.config = {};
app.ukrainearrivalsresponse.arrivalkey.ajax = {};
app.ukrainearrivalsresponse.arrivalkey.callback = {};

//#endregion

//#region get Headline Data
app.ukrainearrivalsresponse.arrivalkey.ajax.getHeadlineFiguresMetadata = function () {
    $.each(app.ukrainearrivalsresponse.arrivalkey.config.headlineData, function (index, value) {
        var matrix = value.query.extension.matrix;
        app.library.pxStat.getMetaData(matrix, "app.ukrainearrivalsresponse.arrivalkey.callback.getHeadlineFiguresMetadata", index.toString());
    });
};

app.ukrainearrivalsresponse.arrivalkey.callback.getHeadlineFiguresMetadata = function (data, index) {
    var timeDimension = app.library.jsonStat.getTimeDimensionCode(data);
    var timeLast = app.library.jsonStat.getTimeLast(data, 1)[0];
    var query = app.ukrainearrivalsresponse.arrivalkey.config.headlineData[parseInt(index)].query;
    query.dimension[timeDimension].category.index = [timeLast];
    app.library.pxStat.getData(query, "app.ukrainearrivalsresponse.arrivalkey.callback.renderHeadlineFigure", index.toString());
};

app.ukrainearrivalsresponse.arrivalkey.callback.renderHeadlineFigure = function (data, index) {
    var element = app.ukrainearrivalsresponse.arrivalkey.config.headlineData[parseInt(index)].element;

    $(element).text(app.library.utility.formatNumber(data.value[0]));
};

//#endregion get Headline Data


//#region Draw Charts
app.ukrainearrivalsresponse.arrivalkey.drawCharts = function () {

    pxWidget.draw.init(
        'chart',
        "pxwidget7805216591",
        $.extend(true, {}, app.ukrainearrivalsresponse.arrivalkey.config.chart.numberOfPassengersArrivingFromAllPortsOfEntry)
    );

    pxWidget.draw.init(
        'table',
        "pxwidget8057164481",
        $.extend(true, {}, app.ukrainearrivalsresponse.arrivalkey.config.table.numberOfPassengersArrivingFromAllPortsOfEntry)
    );

    pxWidget.draw.init(
        'table',
        "pxwidget4909315151",
        $.extend(true, {}, app.ukrainearrivalsresponse.arrivalkey.config.table.arrivalsUnaccompaniedMinors)
    );

}

//#endregion