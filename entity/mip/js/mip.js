// Load the config.json into the application
api.ajax.config("entity/mip/config/mip.config.json", function (config) {
    // Parse JSON string into object
    app.mip.config = config;

}, { async: false });
$(document).ready(function () {
    if (window.innerWidth < 576) {
        $(".sidebar").addClass("toggled");
    }
    app.mip.heading();
    app.mip.social.ajax.populationOfIrelandMetadata();
    app.mip.social.ajax.populationChangeMetadata();
    app.mip.social.ajax.differenceInWeeklyMedianEarningsMetadata();
    app.mip.social.ajax.totalFertilityRateMetadata();
    app.mip.social.ajax.populationByAgeGroup();
    app.mip.social.ajax.atRiskOfPoverty();
    app.mip.social.ajax.youngAndOldDependencyRatios();
    app.mip.social.ajax.migrationNaturalIncreaseMetadata();
    //app.mip.economy.ajax.gdpOfIrelandMetadata();
    //app.mip.economy.ajax.modifiedGniOfIrelandMetadata();
    app.mip.economy.ajax.generalGovConsolidatedGrossDebtMetadata();
    app.mip.economy.ajax.comparitivePriceLevelsMetadata();
    app.mip.economy.ajax.gdpGrowthRatesMetadata();
    app.mip.economy.ajax.unemploymentRatesMetadata();
    app.mip.economy.ajax.irelandRppiMetadata();
    app.mip.economy.ajax.importsAndExportsMetadata();
    app.mip.environment.ajax.newVehiclesMetadata();
    app.mip.environment.ajax.wasteGeneratedMetadata();
    app.mip.environment.ajax.totalGhgEmissionsMetadata();
    app.mip.environment.ajax.energyProductivityMetadata();
    app.mip.environment.ajax.municipalWasteMetadata();
    app.mip.environment.ajax.modalSplitOfInlandFreightTransportMetadata();
    app.mip.environment.ajax.numberOfVehiclesLicensedMetadata();
    app.mip.environment.ajax.netGreenhouseGasEmissionsMetadata();
    app.mip.education.ajax.primaryStudentsIrelandMetadata();
    app.mip.education.ajax.secondaryStudentsIrelandMetadata();
    app.mip.education.ajax.irelandStemGraduatesMetadata();
    app.mip.education.ajax.ratioStudentsToTeachersPrimary();
    app.mip.education.ajax.ratioStudentsToTeachersUpperSecondary();
    app.mip.education.ajax.youngPeopleNotInEmploymentEducation();
    app.mip.education.ajax.stemGraduatesBySex();
    app.mip.education.ajax.realExpenditureOnEducation();
    app.mip.education.ajax.irelandAndOced();
    app.mip.health.ajax.lifeExpectancyAtBirthMetadata();
    app.mip.health.ajax.lifeExpectancyAge65MalesMetadata();
    app.mip.health.ajax.lifeExpectancyAge65FemalesMetadata();
    app.mip.health.ajax.totalExpenditureOnHealthMetadata();
    app.mip.health.ajax.lifeExpectancyAtBirthSex();
    app.mip.health.ajax.healthyLifeYearsAtBirthBySex();
    app.mip.health.ajax.lifeExpectancyInPoorHealth();
    app.mip.health.ajax.currentExpenditureOnHealthcare();

    //sync mobile and desktop tabs/dropdown
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (event) {
        $("#visual-mip").find("[data-toggle='tab']").removeClass("active");
        $("#visual-mip").find("[data-toggle='tab'][name=" + event.target.name + "]").addClass("active");
    })

    //draw widget queue always last
    //  pxWidget.draw.queue();
    // Translate labels language (Last to run)
    app.library.html.parseStaticLabel();
});