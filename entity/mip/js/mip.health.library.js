/*******************************************************************************
Custom JS application specific mip.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table
app.mip.health = {};
app.mip.config = {};
app.mip.health.ajax = {};
app.mip.health.callback = {};
app.mip.health.nsa85Metadata = null;
//#endregion

//#region Headline Figures

//#region Ireland: Life expectancy at birth
app.mip.health.ajax.lifeExpectancyAtBirthMetadata = function () {
    app.library.pxStat.getMetaData("MIP12", "app.mip.health.callback.lifeExpectancyAtBirthMetadata")
}

app.mip.health.callback.lifeExpectancyAtBirthMetadata = function (response) {
    app.mip.config.health.headlineFigures.lifeExpectancyAtBirth.params.dimension["TLIST(A1)"].category.index = app.library.jsonStat.getTimeLast(response, 1);
    $("#mip-health-content").find("[name=life-expectancy-at-birth-year]").text(app.library.jsonStat.getTimeLast(response, 1)[0]);
    app.mip.health.ajax.lifeExpectancyAtBirthData();
}

app.mip.health.ajax.lifeExpectancyAtBirthData = function () {
    app.library.pxStat.getData(app.mip.config.health.headlineFigures.lifeExpectancyAtBirth.params, "app.mip.health.callback.lifeExpectancyAtBirthData")
}

app.mip.health.callback.lifeExpectancyAtBirthData = function (response) {
    $("#mip-health-content").find("[name=life-expectancy-at-birth]").text(app.library.utility.formatNumber(response.value[0]));
    $("#mip-health-content").find("[name=life-expectancy-at-birth-table]").text(app.config.url.api.pxStat.application + response.extension.matrix).attr("href", app.config.url.api.pxStat.application + response.extension.matrix);
}
//#endregion Ireland: Life expectancy at birth

//#region Ireland: Life expectancy at age 65 for males
app.mip.health.ajax.lifeExpectancyAge65MalesMetadata = function () {
    app.library.pxStat.getMetaData("VSA30", "app.mip.health.callback.lifeExpectancyAge65MalesMetadata")
}

app.mip.health.callback.lifeExpectancyAge65MalesMetadata = function (response) {
    app.mip.config.health.headlineFigures.lifeExpectancyAge65Males.params.dimension["TLIST(A1)"].category.index = app.library.jsonStat.getTimeLast(response, 1);
    $("#mip-health-content").find("[name=life-expectancy-at-65-male-year]").text(app.library.jsonStat.getTimeLast(response, 1)[0]);
    app.mip.health.ajax.lifeExpectancyAge65Males();
}

app.mip.health.ajax.lifeExpectancyAge65Males = function () {
    app.library.pxStat.getData(app.mip.config.health.headlineFigures.lifeExpectancyAge65Males.params, "app.mip.health.callback.lifeExpectancyAge65Males")
}

app.mip.health.callback.lifeExpectancyAge65Males = function (response) {
    $("#mip-health-content").find("[name=life-expectancy-at-65-male]").text(app.library.utility.formatNumber(response.value[0]));
    $("#mip-health-content").find("[name=life-expectancy-at-65-male-table]").text(app.config.url.api.pxStat.application + response.extension.matrix).attr("href", app.config.url.api.pxStat.application + response.extension.matrix);
}
//#endregion Ireland: Life expectancy at age 65 for males

//#region Ireland: Life expectancy at age 65 for females
app.mip.health.ajax.lifeExpectancyAge65FemalesMetadata = function () {
    app.library.pxStat.getMetaData("VSA30", "app.mip.health.callback.lifeExpectancyAge65FemalesMetadata")
}

app.mip.health.callback.lifeExpectancyAge65FemalesMetadata = function (response) {
    app.mip.config.health.headlineFigures.lifeExpectancyAge65Females.params.dimension["TLIST(A1)"].category.index = app.library.jsonStat.getTimeLast(response, 1);
    $("#mip-health-content").find("[name=life-expectancy-at-65-female-year]").text(app.library.jsonStat.getTimeLast(response, 1)[0]);
    app.mip.health.ajax.lifeExpectancyAge65Females();
}

app.mip.health.ajax.lifeExpectancyAge65Females = function () {
    app.library.pxStat.getData(app.mip.config.health.headlineFigures.lifeExpectancyAge65Females.params, "app.mip.health.callback.lifeExpectancyAge65Females")
}

app.mip.health.callback.lifeExpectancyAge65Females = function (response) {
    $("#mip-health-content").find("[name=life-expectancy-at-65-female]").text(app.library.utility.formatNumber(response.value[0]));
    $("#mip-health-content").find("[name=life-expectancy-at-65-female-table]").text(app.config.url.api.pxStat.application + response.extension.matrix).attr("href", app.config.url.api.pxStat.application + response.extension.matrix);
}
//#endregion Ireland: Life expectancy at age 65 for females


//#endregion Headline Figures

//#region Charts

//#region EU27: Total expenditure on health

app.mip.health.ajax.totalExpenditureOnHealthMetadata = function () {
    app.library.pxStat.getMetaData("MIP13", "app.mip.health.callback.totalExpenditureOnHealthMetadata")
}

app.mip.health.callback.totalExpenditureOnHealthMetadata = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    app.mip.config.health.charts.totalExpenditureOnHealth.data.datasets[0].api.query.data.params.dimension["TLIST(A1)"].category.index = lastPeriod;
    $("#mip-health-content").find("[name=total-expenditure-on-health-year]").text(lastPeriod);
    app.mip.config.health.charts.totalExpenditureOnHealth.data.datasets[0].label = app.label.static["%-gdp"];

    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-total-expenditure-on-health',
        app.mip.config.health.charts.totalExpenditureOnHealth
    );
}

//#endregion EU27: Total expenditure on health

//#region Ireland and EU27: Life expectancy at birth by sex

app.mip.health.ajax.lifeExpectancyAtBirthSex = function () {
    app.library.pxStat.getMetaData("MIP12", "app.mip.health.callback.lifeExpectancyAtBirthSex")
}

app.mip.health.callback.lifeExpectancyAtBirthSex = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    $(app.mip.config.health.charts.lifeExpectancyAtBirthSex.data.datasets).each(function (index, value) {
        value.api.query.data.params.dimension[app.library.jsonStat.getTimeDimensionCode(response)].category.index = lastPeriod;
    });
    $("#mip-health-content").find("[name=life-expectancy-at-birth-sex-year]").text(lastPeriod);
    app.mip.config.health.charts.lifeExpectancyAtBirthSex.data.datasets[0].label = app.label.static["eu-27"];
    app.mip.config.health.charts.lifeExpectancyAtBirthSex.data.datasets[1].label = app.label.static["ireland"];

    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-life-expectancy-at-birth-sex',
        app.mip.config.health.charts.lifeExpectancyAtBirthSex
    );
}
//#endregion Ireland and EU27: Life expectancy at birth by sex

//#region Ireland and EU27: Healthy life years at birth by sex

app.mip.health.ajax.healthyLifeYearsAtBirthBySex = function () {
    app.library.pxStat.getMetaData("MIP06", "app.mip.health.callback.healthyLifeYearsAtBirthBySex")
}

app.mip.health.callback.healthyLifeYearsAtBirthBySex = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    $(app.mip.config.health.charts.healthyLifeYearsAtBirthBySex.data.datasets).each(function (index, value) {
        value.api.query.data.params.dimension[app.library.jsonStat.getTimeDimensionCode(response)].category.index = lastPeriod;
    });
    $("#mip-health-content").find("[name=healthy-life-years-at-birth-sex-year]").text(lastPeriod);
    app.mip.config.health.charts.healthyLifeYearsAtBirthBySex.data.datasets[0].label = app.label.static["eu-27"];
    app.mip.config.health.charts.healthyLifeYearsAtBirthBySex.data.datasets[1].label = app.label.static["ireland"];

    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-healthy-life-years-at-birth-sex',
        app.mip.config.health.charts.healthyLifeYearsAtBirthBySex
    );
}
//#endregion Ireland and EU27: Healthy life years at birth by sex

//#region Ireland and EU27: Proportion of life expectancy in poor health

app.mip.health.ajax.lifeExpectancyInPoorHealth = function () {
    app.library.pxStat.getMetaData("MIP16", "app.mip.health.callback.lifeExpectancyInPoorHealth")
}

app.mip.health.callback.lifeExpectancyInPoorHealth = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    $(app.mip.config.health.charts.lifeExpectancyInPoorHealth.data.datasets).each(function (index, value) {
        value.api.query.data.params.dimension[app.library.jsonStat.getTimeDimensionCode(response)].category.index = lastPeriod;
    });
    $("#mip-health-content").find("[name=life-expectancy-in-poor-health-year]").text(lastPeriod);
    app.mip.config.health.charts.lifeExpectancyInPoorHealth.data.datasets[0].label = app.label.static["male"];
    app.mip.config.health.charts.lifeExpectancyInPoorHealth.data.datasets[1].label = app.label.static["female"];

    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-life-expectancy-in-poor-health',
        app.mip.config.health.charts.lifeExpectancyInPoorHealth
    );
}
//#endregion Ireland and EU27: Proportion of life expectancy in poor health

//#region Ireland: Current public expenditure on healthcare

app.mip.health.ajax.currentExpenditureOnHealthcare = function () {
    app.library.pxStat.getMetaData("SHA07", "app.mip.health.callback.currentExpenditureOnHealthcare")
}

app.mip.health.callback.currentExpenditureOnHealthcare = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 11);
    app.mip.config.health.charts.currentExpenditureOnHealthcare.metadata.xAxis[app.library.jsonStat.getTimeDimensionCode(response)] = lastPeriod;

    app.mip.config.health.charts.currentExpenditureOnHealthcare.data.datasets[0].label = app.label.static["current-public-expenditure"];


    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-current-expenditure-on-healthcare',
        app.mip.config.health.charts.currentExpenditureOnHealthcare
    );
}

//#endregion Ireland: Current public expenditure on healthcare

//#endregion Charts