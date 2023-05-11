/*******************************************************************************
Custom JS application specific ukrainearrivalsresponse.locationofarrivalslea.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table

app.ukrainearrivalsresponse.locationofarrivalslea = {};
app.ukrainearrivalsresponse.locationofarrivalslea.config = {};
app.ukrainearrivalsresponse.locationofarrivalslea.ajax = {};
app.ukrainearrivalsresponse.locationofarrivalslea.callback = {};

//#endregion

//#region get Headline Data
app.ukrainearrivalsresponse.locationofarrivalslea.ajax.getHeadlineFiguresMetadata = function () {
    $.each(app.ukrainearrivalsresponse.locationofarrivalslea.config.headlineData, function (index, value) {
        var matrix = value.query.extension.matrix;
        app.library.pxStat.getMetaData(matrix, "app.ukrainearrivalsresponse.locationofarrivalslea.callback.getHeadlineFiguresMetadata", index.toString());
    });
};

app.ukrainearrivalsresponse.locationofarrivalslea.callback.getHeadlineFiguresMetadata = function (data, index) {
    var timeDimension = app.library.jsonStat.getTimeDimensionCode(data);
    var timeLast = app.library.jsonStat.getTimeLast(data, 1)[0];
    var query = app.ukrainearrivalsresponse.locationofarrivalslea.config.headlineData[parseInt(index)].query;
    query.dimension[timeDimension].category.index = [timeLast];
    app.library.pxStat.getData(query, "app.ukrainearrivalsresponse.locationofarrivalslea.callback.renderHeadlineFigure", index.toString());
};

app.ukrainearrivalsresponse.locationofarrivalslea.callback.renderHeadlineFigure = function (data, index) {
    var element = app.ukrainearrivalsresponse.locationofarrivalslea.config.headlineData[parseInt(index)].element;

    $(element).text(app.library.utility.formatNumber(data.value[0]));
};

//#endregion get Headline Data

//# region Arrivals by County Chart
app.ukrainearrivalsresponse.locationofarrivalslea.ajax.getCountyData = function () {
    var params = app.ukrainearrivalsresponse.locationofarrivalslea.config.numArrivalsCounty.query;
    app.library.pxStat.getData(params, "app.ukrainearrivalsresponse.locationofarrivalslea.callback.getCountyData");
};

app.ukrainearrivalsresponse.locationofarrivalslea.callback.getCountyData = function (result) {
    var topCounties = [];
    var countyDimension = app.library.jsonStat.getDimensionVariables(result, "C03788V04538", true);

    $.each(countyDimension, function (key, value) {
        var total = result.Data({
            "STATISTIC": "UA34C01",
            "TLIST(D1)": app.library.jsonStat.getTimeLast(result)[0],
            "C03788V04538": value.code
        }).value;

        topCounties.push(
            {
                "total": total,
                "code": value.code
            }
        )

    });
    topCounties.sort(function (a, b) {
        return b.total - a.total;
    });

    var topSixCounties = topCounties.slice(0, 6);
    var topSixCountyCodes = [];
    $.each(topSixCounties, function (key, value) {
        topSixCountyCodes.push(value.code);
    });

    app.ukrainearrivalsresponse.locationofarrivalslea.drawCountyByArrivalsChart(topSixCountyCodes)
};


app.ukrainearrivalsresponse.locationofarrivalslea.drawCountyByArrivalsChart = function (codes) {
    var config = $.extend(true, {}, app.ukrainearrivalsresponse.locationofarrivalslea.config.chart.countyByNumberOfArrivals);
    config.metadata.xAxis.C03788V04538 = codes;
    // County by Number of Arrivals Chart
    pxWidget.draw.init(
        'chart',
        "pxwidget9115586451",
        config
    );

    // County by Number of Arrivals Table
    pxWidget.draw.init(
        'table',
        "pxwidget1586819541",
        $.extend(true, {}, app.ukrainearrivalsresponse.locationofarrivalslea.config.table.countyByNumberOfArrivals)
    );
}



//# endregion Arrivals by County Chart

// region LEA by Number of Arrivals 

app.ukrainearrivalsresponse.locationofarrivalslea.ajax.getLeaData = function () {
    var params = app.ukrainearrivalsresponse.locationofarrivalslea.config.numArrivalsLea.query;
    app.library.pxStat.getData(params, "app.ukrainearrivalsresponse.locationofarrivalslea.callback.getLeaData");
};

app.ukrainearrivalsresponse.locationofarrivalslea.callback.getLeaData = function (result) {
    var topLeas = [];
    var leaDimension = app.library.jsonStat.getDimensionVariables(result, "C03877V04628", true);
    var latestDate = app.library.jsonStat.getTimeLast(result)[0]

    $.each(leaDimension, function (key, value) {
        var total = result.Data({
            "STATISTIC": "UA05C01",
            "TLIST(D1)": latestDate,
            "C03877V04628": value.code
        }).value;

        topLeas.push(
            {
                "total": total,
                "code": value.code
            }
        )

    });
    topLeas.sort(function (a, b) {
        return b.total - a.total;
    });

    var topSixLeas = topLeas.slice(0, 6);
    var topSixLeaCodes = [];
    $.each(topSixLeas, function (key, value) {
        topSixLeaCodes.push(value.code);
    });

    app.ukrainearrivalsresponse.locationofarrivalslea.drawLeaByArrivals(topSixLeaCodes);
    app.ukrainearrivalsresponse.locationofarrivalslea.drawMap(latestDate);
};

app.ukrainearrivalsresponse.locationofarrivalslea.drawLeaByArrivals = function (codes) {
    var config = $.extend(true, {}, app.ukrainearrivalsresponse.locationofarrivalslea.config.chart.leaByNumberOfArrivals);
    config.metadata.xAxis.C03877V04628 = codes;
    // LEA by Number of Arrivals Chart
    pxWidget.draw.init(
        'chart',
        "pxwidget5881065471",
        config
    );
    // LEA by Number of Arrivals Table
    pxWidget.draw.init(
        'table',
        "pxwidget1814834851",
        $.extend(true, {}, app.ukrainearrivalsresponse.locationofarrivalslea.config.table.leaByNumberOfArrivals)
    );
}
//# endregion Arrivals by County Chart


app.ukrainearrivalsresponse.locationofarrivalslea.drawMap = function (data) {
    var latestDate = [data]
    var config = $.extend(true, {}, app.ukrainearrivalsresponse.locationofarrivalslea.config.map.locationOfArrivals);
    config.data.datasets[0].api.query.data.params.dimension["TLIST(D1)"].category.index = latestDate;

    // Location of Arrivals Map
    pxWidget.draw.init(
        'map',
        "pxwidget3390647521",
        config
    );
};



//#endregion