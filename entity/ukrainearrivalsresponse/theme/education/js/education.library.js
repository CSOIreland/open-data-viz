/*******************************************************************************
Custom JS application specific ukrainearrivalsresponse.education.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table

app.ukrainearrivalsresponse.education = {};
app.ukrainearrivalsresponse.education.config = {};
app.ukrainearrivalsresponse.education.ajax = {};
app.ukrainearrivalsresponse.education.callback = {};

//#endregion

//#region get Headline Data
app.ukrainearrivalsresponse.education.ajax.getHeadlineFiguresMetadata = function () {
    $.each(app.ukrainearrivalsresponse.education.config.headlineData, function (index, value) {
        var matrix = value.query.extension.matrix;
        app.library.pxStat.getMetaData(matrix, "app.ukrainearrivalsresponse.education.callback.getHeadlineFiguresMetadata", index.toString());
    });
};

app.ukrainearrivalsresponse.education.callback.getHeadlineFiguresMetadata = function (data, index) {
    var timeDimension = app.library.jsonStat.getTimeDimensionCode(data);
    var timeLast = app.library.jsonStat.getTimeLast(data, 1)[0];
    var query = app.ukrainearrivalsresponse.education.config.headlineData[parseInt(index)].query;
    query.dimension[timeDimension].category.index = [timeLast];
    app.library.pxStat.getData(query, "app.ukrainearrivalsresponse.education.callback.renderHeadlineFigure", index.toString());
};

app.ukrainearrivalsresponse.education.callback.renderHeadlineFigure = function (data, index) {
    var element = app.ukrainearrivalsresponse.education.config.headlineData[parseInt(index)].element;

    $(element).text(app.library.utility.formatNumber(data.value[0]));
};

//#endregion get Headline Data