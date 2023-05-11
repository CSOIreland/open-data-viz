/*******************************************************************************
Custom JS application specific mip.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table
app.mip.education = {};
app.mip.config = {};
app.mip.education.ajax = {};
app.mip.education.callback = {};
//#endregion

//#region Headline Figures

//#region Primary Students
app.mip.education.ajax.primaryStudentsIrelandMetadata = function () {
    app.library.pxStat.getMetaData("EDA42", "app.mip.education.callback.primaryStudentsIrelandMetadata")
}

app.mip.education.callback.primaryStudentsIrelandMetadata = function (response) {
    app.mip.config.education.headlineFigures.primaryStudentsIreland.params.dimension["TLIST(A1)"].category.index = app.library.jsonStat.getTimeLast(response, 1);
    $("#mip-education-content").find("[name=primary-students-ireland-year]").text(app.library.jsonStat.getTimeLast(response, 1)[0]);
    app.mip.education.ajax.primaryStudentsIrelandData();
}

app.mip.education.ajax.primaryStudentsIrelandData = function () {
    app.library.pxStat.getData(app.mip.config.education.headlineFigures.primaryStudentsIreland.params, "app.mip.education.callback.primaryStudentsIrelandData")
}

app.mip.education.callback.primaryStudentsIrelandData = function (response) {
    $("#mip-education-content").find("[name=primary-students-ireland]").text(app.library.utility.formatNumber(response.value[0]));
    $("#mip-education-content").find("[name=primary-students-ireland-table]").text(app.config.url.api.pxStat.application + response.extension.matrix).attr("href", app.config.url.api.pxStat.application + response.extension.matrix);
}
//#endregion Primary Students

//#region Secondary Students
app.mip.education.ajax.secondaryStudentsIrelandMetadata = function () {
    app.library.pxStat.getMetaData("EDA70", "app.mip.education.callback.secondaryStudentsIrelandMetadata")
}

app.mip.education.callback.secondaryStudentsIrelandMetadata = function (response) {
    app.mip.config.education.headlineFigures.secondaryStudentsIreland.params.dimension["TLIST(A1)"].category.index = app.library.jsonStat.getTimeLast(response, 1);
    $("#mip-education-content").find("[name=secondary-students-ireland-year]").text(app.library.jsonStat.getTimeLast(response, 1)[0]);
    app.mip.education.ajax.secondaryStudentsIrelandData();
}

app.mip.education.ajax.secondaryStudentsIrelandData = function () {
    app.library.pxStat.getData(app.mip.config.education.headlineFigures.secondaryStudentsIreland.params, "app.mip.education.callback.secondaryStudentsIrelandData")
}

app.mip.education.callback.secondaryStudentsIrelandData = function (response) {
    $("#mip-education-content").find("[name=secondary-students-ireland]").text(app.library.utility.formatNumber(response.value[0]));
    $("#mip-education-content").find("[name=secondary-students-ireland-table]").text(app.config.url.api.pxStat.application + response.extension.matrix).attr("href", app.config.url.api.pxStat.application + response.extension.matrix);
}
//#endregion Secondary Students

//#region Ireland Stem Graduates
app.mip.education.ajax.irelandStemGraduatesMetadata = function () {
    app.library.pxStat.getMetaData("MIP09", "app.mip.education.callback.irelandStemGraduatesMetadata")
}

app.mip.education.callback.irelandStemGraduatesMetadata = function (response) {
    app.mip.config.education.headlineFigures.irelandStemGraduates.params.dimension["TLIST(A1)"].category.index = app.library.jsonStat.getTimeLast(response, 1);
    $("#mip-education-content").find("[name=ireland-stem-graduates-year]").text(app.library.jsonStat.getTimeLast(response, 1)[0]);
    app.mip.education.ajax.irelandStemGraduatesData();
}

app.mip.education.ajax.irelandStemGraduatesData = function () {
    app.library.pxStat.getData(app.mip.config.education.headlineFigures.irelandStemGraduates.params, "app.mip.education.callback.irelandStemGraduatesData")
}

app.mip.education.callback.irelandStemGraduatesData = function (response) {
    $("#mip-education-content").find("[name=ireland-stem-graduates]").text(app.library.utility.formatNumber(response.value[0]));
    $("#mip-education-content").find("[name=ireland-stem-graduates-table]").text(app.config.url.api.pxStat.application + response.extension.matrix).attr("href", app.config.url.api.pxStat.application + response.extension.matrix);
}
//#endregion Ireland Stem Graduates

//#endregion Headline Figures

//#region Charts

//#region EU27: Ratio of students to teachers

app.mip.education.ajax.ratioStudentsToTeachersPrimary = function () {
    app.library.pxStat.getMetaData("MIP08", "app.mip.education.callback.ratioStudentsToTeachersPrimary")
};

app.mip.education.callback.ratioStudentsToTeachersPrimary = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    $(app.mip.config.education.charts.ratioStudentsToTeachersPrimary.data.datasets).each(function (index, value) {
        value.api.query.data.params.dimension[app.library.jsonStat.getTimeDimensionCode(response)].category.index = lastPeriod;
    });
    $("#mip-education-content").find("[name=ratio-students-teachers-year]").text(lastPeriod);
    app.mip.config.education.charts.ratioStudentsToTeachersPrimary.data.datasets[0].label = app.label.static["primary"];
    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-ratio-students-teachers-primary',
        app.mip.config.education.charts.ratioStudentsToTeachersPrimary
    );
};

app.mip.education.ajax.ratioStudentsToTeachersUpperSecondary = function () {
    app.library.pxStat.getMetaData("MIP08", "app.mip.education.callback.ratioStudentsToTeachersUpperSecondary")
};

app.mip.education.callback.ratioStudentsToTeachersUpperSecondary = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    $(app.mip.config.education.charts.ratioStudentsToTeachersUpperSecondary.data.datasets).each(function (index, value) {
        value.api.query.data.params.dimension[app.library.jsonStat.getTimeDimensionCode(response)].category.index = lastPeriod;
    });
    $("#mip-education-content").find("[name=ratio-students-teachers-year]").text(lastPeriod);
    app.mip.config.education.charts.ratioStudentsToTeachersUpperSecondary.data.datasets[0].label = app.label.static["upper-secondary"];
    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-ratio-students-teachers-upper-secondary',
        app.mip.config.education.charts.ratioStudentsToTeachersUpperSecondary
    );
};

//#endregion EU27: Ratio of students to teachers

//#region  Young people neither in employment nor in education 

app.mip.education.ajax.youngPeopleNotInEmploymentEducation = function () {
    app.library.pxStat.getMetaData("MIP03", "app.mip.education.callback.youngPeopleNotInEmploymentEducation")
}

app.mip.education.callback.youngPeopleNotInEmploymentEducation = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    $(app.mip.config.education.charts.youngPeopleNotInEmploymentEducation.data.datasets).each(function (index, value) {
        value.api.query.data.params.dimension[app.library.jsonStat.getTimeDimensionCode(response)].category.index = lastPeriod;
    });
    $("#mip-education-content").find("[name=young-people-not-in-employment-education-year]").text(lastPeriod);

    app.mip.config.education.charts.youngPeopleNotInEmploymentEducation.data.datasets[0].label = app.label.static["total-persons"];
    app.mip.config.education.charts.youngPeopleNotInEmploymentEducation.data.datasets[1].label = app.label.static["male"];
    app.mip.config.education.charts.youngPeopleNotInEmploymentEducation.data.datasets[2].label = app.label.static["female"];

    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-young-people-not-in-employment-education',
        app.mip.config.education.charts.youngPeopleNotInEmploymentEducation
    );
}

//#endregion  Young people neither in employment nor in education 

//#region  Ireland and EU27: STEM graduates by sex 

app.mip.education.ajax.stemGraduatesBySex = function () {
    app.library.pxStat.getMetaData("MIP09", "app.mip.education.callback.stemGraduatesBySex")
}

app.mip.education.callback.stemGraduatesBySex = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    $(app.mip.config.education.charts.stemGraduatesBySex.data.datasets).each(function (index, value) {
        value.api.query.data.params.dimension[app.library.jsonStat.getTimeDimensionCode(response)].category.index = lastPeriod;
    });
    $("#mip-education-content").find("[name=stem-graduates-by-sex-year]").text(lastPeriod);
    app.mip.config.education.charts.stemGraduatesBySex.data.datasets[0].label = app.label.static["total-persons"];
    app.mip.config.education.charts.stemGraduatesBySex.data.datasets[1].label = app.label.static["male"];
    app.mip.config.education.charts.stemGraduatesBySex.data.datasets[2].label = app.label.static["female"];

    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-stem-graduates-by-sex',
        app.mip.config.education.charts.stemGraduatesBySex
    );
}

//#endregion  Ireland and EU27: STEM graduates by sex 

//#region  Ireland: Real current public expenditure on education 

app.mip.education.ajax.realExpenditureOnEducation = function () {
    app.library.pxStat.getMetaData("EDA22", "app.mip.education.callback.realExpenditureOnEducation")
}

app.mip.education.callback.realExpenditureOnEducation = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    $(app.mip.config.education.charts.realExpenditureOnEducation.data.datasets).each(function (index, value) {
        value.api.query.data.params.dimension[app.library.jsonStat.getTimeDimensionCode(response)].category.index = lastPeriod;
    });
    $("#mip-education-content").find("[name=real-expenditure-on-education-year]").text(lastPeriod);
    app.mip.config.education.charts.realExpenditureOnEducation.data.datasets[0].label = app.label.static["primary-level"];
    app.mip.config.education.charts.realExpenditureOnEducation.data.datasets[1].label = app.label.static["second-level"];
    app.mip.config.education.charts.realExpenditureOnEducation.data.datasets[2].label = app.label.static["third-level"];

    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-real-expenditure-on-education',
        app.mip.config.education.charts.realExpenditureOnEducation
    );
}

//#endregion  Ireland: Real current public expenditure on education

//#region  Ireland and OECD: Student performance on the mathematics, reading, and science literacy scales

app.mip.education.ajax.irelandAndOced = function () {
    app.library.pxStat.getMetaData("MIP14", "app.mip.education.callback.irelandAndOced")
}

app.mip.education.callback.irelandAndOced = function (response) {
    var lastPeriod = app.library.jsonStat.getTimeLast(response, 1);
    $(app.mip.config.education.charts.irelandAndOced.data.datasets).each(function (index, value) {
        value.api.query.data.params.dimension[app.library.jsonStat.getTimeDimensionCode(response)].category.index = lastPeriod;
    });
    $("#mip-education-content").find("[name=ireland-and-oced-year]").text(lastPeriod);
    app.mip.config.education.charts.irelandAndOced.data.datasets[0].label = app.label.static["mathematics"];
    app.mip.config.education.charts.irelandAndOced.data.datasets[1].label = app.label.static["reading"];
    app.mip.config.education.charts.irelandAndOced.data.datasets[2].label = app.label.static["science"];

    pxWidget.draw.init(
        'chart',
        'mip-pxwidget-ireland-and-oced',
        app.mip.config.education.charts.irelandAndOced
    );
}

//#endregion  Ireland and OECD: Student performance on the mathematics, reading, and science literacy scales

//#endregion Charts