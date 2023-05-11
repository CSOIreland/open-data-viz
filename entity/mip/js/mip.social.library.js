/*******************************************************************************
Custom JS application specific mip.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table
app.mip.social = {};
app.mip.config = {};
app.mip.social.ajax = {};
app.mip.social.callback = {};
app.mip.social.nsa85Metadata = null;
//#endregion

//#region Headline Figures

//#region Population of Ireland
app.mip.social.ajax.populationOfIrelandMetadata = function () {
    app.library.pxStat.getMetaData("PEA01", "app.mip.social.callback.populationOfIrelandMetadata")
}

app.mip.social.callback.populationOfIrelandMetadata = function (response) {
    app.mip.config.society.headlineFigures.populationOfIreland.params.dimension["TLIST(A1)"].category.index = app.library.jsonStat.getTimeLast(response, 1);
    $("#mip-society-content").find("[name=population-year]").text(app.library.jsonStat.getTimeLast(response, 1)[0]);
    app.mip.social.ajax.populationOfIrelandData();
}

app.mip.social.ajax.populationOfIrelandData = function () {
    app.library.pxStat.getData(app.mip.config.society.headlineFigures.populationOfIreland.params, "app.mip.social.callback.populationOfIrelandData")
}

app.mip.social.callback.populationOfIrelandData = function (response) {
    $("#mip-society-content").find("[name=population]").text(app.library.utility.formatNumber(response.value[0]));
    $("#mip-society-content").find("[name=population-unit]").text(app.label.static["('000-persons)"]);
    $("#mip-society-content").find("[name=population-table]").text(app.config.url.api.pxStat.application + response.extension.matrix).attr("href", app.config.url.api.pxStat.application + response.extension.matrix);
}
//#endregion Population of Ireland 

//#region Population Change

app.mip.social.ajax.populationChangeMetadata = function () {
    app.library.pxStat.getMetaData("PEA15", "app.mip.social.callback.populationChangeMetadata")
}

app.mip.social.callback.populationChangeMetadata = function (response) {
    app.mip.config.society.headlineFigures.populationChange.params.dimension["TLIST(A1)"].category.index = app.library.jsonStat.getTimeLast(response, 1);
    $("#mip-society-content").find("[name=population-change-year]").text(app.library.jsonStat.getTimeLast(response, 1)[0]);
    $("#mip-society-content").find("[name=population-change-unit]").text(app.label.static["('000-persons)"]);
    app.mip.social.ajax.populationChangeData();
}

app.mip.social.ajax.populationChangeData = function () {
    app.library.pxStat.getData(app.mip.config.society.headlineFigures.populationChange.params, "app.mip.social.callback.populationChangeData")
}

app.mip.social.callback.populationChangeData = function (response) {
    $("#mip-society-content").find("[name=population-change]").text(app.library.utility.formatNumber(response.value[0]));
    $("#mip-society-content").find("[name=population-change-table]").text(app.config.url.api.pxStat.application + response.extension.matrix).attr("href", app.config.url.api.pxStat.application + response.extension.matrix);
}
//#endregion Population Change

//#region Difference in Weekly Median Earnings
app.mip.social.ajax.differenceInWeeklyMedianEarningsMetadata = function () {
    app.library.pxStat.getMetaData("NSA85", "app.mip.social.callback.differenceInWeeklyMedianEarningsMetadata")
}

app.mip.social.callback.differenceInWeeklyMedianEarningsMetadata = function (response) {
    app.mip.social.nsa85Metadata = response;
    app.mip.config.society.headlineFigures.medianWeeklyEarnings.params.dimension["TLIST(A1)"].category.index = app.library.jsonStat.getTimeLast(app.mip.social.nsa85Metadata, 1);
    $("#mip-society-content").find("[name=weekly-earnings-male-female-year]").text(app.library.jsonStat.getTimeLast(app.mip.social.nsa85Metadata, 1)[0]);
    app.mip.social.ajax.differenceInWeeklyMedianEarnings();
}

app.mip.social.ajax.differenceInWeeklyMedianEarnings = function () {
    app.library.pxStat.getData(app.mip.config.society.headlineFigures.medianWeeklyEarnings.params, "app.mip.social.callback.differenceInWeeklyMedianEarnings")
}

app.mip.social.callback.differenceInWeeklyMedianEarnings = function (response) {
    var maleEarnings = response.Data({
        "STATISTIC": "NSA85C02",
        "TLIST(A1)": app.library.jsonStat.getTimeLast(app.mip.social.nsa85Metadata, 1),
        "C02199V02655": "1",
        "C02665V03225": "-"
    }).value

    var femaleEarnings = response.Data({
        "STATISTIC": "NSA85C02",
        "TLIST(A1)": app.library.jsonStat.getTimeLast(app.mip.social.nsa85Metadata, 1),
        "C02199V02655": "2",
        "C02665V03225": "-"
    }).value

    $("#mip-society-content").find("[name=weekly-earnings-male-female]").text(app.library.utility.formatNumber((maleEarnings - femaleEarnings), null, null, 2));
    $("#mip-society-content").find("[name=earnings-table]").text(app.config.url.api.pxStat.application + response.extension.matrix).attr("href", app.config.url.api.pxStat.application + response.extension.matrix);
}

//#endregion Difference In Median Weekly Earnings 

//#endregion Headline Figures

//#region Charts
app.mip.social.ajax.totalFertilityRateMetadata = function () {
    app.library.pxStat.getMetaData("MIP01", "app.mip.social.callback.totalFertilityRateMetadata")
}

app.mip.social.callback.totalFertilityRateMetadata = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    app.mip.config.society.charts.totalFertilityRate.data.datasets[0].api.query.data.params.dimension["TLIST(A1)"].category.index = lastPeriod;
    app.mip.config.society.charts.totalFertilityRate.data.datasets[0].label = app.label.static["fertility-rate"];
    $("#mip-society-content").find("[name=total-fertility-rate-year]").text(lastPeriod);

    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-totalFertilityRate',
        app.mip.config.society.charts.totalFertilityRate
    );
}



app.mip.social.ajax.populationByAgeGroup = function () {
    app.library.pxStat.getMetaData("PEA01", "app.mip.social.callback.populationByAgeGroup")
}

app.mip.social.callback.populationByAgeGroup = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    app.mip.config.society.charts.populationByAgeGroup.metadata.xAxis[app.library.jsonStat.getTimeDimensionCode(response)] = lastPeriod;
    $("#mip-society-content").find("[name=population-by-age-group-year]").text(lastPeriod);
    app.mip.config.society.charts.populationByAgeGroup.data.datasets[0].label = app.label.static["0-14-years"];
    app.mip.config.society.charts.populationByAgeGroup.data.datasets[1].label = app.label.static["15-24-years"];
    app.mip.config.society.charts.populationByAgeGroup.data.datasets[2].label = app.label.static["25-44-years"];
    app.mip.config.society.charts.populationByAgeGroup.data.datasets[3].label = app.label.static["45-64-years"];
    app.mip.config.society.charts.populationByAgeGroup.data.datasets[4].label = app.label.static["65-years-and-older"];

    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-populationByAgeGroup',
        app.mip.config.society.charts.populationByAgeGroup
    );
}

app.mip.social.ajax.atRiskOfPoverty = function () {
    app.library.pxStat.getMetaData("SIA61", "app.mip.social.callback.atRiskOfPoverty")
}

app.mip.social.callback.atRiskOfPoverty = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    $(app.mip.config.society.charts.atRiskOfPoverty.data.datasets).each(function (index, value) {
        value.api.query.data.params.dimension[app.library.jsonStat.getTimeDimensionCode(response)].category.index = lastPeriod;
    });
    $("#mip-society-content").find("[name=at-risk-of-poverty-year]").text(lastPeriod);
    app.mip.config.society.charts.atRiskOfPoverty.data.datasets[0].label = app.label.static["at-risk-of-poverty"];
    app.mip.config.society.charts.atRiskOfPoverty.data.datasets[1].label = app.label.static["consistent-poverty"];
    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-atRiskOfPoverty',
        app.mip.config.society.charts.atRiskOfPoverty
    );
}

app.mip.social.ajax.youngAndOldDependencyRatios = function () {
    app.library.pxStat.getMetaData("MIP04", "app.mip.social.callback.youngAndOldDependencyRatios")
}

app.mip.social.callback.youngAndOldDependencyRatios = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    $(app.mip.config.society.charts.youngAndOldDependencyRatios.data.datasets).each(function (index, value) {
        value.api.query.data.params.dimension[app.library.jsonStat.getTimeDimensionCode(response)].category.index = lastPeriod;
    });
    $("#mip-society-content").find("[name=young-and-old-dependency-ratios-year]").text(lastPeriod);
    app.mip.config.society.charts.youngAndOldDependencyRatios.data.datasets[0].label = app.label.static["eu-27"];
    app.mip.config.society.charts.youngAndOldDependencyRatios.data.datasets[1].label = app.label.static["ireland"];

    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-youngAndOldDependencyRatios',
        app.mip.config.society.charts.youngAndOldDependencyRatios
    );
}

app.mip.social.ajax.migrationNaturalIncreaseMetadata = function () {
    app.library.pxStat.getMetaData("PEA15", "app.mip.social.callback.migrationNaturalIncreaseMetadata")
}

app.mip.social.callback.migrationNaturalIncreaseMetadata = function (response) {
    app.mip.config.society.charts.migrationNaturalIncrease.metadata.xAxis[app.library.jsonStat.getTimeDimensionCode(response)] = app.library.jsonStat.getTimeLast(response, 10);
    app.mip.config.society.charts.migrationNaturalIncrease.data.datasets[0].label = app.label.static["immigrants"];
    app.mip.config.society.charts.migrationNaturalIncrease.data.datasets[1].label = app.label.static["emigrants"];
    app.mip.config.society.charts.migrationNaturalIncrease.data.datasets[2].label = app.label.static["net-migration"];
    app.mip.config.society.charts.migrationNaturalIncrease.data.datasets[3].label = app.label.static["births"];
    app.mip.config.society.charts.migrationNaturalIncrease.data.datasets[4].label = app.label.static["deaths"];
    app.mip.config.society.charts.migrationNaturalIncrease.data.datasets[5].label = app.label.static["natural-increase"];
    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-migrationNaturalIncrease',
        app.mip.config.society.charts.migrationNaturalIncrease
    );
}
//#endregion Charts