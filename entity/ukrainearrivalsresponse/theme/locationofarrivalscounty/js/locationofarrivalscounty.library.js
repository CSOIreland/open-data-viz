/*******************************************************************************
Custom JS application specific ukrainearrivalsresponse.locationofarrivalscounty.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table

app.ukrainearrivalsresponse.locationofarrivalscounty = {};
app.ukrainearrivalsresponse.locationofarrivalscounty.config = {};
app.ukrainearrivalsresponse.locationofarrivalscounty.ajax = {};
app.ukrainearrivalsresponse.locationofarrivalscounty.callback = {};

//#endregion


//#region Draw Charts
app.ukrainearrivalsresponse.locationofarrivalscounty.drawCharts = function () {

    // Location of Arrivals Map
    pxWidget.draw.init(
        'map',
        "pxwidget9614404801",
        $.extend(true, {}, app.ukrainearrivalsresponse.locationofarrivalscounty.config.map.locationOfArrivals)
    );

    pxWidget.draw.init(
        'table',
        "pxwidget2191008621",
        $.extend(true, {}, app.ukrainearrivalsresponse.locationofarrivalscounty.config.table.locationOfArrivals)
    );
}

//#endregion