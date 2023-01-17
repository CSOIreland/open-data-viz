$(document).ready(function () {
    //https://dev-visual.cso.ie/roched/branches/0.0.1/?body=entity/ima/cop/2016&pdf=true&noheader=true&nonavbar=true&nofooter=true&theme=1&boundarycode=C03849V04599&boundaryvalue=Administrative%20Areas%20-%202015&guid=2ae19629-14a3-13a3-e055-000000000001&guidvalue=CORK%20COUNTY%20COUNCIL
    $("#navigation").hide();
    app.ima.pdf.theme = api.uri.getParam("theme");
    app.ima.pdf.boundaryCode = api.uri.getParam("boundarycode");
    app.ima.pdf.guid = api.uri.getParam("guid");
    app.ima.pdf.areaName = api.uri.getParam("areaName");

    $("#visual-ima-pdf-header [name=title]").html(app.ima.config.title);

    if (app.ima.pdf.theme == "all") {
        app.ima.pdf.allIndicators = true;
        $.each(app.ima.config.themes, function (index, value) {
            app.ima.pdf.indicators.push(
                {
                    "title": value.title,
                    "config": null
                }
            )
            api.ajax.config(value.config, function (config) {
                app.ima.pdf.indicators[index].config = config
            }, { async: false });
            $("#visual-ima-pdf-header [name=theme]").remove();

            $("#visual-ima-pdf-indicators").addClass("all-data");
        });
    }
    else {
        app.ima.pdf.allIndicators = false;
        app.ima.pdf.indicators.push(
            {
                "title": app.ima.config.themes[app.ima.pdf.theme].title,
                "config": null
            }
        )
        api.ajax.config(app.ima.config.themes[app.ima.pdf.theme].config, function (config) {
            app.ima.pdf.indicators[0].config = config
        }, { async: false });
        $("#visual-ima-pdf-header [name=theme]").html(app.ima.pdf.indicators[0].title);
    };

    app.ima.pdf.renderIndicators();
});