/*******************************************************************************
Custom JS application specific mip.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table
app.mip.environment = {};
app.mip.config = {};
app.mip.environment.ajax = {};
app.mip.environment.callback = {};

//#endregion Namespaces definitions

//#region Headline Figures

//#region New Vehicles

app.mip.environment.ajax.newVehiclesMetadata = function () {
    app.library.pxStat.getMetaData("TEA17", "app.mip.environment.callback.newVehiclesMetadata")
}

app.mip.environment.callback.newVehiclesMetadata = function (response) {
    app.mip.config.environment.headlineFigures.newVehicles.params.dimension["TLIST(A1)"].category.index = app.library.jsonStat.getTimeLast(response, 1);
    $("#mip-environment-content").find("[name=new-vehicles-year]").text(app.library.jsonStat.getTimeLast(response, 1)[0]);
    app.mip.environment.ajax.newVehicles();
}

app.mip.environment.ajax.newVehicles = function () {
    app.library.pxStat.getData(app.mip.config.environment.headlineFigures.newVehicles.params, "app.mip.environment.callback.newVehicles")
}

app.mip.environment.callback.newVehicles = function (response) {
    $("#mip-environment-content").find("[name=new-vehicles]").text(app.library.utility.formatNumber(response.value[0]));
    $("#mip-environment-content").find("[name=new-vehicles-table]").text(app.config.url.api.pxStat.application + response.extension.matrix).attr("href", app.config.url.api.pxStat.application + response.extension.matrix);
}

//#endregion New Vehicles

//#region Waste Generated

app.mip.environment.ajax.wasteGeneratedMetadata = function () {
    app.library.pxStat.getMetaData("MIP18", "app.mip.environment.callback.wasteGeneratedMetadata")
}

app.mip.environment.callback.wasteGeneratedMetadata = function (response) {
    app.mip.config.environment.headlineFigures.wasteGenerated.params.dimension["TLIST(A1)"].category.index = app.library.jsonStat.getTimeLast(response, 1);
    $("#mip-environment-content").find("[name=waste-generated-year]").text(app.library.jsonStat.getTimeLast(response, 1)[0]);
    app.mip.environment.ajax.wasteGenerated();
}

app.mip.environment.ajax.wasteGenerated = function () {
    app.library.pxStat.getData(app.mip.config.environment.headlineFigures.wasteGenerated.params, "app.mip.environment.callback.wasteGenerated")
}

app.mip.environment.callback.wasteGenerated = function (response) {
    $("#mip-environment-content").find("[name=waste-generated]").text(app.library.utility.formatNumber(response.value[0]));
    $("#mip-environment-content").find("[name=waste-generated-unit]").text(app.label.static["(kg-per-capita)"]);
    $("#mip-environment-content").find("[name=waste-generated-table]").text(app.config.url.api.pxStat.application + response.extension.matrix).attr("href", app.config.url.api.pxStat.application + response.extension.matrix);
}

//#endregion Waste Generated

//#region Total GHG Emissions

app.mip.environment.ajax.totalGhgEmissionsMetadata = function () {
    app.library.pxStat.getMetaData("EAA09", "app.mip.environment.callback.totalGhgEmissionsMetadata")
}

app.mip.environment.callback.totalGhgEmissionsMetadata = function (response) {
    app.mip.config.environment.headlineFigures.totalGhgEmissions.params.dimension["TLIST(A1)"].category.index = app.library.jsonStat.getTimeLast(response, 1);
    $("#mip-environment-content").find("[name=total-ghg-emissions-year]").text(app.library.jsonStat.getTimeLast(response, 1)[0]);
    app.mip.environment.ajax.totalGhgEmissions();
}

app.mip.environment.ajax.totalGhgEmissions = function () {
    app.library.pxStat.getData(app.mip.config.environment.headlineFigures.totalGhgEmissions.params, "app.mip.environment.callback.totalGhgEmissions")
}

app.mip.environment.callback.totalGhgEmissions = function (response) {
    $("#mip-environment-content").find("[name=total-ghg-emissions]").text(app.library.utility.formatNumber(response.value[0]));
    $("#mip-environment-content").find("[name=total-ghg-emissions-unit]").text(app.label.static["('000-tonnes-co2-eq.)"]);
    $("#mip-environment-content").find("[name=total-ghg-emissions-table]").text(app.config.url.api.pxStat.application + response.extension.matrix).attr("href", app.config.url.api.pxStat.application + response.extension.matrix);
}

//#endregion Total GHG Emissions

//#endregion Headline Figures

//#region Charts

//#region Energy Productivity

app.mip.environment.ajax.energyProductivityMetadata = function () {
    app.library.pxStat.getMetaData("MIP05", "app.mip.environment.callback.energyProductivityMetadata")
}

app.mip.environment.callback.energyProductivityMetadata = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    $(app.mip.config.environment.charts.energyProductivity.data.datasets).each(function (index, value) {
        value.api.query.data.params.dimension[app.library.jsonStat.getTimeDimensionCode(response)].category.index = lastPeriod;
    });
    $("#mip-environment-content").find("[name=energy-productivity-year]").text(lastPeriod);
    app.mip.config.environment.charts.energyProductivity.data.datasets[0].label = app.label.static["€-per-kg-of-oil-equivalent"];

    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-energy-productivity',
        app.mip.config.environment.charts.energyProductivity
    );
}

//#endregion Energy Productivity


//#region Municipal Waste

app.mip.environment.ajax.municipalWasteMetadata = function () {
    app.library.pxStat.getMetaData("MIP18", "app.mip.environment.callback.municipalWasteMetadata")
}

app.mip.environment.callback.municipalWasteMetadata = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    $(app.mip.config.environment.charts.municipalWaste.data.datasets).each(function (index, value) {
        value.api.query.data.params.dimension[app.library.jsonStat.getTimeDimensionCode(response)].category.index = lastPeriod;
    });
    $("#mip-environment-content").find("[name=municipal-waste-year]").text(lastPeriod);
    app.mip.config.environment.charts.municipalWaste.data.datasets[0].label = app.label.static["eu-27"];
    app.mip.config.environment.charts.municipalWaste.data.datasets[1].label = app.label.static["ireland"];

    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-municipal-waste',
        app.mip.config.environment.charts.municipalWaste
    );
}

//#endregion Municipal Waste

//#region Freight transport

app.mip.environment.ajax.modalSplitOfInlandFreightTransportMetadata = function () {
    app.library.pxStat.getMetaData("MIP17", "app.mip.environment.callback.modalSplitOfInlandFreightTransportMetadata")
}

app.mip.environment.callback.modalSplitOfInlandFreightTransportMetadata = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    $(app.mip.config.environment.charts.modalSplitOfInlandFreightTransport.data.datasets).each(function (index, value) {
        value.api.query.data.params.dimension[app.library.jsonStat.getTimeDimensionCode(response)].category.index = lastPeriod;
    });
    $("#mip-environment-content").find("[name=inland-freight-transport-year]").text(lastPeriod);
    app.mip.config.environment.charts.modalSplitOfInlandFreightTransport.data.datasets[0].label = app.label.static["inland-waterways"];
    app.mip.config.environment.charts.modalSplitOfInlandFreightTransport.data.datasets[1].label = app.label.static["railways"];
    app.mip.config.environment.charts.modalSplitOfInlandFreightTransport.data.datasets[2].label = app.label.static["roads"];

    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-inland-freight-transport',
        app.mip.config.environment.charts.modalSplitOfInlandFreightTransport
    );
}

//#endregion Freight transport

//#region Vehicles Licensed for the First Time

app.mip.environment.ajax.numberOfVehiclesLicensedMetadata = function () {
    app.library.pxStat.getMetaData("TEA17", "app.mip.environment.callback.numberOfVehiclesLicensedMetadata")
}

app.mip.environment.callback.numberOfVehiclesLicensedMetadata = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    $(app.mip.config.environment.charts.numberOfVehiclesLicensed.data.datasets).each(function (index, value) {
        value.api.query.data.params.dimension[app.library.jsonStat.getTimeDimensionCode(response)].category.index = lastPeriod;
    });
    $("#mip-environment-content").find("[name=vehicles-licensed-year]").text(lastPeriod);
    app.mip.config.environment.charts.numberOfVehiclesLicensed.data.datasets[0].label = app.label.static["petrol"];
    app.mip.config.environment.charts.numberOfVehiclesLicensed.data.datasets[1].label = app.label.static["diesel"];
    app.mip.config.environment.charts.numberOfVehiclesLicensed.data.datasets[2].label = app.label.static["petrol-electric-hybrid"];
    app.mip.config.environment.charts.numberOfVehiclesLicensed.data.datasets[3].label = app.label.static["electric"];

    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-vehicles-licensed',
        app.mip.config.environment.charts.numberOfVehiclesLicensed
    );
}

//#endregion Vehicles Licensed for the First Time

//#region Net Greenhouse Gas Emissions

app.mip.environment.ajax.netGreenhouseGasEmissionsMetadata = function () {
    app.library.pxStat.getMetaData("MIP19", "app.mip.environment.callback.netGreenhouseGasEmissionsMetadata")
}

app.mip.environment.callback.netGreenhouseGasEmissionsMetadata = function (response) {
    app.mip.config.environment.charts.netGreenhouseGasEmissions.metadata.xAxis[app.library.jsonStat.getTimeDimensionCode(response)] = app.library.jsonStat.getTimeLast(response, 11);
    app.mip.config.environment.charts.netGreenhouseGasEmissions.data.datasets[0].label = app.label.static["ireland"];
    app.mip.config.environment.charts.netGreenhouseGasEmissions.data.datasets[1].label = app.label.static["kyoto-index"];

    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-net-greenhouse-gas-emissions',
        app.mip.config.environment.charts.netGreenhouseGasEmissions
    );
}

//#endregion Net Greenhouse Gas Emissions

//#endregion Charts


