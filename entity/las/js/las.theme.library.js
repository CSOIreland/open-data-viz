/*******************************************************************************
Custom JS application specific ima.theme.library.js
*******************************************************************************/
//#region Namespaces definitions
app.las.theme = {};
//#endregion

app.las.theme.buildThemes = function () {
    if (!app.las.config.themes.length) {
        $("#visual-las-themes").remove();
        return
    }
    $.each(app.las.config.themes, function (index, value) {
        var theme = $("#visual-las-templates").find("[name=theme]").clone();
        theme.find("[name=theme-title]").text(value.title);
        theme.find("[name='theme-card'] a").attr("theme", index);
        theme.find("[name='theme-card']").attr("colour", value.colour);
        theme.find(".card").addClass("border-" + value.colour);
        theme.find("[name=icon-heading]").addClass("text-" + value.colour);
        theme.find("[name=icon-heading]").find("i").addClass(value.icon);
        $("#visual-las-themes").find("[name=themes]").append(theme);
    });
};

app.las.theme.renderTheme = function (theme) {
    $("#visual-las-theme-modal").find("[name=theme-title]").html(app.las.config.themes[theme].title);
    var indicators = [];
    api.ajax.config(app.las.config.themes[theme].config, function (config) {
        indicators = config;
    }, { async: false });

    $("#visual-las-theme-modal").find("[name=boundary]").html($("#visual-las-boundary-select").find("[name=boundaries]").find('option:selected').text());
    var requestedFeature = app.las.goTo.guid || app.las.featureRequested;
    var area = $.grep(app.las.allAreas, function (element, index) {
        return element.id == requestedFeature;
    });

    $("#visual-las-theme-modal").find("[name=single-area-name]").html(area[0].text);


    $("#visual-las-theme-modal").modal("show").on('hide.bs.modal', function (e) {
        $("#visual-las-theme-modal .modal-body").empty();
        history.replaceState({}, '', "?body=" + api.uri.getParam("body") + "&boundary=" + $("#visual-las-boundary-select").find("[name=boundaries]").val() + "&guid=" + requestedFeature);
        //Link for sharing
        $(".sharethis-sticky-share-buttons").attr("data-url", window.location.href);
    });

    history.replaceState({}, '', "?body=" + api.uri.getParam("body") + "&boundary=" + $("#visual-las-boundary-select").find("[name=boundaries]").val() + "&guid=" + requestedFeature + "&theme=" + theme);
    //Link for sharing
    $(".sharethis-sticky-share-buttons").attr("data-url", window.location.href);
    $.each(indicators, function (index, value) {
        var indicatorCard = $("#visual-las-templates").find("[name=theme-indicator-card]").clone();
        indicatorCard.attr("id", "theme-indicator-chart-card-" + theme + "-" + index);
        indicatorCard.find("[name=chart-tab]").attr("id", "theme-indicator-chart-tab-" + theme + "-" + index);
        indicatorCard.find("[name=chart-tab]").attr("href", "#theme-indicator-chart-content-" + theme + "-" + index).attr("aria-controls", "theme-indicator-chart-content-" + theme + "-" + index);
        indicatorCard.find("[name=chart-content]").attr("id", "theme-indicator-chart-content-" + theme + "-" + index);
        indicatorCard.find("[name=chart-content]").attr("aria-labelledby", "theme-indicator-chart-tab-" + theme + "-" + index);


        indicatorCard.find("[name=time-series-tab]").attr("id", "theme-indicator-time-series-tab-" + theme + "-" + index);
        indicatorCard.find("[name=time-series-tab]").attr("href", "#theme-indicator-time-series-content-" + theme + "-" + index).attr("aria-controls", "theme-indicator-time-series-content-" + theme + "-" + index);
        indicatorCard.find("[name=time-series-content]").attr("id", "theme-indicator-time-series-content-" + theme + "-" + index);
        indicatorCard.find("[name=time-series-content]").attr("aria-labelledby", "theme-indicator-time-series-tab-" + theme + "-" + index);

        indicatorCard.find("[name=table-tab]").attr("id", "theme-indicator-table-tab-" + theme + "-" + index);
        indicatorCard.find("[name=table-tab]").attr("href", "#theme-indicator-table-content-" + theme + "-" + index).attr("aria-controls", "theme-indicator-table-content-" + theme + "-" + index);
        indicatorCard.find("[name=table-content]").attr("id", "theme-indicator-table-content-" + theme + "-" + index);
        indicatorCard.find("[name=table-content]").attr("aria-labelledby", "theme-indicator-table-tab-" + theme + "-" + index);

        indicatorCard.find(".accordion").attr("id", "theme-indicator-accordion-" + theme + "-" + index);
        indicatorCard.find(".accordion .collapse[name=accordion-collapse]").attr("data-parent", "#theme-indicator-accordion-" + theme + "-" + index);

        indicatorCard.find("[name=snippet-chart-collapse]").find("button").attr("data-target", "#theme-indicator-chart-widget-collapse-" + theme + "-" + index).attr("aria-controls", "theme-indicator-chart-widget-collapse-" + theme + "-" + index);
        indicatorCard.find("[name=snippet-chart-collapse]").find(".collapse").attr("id", "theme-indicator-chart-widget-collapse-" + theme + "-" + index);

        indicatorCard.find("[name=snippet-table-collapse]").find("button").attr("data-target", "#theme-indicator-table-widget-collapse-" + theme + "-" + index).attr("aria-controls", "theme-indicator-table-widget-collapse-" + theme + "-" + index);
        indicatorCard.find("[name=snippet-table-collapse]").find(".collapse").attr("id", "theme-indicator-table-widget-collapse-" + theme + "-" + index);

        indicatorCard.find("[name=snippet-chart-collapse]").find("[name=chart-embed-code]").attr("id", "theme-indicator-accordion-chart-embed-code-" + theme + "-" + index);
        indicatorCard.find("[name=snippet-time-series-collapse]").find("[name=time-series-embed-code]").attr("id", "theme-indicator-accordion-time-series-embed-code-" + theme + "-" + index);
        indicatorCard.find("[name=snippet-table-collapse]").find("[name=table-embed-code]").attr("id", "theme-indicator-accordion-table-embed-code-" + theme + "-" + index);
        indicatorCard.find("[name=snippet-chart-collapse]").find("[name=copy-chart-snippet-button]").attr("id", "theme-indicator-accordion-chart-embed-button-" + theme + "-" + index).attr("data-clipboard-target", "#theme-indicator-accordion-chart-embed-code-" + theme + "-" + index);
        indicatorCard.find("[name=snippet-time-series-collapse]").find("[name=copy-time-series-snippet-button]").attr("id", "theme-indicator-accordion-time-series-embed-button-" + theme + "-" + index).attr("data-clipboard-target", "#theme-indicator-accordion-time-series-embed-code-" + theme + "-" + index);
        indicatorCard.find("[name=snippet-table-collapse]").find("[name=copy-table-snippet-button]").attr("id", "theme-indicator-accordion-table-embed-button-" + theme + "-" + index).attr("data-clipboard-target", "#theme-indicator-accordion-table-embed-code-" + theme + "-" + index);
        indicatorCard.find("[name=snippet-chart-collapse]").find("[name=download-chart-snippet-button]").attr("id", "theme-indicator-accordion-chart-download-button-" + theme + "-" + index);
        indicatorCard.find("[name=snippet-time-series-collapse]").find("[name=download-time-series-snippet-button]").attr("id", "theme-indicator-accordion-time-series-download-button-" + theme + "-" + index);

        indicatorCard.find("[name=snippet-table-collapse]").find("[name=download-table-snippet-button]").attr("id", "theme-indicator-accordion-table-download-button-" + theme + "-" + index);

        if (app.las.timeSeries && value.timeSeries) {
            indicatorCard.find("[name=time-series-collapse]").append(
                $("<div>", {
                    "id": "sapmap-pxwidget-time-series-indicator-" + theme + "-" + index,
                    "class": "pxwidget"
                })
            );
        }
        else {
            indicatorCard.find("[name=time-series-tab]").attr("id", "theme-indicator-time-series-tab-" + theme + "-" + index).remove();
        }

        indicatorCard.find("[name=chart-collapse]").append(
            $("<div>", {
                "id": "sapmap-pxwidget-chart-indicator-" + theme + "-" + index,
                "class": "pxwidget"
            })
        );



        indicatorCard.find("[name=table-collapse]").append(
            $("<div>", {
                "id": "sapmap-pxwidget-table-indicator-" + theme + "-" + index,
                "class": "pxwidget"
            })
        );

        indicatorCard.find("[name=indicator-title]").html(value.title);
        $("#visual-las-theme-modal .modal-body").append(indicatorCard);

        $('#' + "theme-indicator-accordion-" + theme + "-" + index).on('hidden.bs.collapse', function (e) {
            var heading = $("#" + e.target.id).attr("heading");
            if (heading) {
                $(heading).find("[name=accordion-icon]").removeClass().addClass("fas fa-sm fa-plus-circle");
            };
        });

        $('#' + "theme-indicator-accordion-" + theme + "-" + index).on('shown.bs.collapse', function (e) {
            var heading = $("#" + e.target.id).attr("heading");
            if (heading) {
                $(heading).find("[name=accordion-icon]").removeClass().addClass("fas fa-sm fa-minus-circle");
                $('#visual-las-theme-modal').animate({
                    scrollTop: '+=' + $(heading)[0].getBoundingClientRect().top
                },
                    1000);
            };
        });


        var indicatorTable = value.boundaries[$("#visual-las-boundary-select").find("[name=boundaries]").val()].matrix;
        if (indicatorTable) {
            var chartConfig = $.extend(true, {}, value.chart);
            chartConfig.metadata.api.query.data.params.matrix = indicatorTable;
            chartConfig.link = value.chart.link + indicatorTable;
            var classificationCode = $("#visual-las-boundary-select").find("[name=boundaries]").val();
            $.each(chartConfig.data.datasets, function (indexDataset, valueDataset) {
                valueDataset.api.query.data.params.id.push(classificationCode);
                valueDataset.api.query.data.params.dimension[classificationCode] = {
                    "category": {
                        "index": [
                            app.las.featureRequested || api.uri.getParam("guid")
                        ]
                    }
                };
                valueDataset.api.query.data.params.extension.matrix = indicatorTable;

            });
            debugger
            pxWidget.draw.init(
                'chart',
                "sapmap-pxwidget-chart-indicator-" + theme + "-" + index,
                chartConfig
            );
            var snippetChart = app.las.snippetCode;
            snippetChart = snippetChart.sprintf([C_APP_URL_PXWIDGET_ISOGRAM_2_4_6, "chart", app.library.utility.randomGenerator('pxwidget'), JSON.stringify(chartConfig)]);
            $("#theme-indicator-accordion-chart-embed-code-" + theme + "-" + index).text(snippetChart.trim());

            $("#theme-indicator-accordion-chart-download-button-" + theme + "-" + index).once("click", function () {
                // Download the snippet file
                app.library.utility.download(value.title.replace(/ /g, "_").toLowerCase() + "_" + area[0].text.replace(/ /g, "_").toLowerCase() + '.' + moment(Date.now()).format(app.config.mask.datetime.file), $("#theme-indicator-accordion-chart-embed-code-" + theme + "-" + index).text(), "html", "text/html");
            });

            new ClipboardJS("#theme-indicator-accordion-chart-embed-button-" + theme + "-" + index);

            var tableConfig = $.extend(true, {}, value.table);
            tableConfig.link = value.chart.link + indicatorTable;
            tableConfig.data.api.query.data.params.id.push(classificationCode);
            tableConfig.data.api.query.data.params.dimension[classificationCode] = {
                "category": {
                    "index": [
                        app.las.featureRequested || api.uri.getParam("guid")
                    ]
                }
            };
            tableConfig.data.api.query.data.params.extension.matrix = indicatorTable;
            if (tableConfig.metadata.api.query.data) {
                tableConfig.metadata.api.query.data.params.matrix = indicatorTable;
            }

            tableConfig.hideColumns.push($("#visual-las-boundary-select").find("[name=boundaries]").val());

            //if we have to manually hide columns because we only have one row in the table, we then need to dynamically add the region code to our array
            /*  if (tableConfig.hiddenDimensions && tableConfig.hiddenDimensions.length) {
                 tableConfig.hiddenDimensions.push(classificationCode)
             }; */
            debugger
            pxWidget.draw.init(
                'table',
                "sapmap-pxwidget-table-indicator-" + theme + "-" + index,
                tableConfig
            );
            //Download click event

            $("#theme-indicator-table-content-" + theme + "-" + index).find("[name=download-dataset-format]").once("click", function (e) {
                e.preventDefault();
                var downloadConfig = $.extend(true, {}, tableConfig);
                downloadConfig.data.api.query.data.params.extension.format.type = $(this).attr("frm-type");
                downloadConfig.data.api.query.data.params.extension.format.version = $(this).attr("frm-version");
                var fileExtension = null;
                var mimeType = null;
                var isBase64 = null;

                switch ($(this).attr("frm-type")) {
                    case "CSV":
                        fileExtension = "csv";
                        mimeType = "text/csv";
                        isBase64 = false;
                        break;
                    case "XLSX":
                        fileExtension = "xlsx";
                        mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                        isBase64 = true;
                        break;

                }

                app.library.pxStat.downloadData(downloadConfig.data.api.query.data.params, {
                    "format": $(this).attr("frm-type"),
                    "fileName": value.title.replace(/ /g, "_").toLowerCase() + "_" + area[0].text.replace(/ /g, "_").toLowerCase(),
                    "fileExtension": fileExtension,
                    "mimeType": mimeType,
                    "isBase64": isBase64
                })
            });

            var snippetTable = app.las.snippetCode;
            snippetTable = snippetTable.sprintf([C_APP_URL_PXWIDGET_ISOGRAM_2_4_6, "table", app.library.utility.randomGenerator('pxwidget'), JSON.stringify(tableConfig)]);
            $("#theme-indicator-accordion-table-embed-code-" + theme + "-" + index).text(snippetTable.trim());

            $("#theme-indicator-accordion-table-download-button-" + theme + "-" + index).once("click", function () {
                // Download the data
                app.library.utility.download(value.title.replace(/ /g, "_").toLowerCase() + "_" + area[0].text.replace(/ /g, "_").toLowerCase() + '.' + moment(Date.now()).format(app.config.mask.datetime.file), $("#theme-indicator-accordion-table-embed-code-" + theme + "-" + index).text(), "html", "text/html");
            });

            new ClipboardJS("#theme-indicator-accordion-table-embed-button-" + theme + "-" + index);
            Prism.highlightAll();
        }
        else {
            //indicator not available for this geography
            //  $("#theme-indicator-chart-card-" + theme + "-" + index).find(".card-body").html("Not available for this region")
        }

    });
};

