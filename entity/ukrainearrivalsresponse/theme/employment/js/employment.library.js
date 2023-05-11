/*******************************************************************************
Custom JS application specific ukrainearrivalsresponse.employment.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table

app.ukrainearrivalsresponse.employment = {};
app.ukrainearrivalsresponse.employment.config = {};
app.ukrainearrivalsresponse.employment.ajax = {};
app.ukrainearrivalsresponse.employment.callback = {};

//#endregion

//#region get Headline Data
app.ukrainearrivalsresponse.employment.ajax.getHeadlineFiguresMetadata = function () {
    $.each(app.ukrainearrivalsresponse.employment.config.headlineData, function (index, value) {
        var matrix = value.query.extension.matrix;
        app.library.pxStat.getMetaData(matrix, "app.ukrainearrivalsresponse.employment.callback.getHeadlineFiguresMetadata", index.toString());
    });
};

app.ukrainearrivalsresponse.employment.callback.getHeadlineFiguresMetadata = function (data, index) {
    var timeDimension = app.library.jsonStat.getTimeDimensionCode(data);
    var timeLast = app.library.jsonStat.getTimeLast(data, 1)[0];
    var query = app.ukrainearrivalsresponse.employment.config.headlineData[parseInt(index)].query;
    query.dimension[timeDimension].category.index = [timeLast];
    app.library.pxStat.getData(query, "app.ukrainearrivalsresponse.employment.callback.renderHeadlineFigure", index.toString());
};

app.ukrainearrivalsresponse.employment.callback.renderHeadlineFigure = function (data, index) {
    var element = app.ukrainearrivalsresponse.employment.config.headlineData[parseInt(index)].element;

    $(element).text(app.library.utility.formatNumber(data.value[0]));
};

//#endregion get Headline Data

//#region Charts and Maps
app.ukrainearrivalsresponse.employment.drawCharts = function () {
    // Location of Arrivals Map
    pxWidget.draw.init(
        'map',
        "pxwidget6281235231",
        $.extend(true, {}, app.ukrainearrivalsresponse.employment.config.map.numberOfEmployments)
    );
}
//#endregion