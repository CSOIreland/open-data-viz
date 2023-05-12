/*******************************************************************************
Application - Library 
*******************************************************************************/

// Init
var app = app || {};

app.library = {};
app.library.html = {};

app.library.pxStat = {};
app.library.pxStat.ajax = {};
app.library.pxStat.callback = {};

app.library.eurostat = {};
app.library.eurostat.ajax = {};
app.library.eurostat.callback = {};

app.library.utility = {};
app.library.datatable = {};
app.library.html = {};

app.library.jsonStat = {};

app.library.datatable = {};

app.library.history = {};

/**
 * Return randon number with optional prefix
 * @param  {} prefix
 */
app.library.utility.randomGenerator = function (prefix) {
    prefix = prefix || "";
    return prefix + Math.floor(Math.random() * 999999999) + 1;
};

/**
 * Download a dynamic resource
 */
app.library.utility.download = function (fileName, fileData, fileExtension, mimeType, isBase64) {
    mimeType = mimeType || null;
    isBase64 = isBase64 || false;

    if (isBase64) {
        // split by the ;base64, definition
        var dataStruct = fileData.split(';base64,');
        // Convert data Array/Byte
        fileData = atob(dataStruct[1]);
        // Convert data String/Array Byte
        fileData = fileData.s2ab();
        // remove the data: definition
        mimeType = dataStruct[0].substring(5);
    }

    var blob = new Blob([fileData], { type: mimeType });
    var downloadUrl = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = downloadUrl;
    a.download = fileName + '.' + fileExtension;
    if (document.createEvent) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/createEvent
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        a.dispatchEvent(event);
    }
    else {
        a.click();
    }
};

//#region Functions/Methods

/**
 * Parse the Static Labels into the HTML context
 */
app.library.html.parseStaticLabel = function (keyword) {
    keyword = keyword || null;

    if (keyword) {
        // If the Keyword exists in the Dictionary, then return it
        return app.label.static[keyword] ? app.label.static[keyword] : "[" + keyword + "]";
    }
    else {
        // Parse all Labels in the DOM
        $("[label]").each(function (index) {
            // Get the keyword from the attribute value
            var keyword = $(this).attr("label");

            // If the Keyword exists in the Dictionary, then set it
            $(this).html(app.label.static[keyword] ? app.label.static[keyword] : "[" + keyword + "]");

            // Remove the attribute to avoid double-parsing
            $(this).removeAttr("label");
        });

        // Parse all Label Tooltips in the DOM
        $("[label-tooltip]").each(function (index) {
            // Get the keyword from the attribute value
            var keyword = $(this).attr("label-tooltip");

            // If the Keyword exists in the Dictionary
            if (app.label.static[keyword]) {
                // If the data-original-title attribute exists
                $(this).attr("data-original-title", app.label.static[keyword]);
            } else {
                $(this).attr("data-original-title", keyword);
            }

            $(this).removeAttr();
        });
    }

};
/**
 * Parse the Static Labels into the HTML context
 */
app.library.html.parseDynamicLabel = function (keyword, params) {
    params = params || [];

    var label = app.label.dynamic[keyword];
    // If the Keyword exists in the Dictionary, then set it
    if (label) {
        return label.sprintf(params);
    } else
        return "";
};

app.library.html.fullScreen = function (selector) {
    //full screen
    selector.find("[name=heading]").find("[name=expand-screen]").once("click", function () {
        $("#header, #footer, #navigation, [name=expand-screen]").hide();
        $("[name=compress-screen]").show();
    });
    selector.find("[name=heading]").find("[name=compress-screen]").once("click", function () {
        $("#header, #footer, #navigation").show();
        $("[name=compress-screen]").hide();
        $("[name=expand-screen]").show();
    });

    selector.find("[name=heading]").find("[name=expand-screen]").attr("title", app.label.static["full-screen"]).attr("data-toggle", "tooltip").tooltip();
    selector.find("[name=heading]").find("[name=compress-screen]").attr("title", app.label.static["full-screen-exit"]).attr("data-toggle", "tooltip").tooltip();

};
//#endregion

//#region Format

/**
 * format any number
 * @param  {} number
 * @param  {} decimalSeparator
 * @param  {} thousandSeparator
  */
