var pageConfig = {
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

//load the config and get the script for the configured server instance
$.getJSON('./config/config.json', function(data) {
	$.getScript(data.visualizeJS, function() {
		initPage(data.jrsConfig);
	});
});

//connect to Jaspersoft BI server and load the dashboard
function initPage(jrsConfig) {
	visualize({
		auth: jrsConfig.auth
	}, function(v) {
		loadDashboard(v);
	});
}

//load the dashboard 
function loadDashboard(v) {

	var dashboard = v.dashboard({
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

function handleError(e) {
	alert(e);
}
