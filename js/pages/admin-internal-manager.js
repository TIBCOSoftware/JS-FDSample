//the internal one is a report not dashboard. probably break into own file
// for the internal report, use different JRS credentials based on who is logged in.



/*
 * ========================================================================
 * admin.js : v0.8.0
 *
 * ========================================================================
 * Copyright 2014
 * Authors: Daniel Petzold
 *
 * Unless you have purchased a commercial license agreement from Jaspersoft Inc., the following license terms apply:
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


var pageConfig = {
	type: 'report',
	dashboard: "/public/Samples/FreshDelivery_Demo/FreshDelivery_Internal_Report",
	filters: [],
	dashboardParams: {},
	viewName: 'Internal Store Management',
	viewDescription: 'These metrics change based on the manager/admin who is logged in.',
	chartTitle: ''
};


app.initializeVisualize(initPage, JSON.parse(sessionStorage.jrsConfig || '{}'));

function initPage(jrsConfig, visualize) {
	//auth: JSON.parse(sessionStorage.jrsConfig || '{}').auth //use the credentials of the logged in user
	loadReport(visualize);
}


//load the dashboard 
function loadReport(v) {

	var dashboard = v.report({
		resource: pageConfig.dashboard,
		container: "#container",
		error: handleError,
		params: pageConfig.dashboardParams,
		success: function() {
			$("button").prop("disabled", false);
		}
	});

	//attach to the global scope
	window.dashboard = dashboard;
}

function handleError(err) {
	console.log(err);
}