app.library.utility.formatNumber = function (number, decimalSeparator, thousandSeparator, precision) { //create global function  
    decimalSeparator = decimalSeparator || ".";
    thousandSeparator = thousandSeparator || ",";
    precision = precision !== undefined ? precision : undefined;

    if ("number" !== typeof number && "string" !== typeof number)
        return number;

    floatNumber = parseFloat(number);
    if (isNaN(floatNumber))
        //output any non number as html
        return "string" === typeof number ? number.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : number;

    if (precision !== undefined) {
        floatNumber = floatNumber.toFixed(precision);
    }
    else {
        floatNumber = floatNumber.toString();
    }

    var parts = floatNumber.split(".");
    var wholeNumber = parts[0].toString();
    var decimalNumber = parts[1] !== undefined ? parts[1].toString() : undefined;
    return (thousandSeparator ? wholeNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator) : wholeNumber) + (decimalNumber !== undefined ? decimalSeparator + decimalNumber : "");
};

/**
 * format DateTime
 * @param  {*} dateTimeValue
 */
app.library.utility.formatDatetime = function (dateTimeValue) {
    var dateTimeFormated = "";
    var dateTimeValue = dateTimeValue == undefined ? "" : dateTimeValue;
    if (moment(dateTimeValue).isValid()) {
        // do something because moment was valid
        dateTimeFormated = moment(dateTimeValue).format(app.config.mask.datetime.display);
    } else {
        //  do something else because it was invalid
        dateTimeFormated = "";
    }
    return dateTimeFormated;
};

app.library.utility.formatMonthCode = function () {
};



//#endregion format

//#region get JSON data

app.library.pxStat.getMetaData = function (matrix, callback, callbackParams, url) {

    // TODO: Temp change of api endpoint for COA

    /*   if (api.uri.getParam("body") == "entity/ima/coa") {
          app.config.url.api.pxStat.jsonrpc = "https://dev-ws.cso.ie/public/api.jsonrpc"
      }
      else {
          app.config.url.api.pxStat.jsonrpc = "https://ws.cso.ie/public/api.jsonrpc";
      } */

    url = url || app.config.url.api.pxStat.jsonrpc;
    callbackDetails = {
        "function": callback,
        "params": callbackParams || null
    };

    api.ajax.jsonrpc.request(
        url,
        "PxStat.Data.Cube_API.ReadMetadata",
        {
            "matrix": matrix,
            "format": {
                "type": C_APP_FORMAT_TYPE_DEFAULT,
                "version": C_APP_FORMAT_VERSION_DEFAULT
            },
            "language": C_APP_DEFAULT_LANGUAGE
        },
        "app.library.pxStat.callback.getJSON",
        callbackDetails,
        null,
        null,
        { async: false });
}

app.library.pxStat.getData = function (params, callback, callbackParams, url) {
    url = url || app.config.url.api.pxStat.jsonrpc;
    // TODO: Temp change of api endpoint for COA
    /*  if (api.uri.getParam("body") == "entity/ima/coa") {
         app.config.url.api.pxStat.jsonrpc = "https://dev-ws.cso.ie/public/api.jsonrpc"
     }
     else {
         app.config.url.api.pxStat.jsonrpc = "https://ws.cso.ie/public/api.jsonrpc";
     } */
    callbackDetails = {
        "function": callback,
        "params": callbackParams || null
    };

    api.ajax.jsonrpc.request(
        url,
        "PxStat.Data.Cube_API.ReadDataset",
        params,
        "app.library.pxStat.callback.getJSON",
        callbackDetails,
        null,
        null,
        { async: false }
    );
}

app.library.pxStat.callback.getJSON = function (result, callbackDetails) {
    var jsonStat = JSONstat(result);
    if (jsonStat.length) {
        api.ajax.callback(callbackDetails.function, jsonStat, callbackDetails.params)
    } else {
        api.modal.error("Data could not be loaded.");
    }
};


app.library.eurostat.ajax.getData = function (params, callback) {
    api.spinner.start();
    EuroJSONstat.fetchDataset(
        params
    ).then(ds => {
        if (ds.class === "error") {
            if (ds.status = "400") {
                api.ajax.callback(callback, null)
            }
            else {
                api.modal.error("Data could not be loaded."); dev - ws.cso.ie
            }
            api.spinner.stop();

        } else {
            app.library.eurostat.callback.getData(ds, callback);
            api.spinner.stop();
        }
    });
}

app.library.eurostat.callback.getData = function (response, callback) {
    var jsonStat = JSONstat(response);
    if (jsonStat.length) {
        api.ajax.callback(callback, jsonStat)
    } else {
        api.modal.error("Data could not be loaded.");
    }
}

