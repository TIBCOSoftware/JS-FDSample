var pageConfig = {
	masterReport: {
		uri: '/public/Samples/FreshDelivery_Demo/Brands',
		container: '#brands'
	},
	slaveReport: {
		uri: '/public/Samples/FreshDelivery_Demo/Products',
		container: '#products'
	},
	params: {}
};

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
	});
}

function loadDashboard(v) {
	window.masterReport = v.report({
		resource: pageConfig.masterReport.uri,
		container: pageConfig.masterReport.container,
		linkOptions: {
			events: {
				"click": function(evt, link) {
					pageConfig.params.brand = [link.parameters.brand_name];
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

	window.slaveReport = v.report({
		resource: pageConfig.slaveReport.uri,
		container: pageConfig.slaveReport.container,
		error: function(err) {
			console.log(err.message);
		}
	});
}

function limitResults(num) {
	pageConfig.params.Limiter = ['limit ' + num];
	refreshSlave();
}

function resetFilters() {
	pageConfig.params = {};
	refreshSlave();
	$('#BrandName1').html('');
}

function refreshSlave() {
	window.slaveReport.params(pageConfig.params).run();
}

$(function() {
	$("#filterTen").on('click', function() {
		limitResults(10);
	});

	$("#filterReset").on('click', function() {
		resetFilters();
	});
});
