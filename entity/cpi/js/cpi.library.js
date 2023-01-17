//#region namespace
app.cpi = {};
app.cpi.ajax = {};
app.cpi.callback = {};
app.cpi.metadata = {};
app.cpi.metadata.cpm12 = null;
app.cpi.metadata.cpm11 = null;
app.cpi.compareResponse = null;


//#endregion

app.cpi.heading = function () {
    var heading = $("#template").find("[name=entity-heading]").clone();
    heading.find("[name=heading-text]").append(app.label.entity.cpi["title"]);
    heading.find("[name=sub-heading-text]").append(app.label.entity.cpi["explanation"]);
    $('meta[name=description]').attr('description', app.label.entity.cpi["metaDescription"]);
    $("#visual-cpi").find("[name=heading]").append(heading);
    app.library.html.fullScreen($("#visual-cpi"));

};

app.cpi.ajax.getMetadata = function () {
    app.library.pxStat.getMetaData("CPM12", "app.cpi.callback.getMetadataCPM12");
    app.library.pxStat.getMetaData("CPM11", "app.cpi.callback.getMetadataCPM11");
};

app.cpi.callback.getMetadataCPM12 = function (response) {

    app.cpi.metadata.cpm12 = response;
    app.cpi.getConsumerItem();
};

app.cpi.callback.getMetadataCPM11 = function (response) {

    app.cpi.metadata.cpm11 = response;
    app.cpi.callback.drawContributionsChart();
};

app.cpi.getConsumerItem = function () {
    var consumerItemDimension = app.library.jsonStat.getDimensionVariables(app.cpi.metadata.cpm12, "C02363V03422", false);
    var consumerItem = [];
    $.each(consumerItemDimension, function (index, value) {
        consumerItem.push({
            "id": value.code,
            "text": value.label
        }
        );
    });

    $("#visual-cpi-select-average-prices").find("[name=consumer-item]").empty().append($("<option>")).select2({
        minimumInputLength: 0,
        allowClear: true,
        width: '100%',
        placeholder: "Consumer Item",
        data: consumerItem
    }).on('select2:select', function (e) {
        app.cpi.callback.drawAveragePricesChart($(this).val());
        $("#visual-cpi-select-average-prices").modal("hide");

    }).on('select2:clear', function (e) {
        //do something here when they clear select
    }).attr("disabled", false);

    //preselect bread
    $("#visual-cpi").find("[name=consumer-item][data-item=10040]").trigger("click");
};




app.cpi.callback.drawAveragePricesChart = function (item) {
    var selectedItem = $.grep(app.library.jsonStat.getDimensionVariables(app.cpi.metadata.cpm12, "C02363V03422", false), function (element, index) {
        return element.code == item;
    })[0];

    app.cpi.config.averagePrices.chart.data.datasets[0].api.query.data.params.dimension.C02363V03422.category.index = [selectedItem.code];
    app.cpi.config.averagePrices.chart.data.datasets[0].label = selectedItem.label;


    pxWidget.draw.init(
        "chart",
        "pxwidget1268251411",
        $.extend(true, {}, app.cpi.config.averagePrices.chart)
    );
};

app.cpi.callback.drawContributionsChart = function () {
    //Get latest month label for title
    app.cpi.config.contribution.chart.options.title.text = [app.library.jsonStat.getVariableLabel(app.cpi.metadata.cpm11, "TLIST(M1)", app.library.jsonStat.getTimeLast(app.cpi.metadata.cpm11))]


    pxWidget.draw.init(
        "chart",
        "pxwidget4566325631",
        $.extend(true, {}, app.cpi.config.contribution.chart)
    );
};

app.cpi.callback.drawContributionsTable = function () {
    pxWidget.draw.init(
        "table",
        "pxwidget2137310061",
        $.extend(true, {}, app.cpi.config.contribution.table)
    );
};


app.cpi.ajax.getEurostatData = function () {
    api.ajax.static("https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/prc_hicp_manr?precision=1&lastTimePeriod=49&unit=RCH_A&coicop=CP00", app.cpi.callback.getEurostatData)
};

app.cpi.callback.getEurostatData = function (response) {
    app.cpi.compareResponse = JSONstat(response);
    var countriesDimension = app.library.jsonStat.getDimensionVariables(app.cpi.compareResponse, "geo", false);

    var countries = [];
    $.each(countriesDimension, function (index, value) {
        countries.push({
            "id": value.code,
            "text": value.label
        }
        );
    });

    $("#visual-cpi-select-compare").find("[name=country]").empty().append($("<option>")).select2({
        minimumInputLength: 0,
        allowClear: true,
        width: '100%',
        placeholder: "Country/Region",
        data: countries
    }).on('select2:select', function (e) {
        app.cpi.callback.drawComapreChart($(this).val());
        $("#visual-cpi-select-compare").modal("hide");

    }).on('select2:clear', function (e) {
        //do something here when they clear select
    }).attr("disabled", false);

    //preselect Eurozone
    $("#visual-cpi").find("[name=compare-country][data-compare=EA]").trigger("click");
};


