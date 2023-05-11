/*******************************************************************************
Custom JS application specific mip.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table
app.mip.economy = {};
app.mip.config = {};
app.mip.economy.ajax = {};
app.mip.economy.callback = {};

//#endregion

//#region headline Figures

//#region GDP of Ireland
/* app.mip.economy.ajax.gdpOfIrelandMetadata = function () {
    app.library.pxStat.getMetaData("N2024", "app.mip.economy.callback.gdpOfIrelandMetadata")
}

app.mip.economy.callback.gdpOfIrelandMetadata = function (response) {
    app.mip.config.economy.headlineFigures.gdpOfIreland.params.dimension["TLIST(A1)"].category.index = app.library.jsonStat.getTimeLast(response, 1);
    $("#mip-economy-content").find("[name=gdp-ireland-year]").text(app.library.jsonStat.getTimeLast(response, 1)[0]);
    app.mip.economy.ajax.gdpOfIreland();
}

app.mip.economy.ajax.gdpOfIreland = function () {
    app.library.pxStat.getData(app.mip.config.economy.headlineFigures.gdpOfIreland.params, "app.mip.economy.callback.gdpOfIreland")
}

app.mip.economy.callback.gdpOfIreland = function (response) {
    $("#mip-economy-content").find("[name=gdp-ireland]").text(app.library.utility.formatNumber(response.value[0]));
    $("#mip-economy-content").find("[name=gdp-ireland-unit]").text(app.label.static["(€-million)"]);
    $("#mip-economy-content").find("[name=gdp-ireland-table]").text(app.config.url.api.pxStat.application + response.extension.matrix).attr("href", app.config.url.api.pxStat.application + response.extension.matrix);
}

//#endregion GDP of Ireland

//#region Modified GNI of Ireland
app.mip.economy.ajax.modifiedGniOfIrelandMetadata = function () {
    app.library.pxStat.getMetaData("N2024", "app.mip.economy.callback.modifiedGniOfIrelandMetadata")
}

app.mip.economy.callback.modifiedGniOfIrelandMetadata = function (response) {
    app.mip.config.economy.headlineFigures.modifiedGniOfIreland.params.dimension["TLIST(A1)"].category.index = app.library.jsonStat.getTimeLast(response, 1);
    $("#mip-economy-content").find("[name=modified-gni-ireland-year]").text(app.library.jsonStat.getTimeLast(response, 1)[0]);
    app.mip.economy.ajax.modifiedGniOfIreland();
}

app.mip.economy.ajax.modifiedGniOfIreland = function () {
    app.library.pxStat.getData(app.mip.config.economy.headlineFigures.modifiedGniOfIreland.params, "app.mip.economy.callback.modifiedGniOfIreland")
}

app.mip.economy.callback.modifiedGniOfIreland = function (response) {
    $("#mip-economy-content").find("[name=modified-gni-ireland]").text(app.library.utility.formatNumber(response.value[0]));
    $("#mip-economy-content").find("[name=modified-gni-ireland-unit]").text(app.label.static["(€-million)"]);
    $("#mip-economy-content").find("[name=modified-gni-table]").text(app.config.url.api.pxStat.application + response.extension.matrix).attr("href", app.config.url.api.pxStat.application + response.extension.matrix);
} */

//#endregion Modified GNI of Ireland

//#region General Government Consolidated Gross Debt

app.mip.economy.ajax.generalGovConsolidatedGrossDebtMetadata = function () {
    app.library.pxStat.getMetaData("GFA12", "app.mip.economy.callback.generalGovConsolidatedGrossDebtMetadata")
}

app.mip.economy.callback.generalGovConsolidatedGrossDebtMetadata = function (response) {
    app.mip.config.economy.headlineFigures.generalGovConsolidatedGrossDebt.params.dimension["TLIST(A1)"].category.index = app.library.jsonStat.getTimeLast(response, 1);
    $("#mip-economy-content").find("[name=general-gov-consolidated-gross-debt-year]").text(app.library.jsonStat.getTimeLast(response, 1)[0]);
    app.mip.economy.ajax.generalGovConsolidatedGrossDebt();
}

app.mip.economy.ajax.generalGovConsolidatedGrossDebt = function () {
    app.library.pxStat.getData(app.mip.config.economy.headlineFigures.generalGovConsolidatedGrossDebt.params, "app.mip.economy.callback.generalGovConsolidatedGrossDebt")
}

app.mip.economy.callback.generalGovConsolidatedGrossDebt = function (response) {
    $("#mip-economy-content").find("[name=general-gov-consolidated-gross-debt]").text(app.library.utility.formatNumber(response.value[0]));
    $("#mip-economy-content").find("[name=general-gov-consolidated-gross-debt-unit]").text(app.label.static["(as-%-of-gdp)"]);
    $("#mip-economy-content").find("[name=gross-debt-table]").text(app.config.url.api.pxStat.application + response.extension.matrix).attr("href", app.config.url.api.pxStat.application + response.extension.matrix);
}

//#endregion General Government Consolidated Gross Debt

//#endregion headline Figures

//#region Charts

//#region Comparative price levels

