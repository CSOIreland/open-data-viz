/*******************************************************************************
Custom JS application specific ukrainearrivalsresponse.summary.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table

app.ukrainearrivalsresponse.summary = {};
app.ukrainearrivalsresponse.summary.config = {};
app.ukrainearrivalsresponse.summary.ajax = {};
app.ukrainearrivalsresponse.summary.metadata = {};
app.ukrainearrivalsresponse.summary.callback = {};


//#endregion


////#region Metadata

app.ukrainearrivalsresponse.summary.ajax.getMetadata = function () {
    app.library.pxStat.getMetaData("UA36", "app.ukrainearrivalsresponse.summary.callback.getMetadataUa36");
};
app.ukrainearrivalsresponse.summary.callback.getMetadataUa36 = function (response) {

    app.ukrainearrivalsresponse.summary.metadata.Ua36 = response;
    app.ukrainearrivalsresponse.summary.callback.checkMetadata();
};
app.ukrainearrivalsresponse.summary.callback.checkMetadata = function () {

    if (app.ukrainearrivalsresponse.summary.metadata.Ua36) {
        var latestTime = app.library.jsonStat.getTimeLast(app.ukrainearrivalsresponse.summary.metadata.Ua36, 1)[0];
        app.ukrainearrivalsresponse.summary.drawCharts(latestTime);
    }
};



app.ukrainearrivalsresponse.summary.ajax.getHeadlineFiguresMetadata = function () {
    $.each(app.ukrainearrivalsresponse.summary.config.headlineData, function (index, value) {
        var matrix = value.query.extension.matrix;
        app.library.pxStat.getMetaData(matrix, "app.ukrainearrivalsresponse.summary.callback.getHeadlineFiguresMetadata", index.toString());
    });
};

app.ukrainearrivalsresponse.summary.callback.getHeadlineFiguresMetadata = function (data, index) {
    var timeDimension = app.library.jsonStat.getTimeDimensionCode(data);
    var timeLast = app.library.jsonStat.getTimeLast(data, 1)[0];
    var query = app.ukrainearrivalsresponse.summary.config.headlineData[parseInt(index)].query;
    query.dimension[timeDimension].category.index = [timeLast];
    app.library.pxStat.getData(query, "app.ukrainearrivalsresponse.summary.callback.renderHeadlineFigure", index.toString());
};

app.ukrainearrivalsresponse.summary.callback.renderHeadlineFigure = function (data, index) {
    var element = app.ukrainearrivalsresponse.summary.config.headlineData[parseInt(index)].element;

    $(element).text(app.library.utility.formatNumber(data.value[0]));
};

////#endregion Metadata

app.ukrainearrivalsresponse.summary.drawCharts = function (data) {
    latestTime = [data]

    var configCurrentlyInAccommodation = $.extend(true, {}, app.ukrainearrivalsresponse.summary.config.chart.currentlyInAccommodation);
    configCurrentlyInAccommodation.data.datasets[0].api.query.data.params.dimension["TLIST(W1)"].category.index = latestTime;
    pxWidget.draw.init(
        'chart',
        "pxwidget6183116191",
        configCurrentlyInAccommodation
    );

    var configSchoolEnrolments = $.extend(true, {}, app.ukrainearrivalsresponse.summary.config.chart.schoolEnrolments);
    configSchoolEnrolments.data.datasets[0].api.query.data.params.dimension["TLIST(W1)"].category.index = latestTime;
    pxWidget.draw.init(
        'chart',
        "pxwidget5933523741",
        configSchoolEnrolments
    );

    var configMedicalCards = $.extend(true, {}, app.ukrainearrivalsresponse.summary.config.chart.medicalCards);
    configMedicalCards.data.datasets[0].api.query.data.params.dimension["TLIST(W1)"].category.index = latestTime;
    pxWidget.draw.init(
        'chart',
        "pxwidget5747018761",
        configMedicalCards
    );

    pxWidget.draw.init(
        'chart',
        "pxwidget2413731571",
        $.extend(true, {}, app.ukrainearrivalsresponse.summary.config.chart.overallTrendsForKeyMetrics)
    );

    pxWidget.draw.init(
        'table',
        "pxwidget9951749601",
        $.extend(true, {}, app.ukrainearrivalsresponse.summary.config.table.overallTrendsForKeyMetrics)
    );
}


app.ukrainearrivalsresponse.summary.ajax.getPercentagesMetadata = function () {
    $.each(app.ukrainearrivalsresponse.summary.config.percentage, function (index, value) {
        var matrix = value.query.extension.matrix;
        app.library.pxStat.getMetaData(matrix, "app.ukrainearrivalsresponse.summary.callback.getPercentagesMetadata", index.toString());
    });
};

app.ukrainearrivalsresponse.summary.callback.getPercentagesMetadata = function (data, index) {
    var timeDimension = app.library.jsonStat.getTimeDimensionCode(data);
    var timeLast = app.library.jsonStat.getTimeLast(data, 1)[0];
    var query = app.ukrainearrivalsresponse.summary.config.percentage[parseInt(index)].query;
    query.dimension[timeDimension].category.index = [timeLast];
    app.library.pxStat.getData(query, "app.ukrainearrivalsresponse.summary.callback.renderPercentage", index.toString());
};

app.ukrainearrivalsresponse.summary.callback.renderPercentage = function (data, index) {
    var element = app.ukrainearrivalsresponse.summary.config.percentage[parseInt(index)].element;

    $(element).text(app.library.utility.formatNumber(data.value[0]));
};