app.las.theme.selectAllThemes = function () {
    $("#visual-las-all-themes-modal").find("[name=theme-title]").html("All Data");
    //api.content.load('#visual-las-all-themes-modal .modal-body', app.las.config.allThemes.path);
    var area = $.grep(app.las.allAreas, function (element, index) {
        return element.id == (app.las.featureRequested || api.uri.getParam("guid"));
    });
    $.each(app.las.config.themes, function (index, value) {
        api.ajax.config(value.config, function (config) {
            app.las.theme.renderAllData(value.title, config, index, area[0].text);
        }, { async: false });
    });

    $("#visual-las-all-themes-modal").find("[name=boundary]").html($("#visual-las-boundary-select").find("[name=boundaries]").find('option:selected').text());

    $("#visual-las-all-themes-modal").find("[name=single-area-name]").html(area[0].text);
    $("#visual-las-all-themes-modal").modal("show").on('hide.bs.modal', function (e) {
        $("#visual-las-all-themes-modal .modal-body").empty();
        history.replaceState({}, '', "?body=" + api.uri.getParam("body") + "&boundary=" + $("#visual-las-boundary-select").find("[name=boundaries]").val() + "&guid=" + (app.las.featureRequested || api.uri.getParam("guid")));
    });

    history.replaceState({}, '', "?body=" + api.uri.getParam("body") + "&boundary=" + $("#visual-las-boundary-select").find("[name=boundaries]").val() + "&guid=" + (app.las.featureRequested || api.uri.getParam("guid")) + "&theme=all");
    //Link for sharing
    $(".sharethis-sticky-share-buttons").attr("data-url", window.location.href);
};

