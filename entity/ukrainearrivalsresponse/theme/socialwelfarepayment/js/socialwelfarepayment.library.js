/*******************************************************************************
Custom JS application specific ukrainearrivalsresponse.socialwelfarepayment.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table

app.ukrainearrivalsresponse.socialwelfarepayment = {};
app.ukrainearrivalsresponse.socialwelfarepayment.config = {};
app.ukrainearrivalsresponse.socialwelfarepayment.ajax = {};
app.ukrainearrivalsresponse.socialwelfarepayment.callback = {};

//#endregion

//#region get Headline Data
app.ukrainearrivalsresponse.socialwelfarepayment.ajax.getHeadlineFiguresMetadata = function () {
    $.each(app.ukrainearrivalsresponse.socialwelfarepayment.config.headlineData, function (index, value) {
        var matrix = value.query.extension.matrix;
        app.library.pxStat.getMetaData(matrix, "app.ukrainearrivalsresponse.socialwelfarepayment.callback.getHeadlineFiguresMetadata", index.toString());
    });
};

app.ukrainearrivalsresponse.socialwelfarepayment.callback.getHeadlineFiguresMetadata = function (data, index) {
    var timeDimension = app.library.jsonStat.getTimeDimensionCode(data);
    var timeLast = app.library.jsonStat.getTimeLast(data, 1)[0];
    var query = app.ukrainearrivalsresponse.socialwelfarepayment.config.headlineData[parseInt(index)].query;
    query.dimension[timeDimension].category.index = [timeLast];
    app.library.pxStat.getData(query, "app.ukrainearrivalsresponse.socialwelfarepayment.callback.renderHeadlineFigure", index.toString());
};

app.ukrainearrivalsresponse.socialwelfarepayment.callback.renderHeadlineFigure = function (data, index) {
    var element = app.ukrainearrivalsresponse.socialwelfarepayment.config.headlineData[parseInt(index)].element;

    $(element).text(app.library.utility.formatNumber(data.value[0]));
};

//#endregion get Headline Data

//#region Draw Charts
app.ukrainearrivalsresponse.socialwelfarepayment.drawCharts = function () {

    // Social Welfare Schemes
    pxWidget.draw.init(
        'chart',
        "pxwidget5398050711",
        $.extend(true, {}, app.ukrainearrivalsresponse.socialwelfarepayment.config.chart.socialWelfareSchemes)
    );

    pxWidget.draw.init(
        'table',
        "pxwidget7621706891",
        $.extend(true, {}, app.ukrainearrivalsresponse.socialwelfarepayment.config.table.socialWelfareSchemes)
    );

    // Child Benefit
    pxWidget.draw.init(
        'chart',
        "pxwidget3574043391",
        $.extend(true, {}, app.ukrainearrivalsresponse.socialwelfarepayment.config.chart.childBenefit)
    );

    pxWidget.draw.init(
        'table',
        "pxwidget3011812721",
        $.extend(true, {}, app.ukrainearrivalsresponse.socialwelfarepayment.config.table.childBenefit)
    );
}

//#endregion