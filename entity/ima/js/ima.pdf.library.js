/*******************************************************************************
Custom JS application specific ima.pdf.library.js
*******************************************************************************/
//#region Namespaces definitions
app.ima.pdf = {};
app.ima.pdf.ajax = {};
app.ima.pdf.callback = {};
app.ima.pdf.theme = null;
app.ima.pdf.boundaryCode = null;
app.ima.pdf.region = null;
app.ima.pdf.guid = null;
app.ima.pdf.areaName = null;
app.ima.pdf.indicators = [];
app.ima.pdf.allIndicators = false;

//#endregion

app.ima.pdf.renderIndicators = function () {
    $("#visual-ima-pdf-header").find("[name=region]").text(app.ima.pdf.areaName);

    $.each(app.ima.pdf.indicators, function (index, value) {
        if (app.ima.pdf.allIndicators) {
            $("#visual-ima-pdf-indicators [name='indicator']").append(
                $("<h2>", {
                    "text": "Theme: " + value.title,
                    "name": index != 0 ? "theme-break" : "",
                    "class": "mb-4"
                })
            );
        }

        $.each(value.config, function (indexConfig, valueConfig) {

            $("#visual-ima-pdf-indicators [name='indicator']").append(
                $("<div>", {
                    "name": "indicator-wrapper-" + index + "-" + indexConfig,
                    "class": "pdf-indicator-wrapper"
                })
            );

            $("#visual-ima-pdf-indicators [name=indicator-wrapper-" + index + "-" + indexConfig + "]").append(
                $("<h5>", {
                    "class": "mb-4 text-center",
                    "text": valueConfig.title,
                    "style": "margin-top: 40px"
                })
            );

            var indicatorTable = valueConfig.boundaries[app.ima.pdf.boundaryCode].matrix;

            //chart
            if (!app.ima.pdf.allIndicators) {
                //chart
                $("#visual-ima-pdf-indicators [name=indicator-wrapper-" + index + "-" + indexConfig + "]").append(
                    $("<div>", {
                        "id": "visual-ima-pdf-indicator-chart-" + index + "-" + indexConfig,
                        "class": "pxwidget"
                    })
                );

                var chartConfig = $.extend(true, {}, valueConfig.chart);
                chartConfig.metadata.api.query.data.params.matrix = indicatorTable;
                chartConfig.link = valueConfig.chart.link + indicatorTable;
                $.each(chartConfig.data.datasets, function (indexDataset, valueDataset) {
                    valueDataset.api.query.data.params.id.push(app.ima.pdf.boundaryCode);
                    valueDataset.api.query.data.params.dimension[app.ima.pdf.boundaryCode] = {
                        "category": {
                            "index": [
                                app.ima.pdf.guid
                            ]
                        }
                    };
                    valueDataset.api.query.data.params.extension.matrix = indicatorTable;

                });

                pxWidget.draw.init(
                    'chart',
                    "visual-ima-pdf-indicator-chart-" + index + "-" + indexConfig,
                    chartConfig
                );
            };

            //table
            $("#visual-ima-pdf-indicators [name=indicator-wrapper-" + index + "-" + indexConfig + "]").append(
                $("<div>", {
                    "id": "visual-ima-pdf-indicator-table-" + index + "-" + indexConfig,
                    "class": "pxwidget"
                })
            );

            var tableConfig = $.extend(true, {}, valueConfig.table);
            //remove paging for printing view
            tableConfig.options.paging = false;
            tableConfig.options.dom = "ltp";
            tableConfig.link = valueConfig.chart.link + indicatorTable;
            tableConfig.data.api.query.data.params.id.push(app.ima.pdf.boundaryCode);
            tableConfig.data.api.query.data.params.dimension[app.ima.pdf.boundaryCode] = {
                "category": {
                    "index": [
                        app.ima.pdf.guid
                    ]
                }
            };
            tableConfig.data.api.query.data.params.extension.matrix = indicatorTable;
            //if we have to manually hide columns because we only have one row in the table, we then need to dynamically add the region code to our array
            if (tableConfig.hiddenDimensions && tableConfig.hiddenDimensions.length) {
                tableConfig.hiddenDimensions.push(app.ima.pdf.boundaryCode)
            };

            pxWidget.draw.init(
                'table',
                "visual-ima-pdf-indicator-table-" + index + "-" + indexConfig,
                tableConfig
            );
        });
    });
};
