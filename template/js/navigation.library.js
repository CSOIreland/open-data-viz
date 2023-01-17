/*******************************************************************************
Custom JS application specific mip.library.js
*******************************************************************************/
//#region Namespaces definitions
// Add Namespace Group Data Table
app.navigation = {};

//#endregion

app.navigation.draw = function () {

    api.content.navigate("#navigation [name=home]", "entity/home", null, null, "Home", app.plugin.cookiconsent.granted);
    $.each(app.navigation.menu, function (index, value) {
        var heading = $("#navigation").find("[name=templates]").find("[name=heading]").clone();
        heading.text(value.label);
        $("#navigation").find("[name=entity-navigation]").append(heading);
        $.each(value.links, function (index2, link) {
            if (link.path) {
                var listItem = $("#navigation").find("[name=templates]").find("[name=navigation-link]").clone();
                listItem.find("a").attr("href", "?body=" + link.path).attr("name", link.name);
                listItem.find("a span").text(link.label);
                listItem.find("i").addClass(link.icon);
                $("#navigation").find("[name=entity-navigation]").append(listItem);
                api.content.navigate("#navigation [name=" + link.name + "]", link.path, null, null, app.label.entity[link.name].pageTitle, app.plugin.cookiconsent.granted);
            } else {
                var navCollapse = $("#navigation").find("[name=templates]").find("[name=navigation-link-collapse]").clone();
                navCollapse.find("i").addClass(link.icon)
                navCollapse.find("[name=navigation-link-collapse-text]").text(link.label);
                navCollapse.find("a").attr("data-target", "#" + "nav-collapse-" + index + "-" + index2)
                navCollapse.find(".collapse").attr("id", "nav-collapse-" + index + "-" + index2);
                $.each(link.menu, function (index3, menuItem) {
                    var navCollapseHeading = $("#navigation").find("[name=templates]").find("[name=heading-collapse]").clone();
                    navCollapseHeading.text(menuItem.label);
                    navCollapse.find(".collapse-inner").append(navCollapseHeading);
                    $.each(menuItem.links, function (index4, menuILink) {
                        var subMenuLink = $("#navigation").find("[name=templates]").find("[name=navigation-collapse-entity-link]").clone();
                        subMenuLink.attr("href", "?body=" + menuILink.path).attr("name", menuILink.name).attr("entity", menuILink.path);
                        subMenuLink.text(menuILink.label);
                        navCollapse.find(".collapse-inner").append(subMenuLink);
                    });
                    var navCollapseDivider = $("#navigation").find("[name=templates]").find("[name=navigation-collapse-divider]").clone();
                    navCollapse.find(".collapse-inner").append(navCollapseDivider);
                });
                $("#navigation").find("[name=entity-navigation]").append(navCollapse);
                $("#navigation").find("[name=entity-navigation]").find("a.collapse-item").each(function () {
                    api.content.navigate("#navigation [name=" + $(this).attr("name") + "]", $(this).attr("entity"), null, null, app.label.entity[link.name].pageTitle, app.plugin.cookiconsent.granted);
                });
            }

        });
        var divider = $("#navigation").find("[name=templates]").find("[name=navigation-divider]").clone();
        $("#navigation").find("[name=entity-navigation]").append(divider);

    });
}