app.cpi.callback.drawComapreChart = function (region) {
    var selectedRegion = $.grep(app.library.jsonStat.getDimensionVariables(app.cpi.compareResponse, "geo", false), function (element, index) {
        return element.code == region;
    })[0];

    var months = app.library.jsonStat.getDimensionVariables(app.cpi.compareResponse, "time", false);

    $("#visual-cpi-compare-canvas-wrapper").empty();
    $("#visual-cpi-compare-canvas-wrapper").append(
        $("<canvas>", {
            "name": "chart-canvas",
            "style": "width: 100%; height: 600px"
        })
    );

    var localConfig = {
        "type": 'line',
        "data": {
            "datasets": [],
            "labels": []
        },
        "plugins": [

            {
                beforeInit: function (chart, options) {
                    chart.legend.afterFit = function () {
                        this.height = this.height + 15;
                    };
                }
            },
            {
                "beforeDraw": function (chart) {
                    var ctx = chart.ctx;
                    ctx.restore();
                    // Override backgroud color to white for exporting image
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, chart.canvas.width, chart.canvas.height);
                    // Set date
                    if (app.cpi.compareResponse.updated) {
                        ctx.textBaseline = "bottom";
                        ctx.fillStyle = "#666";
                        ctx.font = "14px Arial";
                        ctx.fillText(moment(app.cpi.compareResponse.updated, 'YYYY-MM-DD').format('MMMM DD, YYYY'), 0, chart.canvas.clientHeight);
                        // ctx.fillText(moment(app.cpi.compareResponse.updated, 'YYYY-MM-DD').format('MMMM DD, YYYY'), 0, 0);
                    }
                    ctx.save();
                }
            }],
        "options": {
            "title": {
                "display": true,
                "text": ["Harmonised index of consumer prices (HICP) - annual rate of change"]
            },
            "tooltips": {
                "mode": "index",
                "callbacks": {
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label + " - " + data.labels[tooltipItem.index];
                        label += ': ';
                        var value = app.library.utility.formatNumber(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
                        label += value;
                        return label;
                    }
                }
            },
            "plugins": {
                "colorschemes": {
                    "scheme": app.config.plugin.chartJs.chart.colours.length ? app.config.plugin.chartJs.chart.colours : "tableau.Tableau10"
                }
            }
        }
    };

    var ie = {
        label: "Ireland",
        data: [],
        fill: false
    };
    var compare = {
        label: selectedRegion.label,
        data: [],
        fill: false
    };

    $.each(months, function (index, value) {
        ie.data.push(
            app.cpi.compareResponse.Data(
                {
                    "coicop": "CP00",
                    "geo": "IE",
                    "time": value.code,
                    "unit": "RCH_A"

                }).value
        );

        compare.data.push(
            app.cpi.compareResponse.Data(
                {
                    "coicop": "CP00",
                    "geo": selectedRegion.code,
                    "time": value.code,
                    "unit": "RCH_A"

                }).value
        );
        localConfig.data.labels.push(value.label);
    });

    localConfig.data.datasets = [compare, ie];
    var config = $.extend(true, {}, app.config.plugin.chartJs.chart, localConfig);
    var chart = new Chart($("#visual-cpi-compare-canvas-wrapper").find("[name=chart-canvas]"), config);

    var footerElements = [];
    if (app.cpi.compareResponse.source) {
        footerElements.push('&copy; ' + app.cpi.compareResponse.source);
    }

    if (app.cpi.compareResponse.href) {
        footerElements.push($('<a>', {
            "text": "View Source Data",
            "href": "https://ec.europa.eu/eurostat/databrowser/view/prc_hicp_manr/default/table?lang=en",
            "target": "_blank"
        }).get(0).outerHTML);
    }

    if (footerElements.length) {
        // Combine footers in p tag
        var footer = $('<p>', {
            "html": footerElements.join("<br>")
        }).css({ "text-align": "right" });
        // Append footer
        $("#visual-cpi-compare-footer-wrapper").html(footer);
    }
};
////#endregion


app.cpi.ajax.drawCpiTimelineChart = function () {
    pxWidget.draw.init(
        "chart",
        "pxwidget3072598731",
        $.extend(true, {}, app.cpi.config.cpiTimeline.chart)
    );
};

app.cpi.ajax.drawCpiTimelineTable = function () {
    pxWidget.draw.init(
        "table",
        "pxwidget9676677471",
        $.extend(true, {}, app.cpi.config.cpiTimeline.table)
    );
};


app.cpi.ajax.drawHicpTimelineChart = function () {
    pxWidget.draw.init(
        "chart",
        "pxwidget4631574951",
        $.extend(true, {}, app.cpi.config.hicpTimeline.chart)
    );
};

app.cpi.ajax.drawHicpTimelineTable = function () {
    pxWidget.draw.init(
        "table",
        "pxwidget4467146021",
        $.extend(true, {}, app.cpi.config.hicpTimeline.table)
    );
};