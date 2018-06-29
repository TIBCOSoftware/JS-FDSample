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

//load default Brand Name
$('#BrandName1').html("Hermanos");

app.initializeVisualize(initPage);

function initPage(jrsConfig, visualize) {
	loadDashboard(visualize);

	$("#filterTen").on('click', function() {
		limitResults(10);
	});

	$("#filterReset").on('click', function() {
		resetFilters();
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
}

function refreshSlave() {
	window.slaveReport.params(pageConfig.params).run();
}
