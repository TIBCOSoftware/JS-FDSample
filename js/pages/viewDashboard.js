/*
 * ========================================================================
 * viewDashboard.js : v0.8.0
 *
 * ========================================================================
 * Copyright 2014
 * Authors: Sherman Wood
 *
 * Unless you have purchased a commercial license agreement from TIBCO Jaspersoft Inc., the following license terms apply:
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the
 * GNU Affero General Public License as published by the Free Software Foundation, either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public
 * License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 * ========================================================================
 */


var pageConfig = {};

pageConfig.inventory = {
	type: 'dashboard',
	dashboard: "/public/Samples/FreshDelivery_Demo/Admin_Inventory_Dashboard",
	dashboardParams: {
		inv_store__store_contact__store_country_1: ["Canada", "Mexico", "USA"]
	},
	filters: [{
		paramId: "inv_store__store_contact__store_country_1",
		allName: "All Countries"
	}],
	viewName: 'Inventory Metrics by Country',
	viewDescription: 'Orders, Tonnage, Shipping Time. Select brand in Tonnage to see Units by district.',
	chartTitle: ''

};

pageConfig.payroll = {
	type: 'dashboard',
	dashboard: "/public/Samples/FreshDelivery_Demo/Employee_Dashboard",
	dashboardParams: {
		StoreType: ["Deluxe Supermarket", "Gourmet Supermarket", "HeadQuarters", "Mid-Size Grocery", "Small Grocery", "Supermarket"]
	},
	filters: [{
		paramId: "StoreType",
		allName: "All Store Types",
	}],
	viewName: 'Employee Payroll',
	viewDescription: 'Payroll with overtime paid and vacation accrued',
	chartTitle: ''
};

/*
pageConfig.blank = {
	type: 'dashboard',
	dashboard: "/public/Samples/FreshDelivery_Demo/22.0_Blank_Starting_Dashboard",
	dashboardParams: {
		Country: ["USA", "Canada", "Mexico"]
	},
	filters: [{
		paramId: "Country",
		allName: "All Countries"
			//options: (function(){return pageConfig.dashboardParams.Country})()
	}],
	viewName: 'New Dashboard View',
	viewDescription: 'Begin on "Blank Starting Dashboard in repository',
	chartTitle: ''
};
*/

var hash = location.search.split('?')[1];
pageConfig = pageConfig[hash] || pageConfig.inventory;

var dashboard;
var visualize;



app.initializeVisualize(initPage);

function initPage(jrsConfig, v) {
	visualize = v;
	loadDashboard(v);
}

//load the dashboard with default parameters
function loadDashboard(v) {

	dashboard = v.dashboard({
		resource: pageConfig.dashboard,
		container: "#container",
		error: handleError
	});
}


function buildParams() {

	//placeholder for the params object
	var params = {};

	//interate over all select lists and build the params object
	$("[data-paramId]").each(function() {
		var paramName = $(this).attr('data-paramId'),
			selectedVal = $(this).val(),
			allVals = [];

		// get a list of all options in the select so we can handle the "all" case
		$(this).children('option').each(function() {
			if ($(this).attr('value') !== 'all') {
				allVals.push($(this).attr('value'));
			}
		});

		//add the parameter to the params array
		params[paramName] = selectedVal === 'all' ? ["~NOTHING~"] : [selectedVal];

	});

	return params;
}

// apply the selected filters to the dashboard 
function updateFilters() {

	//build the parameters object
	var params = buildParams();

	/* reload the dashboard with params */
	dashboard.params(params).run()
		.fail(handleError);
}

//render all the filters specified in the page configuration
function renderFilters() {
	$.get('./partials/dropdown.html', function(tmpl) {
		var template = Handlebars.compile(tmpl);
		for (var i = 0, l = pageConfig.filters.length; i < l; i++) {
			var templateData = pageConfig.filters[i];
			templateData.options = pageConfig.dashboardParams[pageConfig.filters[i].paramId];
			$('#filters').append(template(templateData));
			// Add the change handler
			$("#" + pageConfig.filters[i].paramId ).change(function() {
				updateFilters();
			});
		}
	});
}

function handleError(e) {
	alert(e);
}


$(function() {

	//render the left side bar 
	$.get('./partials/dashboard-left-panel.html', function(tmpl) {
		var templateData = {
			viewName: pageConfig.viewName,
			viewDescription: pageConfig.viewDescription
		};
		var template = Handlebars.compile(tmpl);
		$('#leftPanel').html(template(templateData));

		//render the filters
		renderFilters();

	});
});