app.las.theme.renderAllData = function (title, indicators, index, area) {
    var themeWrapper = $("#visual-las-templates").find("[name=all-themes-theme-wrapper]").clone();
    themeWrapper.find("[name=theme-title]").html(title);
    themeWrapper.attr("theme", "theme-" + index)
    $("#visual-las-all-themes-modal").find(".modal-body").append(themeWrapper);

    var classificationCode = $("#visual-las-boundary-select").find("[name=boundaries]").val();

    $.each(indicators, function (indexIndicator, value) {
        var indicatorCard = $("#visual-las-templates").find("[name=all-themes-theme-indicator]").clone();
        indicatorCard.attr("id", "visual-las-all-data-indicator-" + index + "-" + indexIndicator);
        indicatorCard.find(".card-header").html(value.title)
        indicatorCard.find(".card-body [name=table-wrapper]").append($("<div>", {
            "id": "sapmap-pxwidget-allthemes-table-indicator-" + index + "-" + indexIndicator,
            "class": "pxwidget"
        }));
        $("#visual-las-all-themes-modal").find("[name=all-themes-theme-wrapper][theme=theme-" + index + "]").append(indicatorCard)
        var tableConfig = $.extend(true, {}, value.table);
        var indicatorTable = value.boundaries[$("#visual-las-boundary-select").find("[name=boundaries]").val()].matrix;
        if (indicatorTable) {
            tableConfig.link = value.chart.link + indicatorTable;
            tableConfig.data.api.query.data.params.id.push(classificationCode);
            tableConfig.data.api.query.data.params.dimension[classificationCode] = {
                "category": {
                    "index": [
                        app.las.featureRequested || api.uri.getParam("guid")
                    ]
                }
            };
            tableConfig.data.api.query.data.params.extension.matrix = indicatorTable;

            pxWidget.draw.init(
                'table',
                "sapmap-pxwidget-allthemes-table-indicator-" + index + "-" + indexIndicator,
                tableConfig
            );

            //Download click event

            $("#visual-las-all-data-indicator-" + index + "-" + indexIndicator).find("[name=download-dataset-format]").once("click", function (e) {
                e.preventDefault();
                var downloadConfig = $.extend(true, {}, tableConfig);
                downloadConfig.data.api.query.data.params.extension.format.type = $(this).attr("frm-type");
                downloadConfig.data.api.query.data.params.extension.format.version = $(this).attr("frm-version");
                var fileExtension = null;
                var mimeType = null;
                var isBase64 = null;

                switch ($(this).attr("frm-type")) {
                    case "CSV":
                        fileExtension = "csv";
                        mimeType = "text/csv";
                        isBase64 = false;
                        break;
                    case "XLSX":
                        fileExtension = "xlsx";
                        mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                        isBase64 = true;
                        break;

                }

                app.library.pxStat.downloadData(downloadConfig.data.api.query.data.params, {
                    "format": $(this).attr("frm-type"),
                    "fileName": value.title.replace(/ /g, "_").toLowerCase() + "_" + area.replace(/ /g, "_").toLowerCase(),
                    "fileExtension": fileExtension,
                    "mimeType": mimeType,
                    "isBase64": isBase64
                })
            });
        }
        else {
            // $("#visual-las-all-data-indicator-" + index + "-" + indexIndicator).find(".card-body").html("Not available for this region");
        }

    });
};