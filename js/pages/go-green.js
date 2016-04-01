var pageConfig = {
	masterReport: {
		uri: '/public/Samples/FreshDelivery_Demo/21.5GoGreenChart',
		container: '#goGreenChart'
	},
	slaveReport: {
		uri: '/public/Samples/FreshDelivery_Demo/21.6GoGreenTable',
		container: '#goGreenTable'
	},
	mapReport: {
		uri: '/public/Samples/FreshDelivery_Demo/21.7GoGreenMap',
		container: '#GreenMap'
	},
	params: {}
};

//var mapReport;
//var masterReport;
//var slaveReport;
var defCity = 'San Diego';
var defDepartment = 'Produce';

//load the config and get the script for the configured server instance
$.getJSON('./config/config.json', function(data) {
	$.getScript(data.visualizeJS, function() {
		initPage(data.jrsConfig);
	});
});

function initPage(jrsConfig) {
	visualize({
		auth: jrsConfig.auth
	}, function(v) {
		loadDashboard(v);
		$(function() {
			renderFilters(v.report.exportFormats);
		});
	});
}

function loadDashboard(v) {
	$('#DepartmentName').html(defDepartment);
	$('#CityName1').html(defCity);
	$('#CityName2').html(defCity);
	window.masterReport = v.report({
		resource: pageConfig.masterReport.uri,
		container: pageConfig.masterReport.container,
		linkOptions: {
			events: {
				"click": function(evt, link) {
					pageConfig.params.department = [link.parameters.department_name];
					//todo: should be able to bind the pageconfig.params object to the text
					$('#DepartmentName').html(link.parameters.department_name);

					refreshSlave();

				}
			}
		},
		error: function(err) {
			console.log(err.message);
		}
	});

	window.slaveReport = v.report({
		resource: pageConfig.slaveReport.uri,
		container: pageConfig.slaveReport.container,
		linkOptions: {
			events: {
				"click": function(evt, link) {
					pageConfig.params.department = [link.parameters.department_name];
					//todo: should be able to bind the pageconfig.params object to the text
					$('#BrandName1').html(link.parameters.brand_name);
					refreshSlave();

				}
			}
		},
		error: function(err) {
			console.log(err.message);
		}
	});

	window.mapReport = v.report({
		resource: pageConfig.mapReport.uri,
		container: pageConfig.mapReport.container,
		linkOptions: {
			events: {
				"click": function(evt, link) {
					changeChartCity(link.parameters.city_name);
				}
			}
		},
		error: function(err) {
			console.log(err.message);
		}
	});
}

function changeChartCity(city) {
	pageConfig.params = {};
	pageConfig.params.city_name = [city];
	refreshMaster();
	refreshSlave();
	$('#CityName1').html(city);
	$('#CityName2').html(city);

}

function resetFilters() {
	pageConfig.params = {};
	refreshSlave();
	$('#BrandName1').html('');
}

function refreshSlave() {
	window.slaveReport.params(pageConfig.params).run();
}

function refreshMaster() {
	window.masterReport.params(pageConfig.params).run();
}

//render all the filtering options specified in the page configuration
function renderFilters(options) {
	$.get('./partials/dropdown-nostyle.html', function(tmpl) {
		var template = Handlebars.compile(tmpl),
			templateData = {
				allName: 'Export Format',
				paramId: 'exportFormat',
				options: options
			};
		$('#exportPlaceholder').append(template(templateData));
	});
}

$(function() {
	$("#filterTen").on('click', function() {
		limitResults(10);
	});

	$("#filterReset").on('click', function() {
		resetFilters();
	});

	$("#ExportButton").on('click', function() {
		slaveReport.export({
			outputFormat: $("[data-paramId=exportFormat]").val()
		}, function(link) {
			var url = link.href ? link.href : link;
			window.location.href = url;
		}, function(error) {
			console.log(error);
		});
	});
});
