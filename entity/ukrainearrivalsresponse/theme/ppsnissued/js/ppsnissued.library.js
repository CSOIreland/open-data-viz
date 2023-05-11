/*******************************************************************************
Custom JS application specific ukrainearrivalsresponse.ppsnissued.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table

app.ukrainearrivalsresponse.ppsnissued = {};
app.ukrainearrivalsresponse.ppsnissued.config = {};
app.ukrainearrivalsresponse.ppsnissued.ajax = {};
app.ukrainearrivalsresponse.ppsnissued.metadata = {};
app.ukrainearrivalsresponse.ppsnissued.callback = {};

//#endregion

////#region Metadata
app.ukrainearrivalsresponse.ppsnissued.ajax.getMetadata = function () {
    app.library.pxStat.getMetaData("UA06", "app.ukrainearrivalsresponse.ppsnissued.callback.getMetadataUa06");
};
app.ukrainearrivalsresponse.ppsnissued.callback.getMetadataUa06 = function (response) {

    app.ukrainearrivalsresponse.ppsnissued.metadata.Ua06 = response;
    app.ukrainearrivalsresponse.ppsnissued.callback.checkMetadata();
};
app.ukrainearrivalsresponse.ppsnissued.callback.checkMetadata = function () {

    if (app.ukrainearrivalsresponse.ppsnissued.metadata.Ua06) {
        var latestTime = app.library.jsonStat.getVariableLabel(app.ukrainearrivalsresponse.ppsnissued.metadata.Ua06, "TLIST(W1)", app.library.jsonStat.getTimeLast(app.ukrainearrivalsresponse.ppsnissued.metadata.Ua06, 1)[0]);
        var dateSplit = latestTime.split(" ");
        $("#visual-ukraine-ppsn-issued").find("[name=latest-time]").text(dateSplit[2] + " " + dateSplit[1] + " " + dateSplit[0]);
    }
};

////#endregion Metadata


//#region get Headline Data
app.ukrainearrivalsresponse.ppsnissued.ajax.getHeadlineFiguresMetadata = function () {
    $.each(app.ukrainearrivalsresponse.ppsnissued.config.headlineData, function (index, value) {
        var matrix = value.query.extension.matrix;
        app.library.pxStat.getMetaData(matrix, "app.ukrainearrivalsresponse.ppsnissued.callback.getHeadlineFiguresMetadata", index.toString());
    });
};

app.ukrainearrivalsresponse.ppsnissued.callback.getHeadlineFiguresMetadata = function (data, index) {
    var timeDimension = app.library.jsonStat.getTimeDimensionCode(data);
    var timeLast = app.library.jsonStat.getTimeLast(data, 1)[0];
    var query = app.ukrainearrivalsresponse.ppsnissued.config.headlineData[parseInt(index)].query;
    query.dimension[timeDimension].category.index = [timeLast];
    app.library.pxStat.getData(query, "app.ukrainearrivalsresponse.ppsnissued.callback.renderHeadlineFigure", index.toString());
};

app.ukrainearrivalsresponse.ppsnissued.callback.renderHeadlineFigure = function (data, index) {
    var element = app.ukrainearrivalsresponse.ppsnissued.config.headlineData[parseInt(index)].element;

    $(element).text(app.library.utility.formatNumber(data.value[0]));
};

//#endregion get Headline Data

//#region get Chart Metadata

app.ukrainearrivalsresponse.ppsnissued.ajax.getChartMetadata = function () {
    app.library.pxStat.getMetaData("UA06", "app.ukrainearrivalsresponse.ppsnissued.callback.getChartMetadata");

}

app.ukrainearrivalsresponse.ppsnissued.callback.getChartMetadata = function () {
    var latestDate = app.library.jsonStat.getTimeLast(app.ukrainearrivalsresponse.ppsnissued.metadata.Ua06, 1)[0]
    app.ukrainearrivalsresponse.ppsnissued.drawCharts(latestDate);
}

//#endregion get Chart Metadata


//#region Draw Charts
app.ukrainearrivalsresponse.ppsnissued.drawCharts = function (data) {
    var latestDate = [data]
    debugger
    // PPSN Issued by Age
    var configPpsnAgeChart = $.extend(true, {}, app.ukrainearrivalsresponse.ppsnissued.config.chart.ppsnIssuedByAge);
    configPpsnAgeChart.data.datasets[0].api.query.data.params.dimension["TLIST(W1)"].category.index = latestDate;
    configPpsnAgeChart.data.datasets[1].api.query.data.params.dimension["TLIST(W1)"].category.index = latestDate;
    pxWidget.draw.init(
        'chart',
        "pxwidget6957789901",
        configPpsnAgeChart
    );

    var configPpsnAgeTable = $.extend(true, {}, app.ukrainearrivalsresponse.ppsnissued.config.table.ppsnIssuedByAge);
    configPpsnAgeTable.data.api.query.data.params.dimension["TLIST(W1)"].category.index = latestDate;
    pxWidget.draw.init(
        'table',
        "pxwidget1261383781",
        configPpsnAgeTable
    );

    // PPSN Issued by Gender
    var configPpsnGenderChart = $.extend(true, {}, app.ukrainearrivalsresponse.ppsnissued.config.chart.ppsnIssuedByGender);
    configPpsnGenderChart.data.datasets[0].api.query.data.params.dimension["TLIST(W1)"].category.index = latestDate;
    pxWidget.draw.init(
        'chart',
        "pxwidget320833741",
        configPpsnGenderChart
    );

    var configPpsnGenderTable = $.extend(true, {}, app.ukrainearrivalsresponse.ppsnissued.config.table.ppsnIssuedByGender);
    configPpsnGenderTable.data.api.query.data.params.dimension["TLIST(W1)"].category.index = latestDate;
    pxWidget.draw.init(
        'table',
        "pxwidget3209703721",
        configPpsnGenderTable
    );
}

//#endregion