app.library.pxStat.downloadData = function (params, callbackParams) {

    // TODO: Temp change of api endpoint for COA
    /*  if (api.uri.getParam("body") == "entity/ima/coa") {
         app.config.url.api.pxStat.jsonrpc = "https://dev-ws.cso.ie/public/api.jsonrpc"
     }
     else {
         app.config.url.api.pxStat.jsonrpc = "https://ws.cso.ie/public/api.jsonrpc";
     } */

    api.ajax.jsonrpc.request(
        app.config.url.api.pxStat.jsonrpc,
        "PxStat.Data.Cube_API.ReadDataset",
        params,
        "app.library.pxStat.callback.downloadData",
        callbackParams,
        null,
        null,
        { async: false }
    );
};

app.library.pxStat.callback.downloadData = function (response, callbackParams) {
    app.library.utility.download(callbackParams.fileName, response, callbackParams.fileExtension, callbackParams.mimeType, callbackParams.isBase64)
};
//#endregion

//#region jsonStat parse methods

app.library.jsonStat.getDimensionVariables = function (jsonStat, dimensionCode, removeElimination) {
    var dimension = [];
    removeElimination = removeElimination || false;
    var eliminationVariable = null;
    if (removeElimination) {
        eliminationVariable = jsonStat.extension.elimination[dimensionCode]
    };
    //get labels
    $.each(jsonStat.Dimension(dimensionCode).id, function (index, code) {
        if (code != eliminationVariable) {
            dimension.push({
                "code": code,
                "label": jsonStat.Dimension(dimensionCode).Category(code).label
            });
        }

    });
    return dimension;
};

app.library.jsonStat.getStatisticUnit = function (jsonStat, statisticCode) {
    if (jsonStat.Dimension({ role: "metric" })[0].Category(statisticCode)) {
        return jsonStat.Dimension({ role: "metric" })[0].Category(statisticCode).unit.label;
    }
    else return null;
};

app.library.jsonStat.getStatisticDecimal = function (jsonStat, statisticCode) {
    if (jsonStat.Dimension({ role: "metric" })[0].Category(statisticCode)) {
        return jsonStat.Dimension({ role: "metric" })[0].Category(statisticCode).unit.decimals;
    }
    else return null;
};

app.library.jsonStat.getGeoUrl = function (jsonStat, classificationCode) {
    if (jsonStat.Dimension(classificationCode) && jsonStat.Dimension(classificationCode).link) {
        return jsonStat.Dimension(classificationCode).link.enclosure[0].href;
    }
    else return null;
};

app.library.jsonStat.getTimeLast = function (jsonStat, numYears) {
    numYears = numYears || 1;
    if (jsonStat.Dimension({ role: "time" })[0]) {
        var time = jsonStat.Dimension({ role: "time" })[0].id;
        return time.slice(Math.max(time.length - numYears, 0))
    }
    else return null;
};

app.library.jsonStat.getTimeDimensionCode = function (jsonStat) {
    var timeDimensionCode = null;
    $.each(jsonStat.Dimension(), function (index, value) {
        if (value.role == "time") {
            timeDimensionCode = jsonStat.id[index];
            return;
        }
    });
    return timeDimensionCode;
};

app.library.jsonStat.getTimeFirst = function (jsonStat) {
    if (jsonStat.Dimension({ role: "time" })[0]) {
        var time = jsonStat.Dimension({ role: "time" })[0].id;
        return time.sort().shift();
    }
    else return null;
};

app.library.jsonStat.getVariableLabel = function (jsonStat, dimensionId, variableId) {
    return jsonStat.Dimension(dimensionId).Category(variableId).label
};

app.library.jsonStat.getDimessionCodesWithoutElimination = function (jsonStat, dimensionId, eliminationId) {
    eliminationId = eliminationId || null;
    var dimensionIds = jsonStat.Dimension(dimensionId).id;

    //remove elimination variable
    dimensionIds = jQuery.grep(dimensionIds, function (value) {
        return value != eliminationId;
    });

    return dimensionIds;
}

//#endregion

//#region DataTable

app.library.datatable.reDraw = function (selector, data) {
    if (data != null) {
        $(selector)
            .DataTable()
            .clear()
            .rows.add(data)
            .draw();
    } else {
        //if no data, just clear table and redraw with no rows
        $(selector)
            .DataTable()
            .clear()
            .draw();
    }
};

//#endregion

//#region browser history
app.library.history.setHistory = function (url) {

}
//#endregion

/** 
 * Simulate an async sleep. 
 * The parent outer function must be async
 * **/
app.library.utility.sleep = function (ms) {
    ms = ms || 400;
    return new Promise(resolve => setTimeout(resolve, ms));
}