app.mip.economy.ajax.comparitivePriceLevelsMetadata = function () {
    app.library.pxStat.getMetaData("MIP02", "app.mip.economy.callback.comparitivePriceLevelsMetadata")
}

app.mip.economy.callback.comparitivePriceLevelsMetadata = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    app.mip.config.economy.charts.comparitivePriceLevels.data.datasets[0].api.query.data.params.dimension["TLIST(A1)"].category.index = lastPeriod;
    $("#mip-economy-content").find("[name=comparative-price-levels-year]").text(lastPeriod);
    app.mip.config.economy.charts.comparitivePriceLevels.data.datasets[0].label = app.label.static["index"];

    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-comparative-price-levels',
        app.mip.config.economy.charts.comparitivePriceLevels
    );
}

//#endregion Comparative price levels

//#region GDP growth rates

app.mip.economy.ajax.gdpGrowthRatesMetadata = function () {
    app.library.pxStat.getMetaData("MIP10", "app.mip.economy.callback.gdpGrowthRatesMetadata")
}

app.mip.economy.callback.gdpGrowthRatesMetadata = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    app.mip.config.economy.charts.gdpGrowthRates.data.datasets[0].api.query.data.params.dimension["TLIST(A1)"].category.index = lastPeriod;
    app.mip.config.economy.charts.gdpGrowthRates.data.datasets[1].api.query.data.params.dimension["TLIST(A1)"].category.index = lastPeriod;
    app.mip.config.economy.charts.gdpGrowthRates.data.datasets[2].api.query.data.params.dimension["TLIST(A1)"].category.index = lastPeriod;
    $("#mip-economy-content").find("[name=gdp-growth-rates-year]").text(lastPeriod);
    app.mip.config.economy.charts.gdpGrowthRates.data.datasets[0].label = app.label.static["eu-27"];
    app.mip.config.economy.charts.gdpGrowthRates.data.datasets[1].label = app.label.static["ireland-percentage-gdp"];
    app.mip.config.economy.charts.gdpGrowthRates.data.datasets[2].label = app.label.static["ireland-percentage-gni"];


    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-gdp-growth-rates',
        app.mip.config.economy.charts.gdpGrowthRates
    );
}

//#endregion GDP growth rates

//#region Unemployment rates

app.mip.economy.ajax.unemploymentRatesMetadata = function () {
    app.library.pxStat.getMetaData("MIP11", "app.mip.economy.callback.unemploymentRatesMetadata")
}

app.mip.economy.callback.unemploymentRatesMetadata = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    $(app.mip.config.economy.charts.unemploymentRates.data.datasets).each(function (index, value) {
        value.api.query.data.params.dimension[app.library.jsonStat.getTimeDimensionCode(response)].category.index = lastPeriod;
    });
    $("#mip-economy-content").find("[name=unemployment-rates-year]").text(lastPeriod);
    app.mip.config.economy.charts.unemploymentRates.data.datasets[0].label = app.label.static["eu-27"];
    app.mip.config.economy.charts.unemploymentRates.data.datasets[1].label = app.label.static["ireland"];
    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-unemployment-rates',
        app.mip.config.economy.charts.unemploymentRates
    );
}

//#endregion Unemployment rates

//#region Residential Property Price Index

app.mip.economy.ajax.irelandRppiMetadata = function () {
    app.library.pxStat.getMetaData("HPA06", "app.mip.economy.callback.irelandRppiMetadata")
}

app.mip.economy.callback.irelandRppiMetadata = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    $(app.mip.config.economy.charts.rppi.data.datasets).each(function (index, value) {
        value.api.query.data.params.dimension[app.library.jsonStat.getTimeDimensionCode(response)].category.index = lastPeriod;
    });
    $("#mip-economy-content").find("[name=rppi-year]").text(lastPeriod);
    app.mip.config.economy.charts.rppi.data.datasets[0].label = app.label.static["national"];
    app.mip.config.economy.charts.rppi.data.datasets[1].label = app.label.static["dublin"];
    app.mip.config.economy.charts.rppi.data.datasets[2].label = app.label.static["rest-of-ireland"];

    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-rppi',
        app.mip.config.economy.charts.rppi
    );
}

//#endregion Residential Property Price Index

//#region Imports and Exports of goods and services

app.mip.economy.ajax.importsAndExportsMetadata = function () {
    app.library.pxStat.getMetaData("MIP15", "app.mip.economy.callback.importsAndExportsMetadata")
}

app.mip.economy.callback.importsAndExportsMetadata = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    $(app.mip.config.economy.charts.importsAndExports.data.datasets).each(function (index, value) {
        value.api.query.data.params.dimension[app.library.jsonStat.getTimeDimensionCode(response)].category.index = lastPeriod;
    });
    $("#mip-economy-content").find("[name=imports-exports-year]").text(lastPeriod);
    app.mip.config.economy.charts.importsAndExports.data.datasets[0].label = app.label.static["ireland-percentage-gdp"];
    app.mip.config.economy.charts.importsAndExports.data.datasets[1].label = app.label.static["ireland-percentage-gni"];

    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-imports-exports',
        app.mip.config.economy.charts.importsAndExports
    );
}

//#endregion Imports and Exports of goods and services

//#endregion Charts