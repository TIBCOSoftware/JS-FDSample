//define page and configuration data
var pageConfig = {
	masterReport: {
		uri: '/public/Samples/FreshDelivery_Demo/HealthyChoiceProducts',
		container: '#healthy-choices'
	},
	params: {},
	supplyMap: {
		'1': 'None',
		'2': 'Limited',
		'3': 'Good',
		'4': 'High'
	}
};
var defProductName = 'Red Pepper';
var defGroup = 'Fresh Vegetables';
var defAvailability = 'Limited';
var defPricePerUnit = '$ 2.88';
var defUnitsPerCase = '14';

//load the config and get the script for the configured server instance
$.getJSON('./config/config.json', function(data) {
	$.getScript(data.visualizeJS, function() {
		initPage(data.jrsConfig);
	});
});

//init page and authenticate with JRS
function initPage(jrsConfig) {
	visualize({
		auth: jrsConfig.auth
	}, function(v) {
		loadDashboard(v);
	});
}

//load the dashboard
function loadDashboard(v) {
	$('#ImageLink').html('<img src="img/products/Ebony ' + defProductName+ '.jpg" height="200px">');
	$('#ProductNameSimple').html(defProductName);
	$('#Group').html(defGroup);
	$('#AvailSupply').html(defAvailability);
	$('#Price').html(defPricePerUnit);
	$('#UnitsCase').html(defUnitsPerCase);
	window.masterReport = v.report({
		resource: pageConfig.masterReport.uri,
		container: pageConfig.masterReport.container,
		linkOptions: {
			events: {
				"click": function(evt, link) {
					var l = link.parameters;
					$('#ImageLink').html('<img src="img/products/' + (l.product_name) + '.jpg" height="200px">');
					$('#ProductName1').html(l.product_name);
					$('#ProductNameSimple').html(l.product_name.replace(/Hermanos/, '').replace(/Ebony/, ''));
					$('#Group').html(l.product_group);
					$('#AvailSupply').html(pageConfig.supplyMap[l.total_supply] || 'N/A');
					$('#Price').html('$ ' + Number(l.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
					$('#UnitsCase').html(l.total_units_case);
				}
			}
		},
		error: function(err) {
			console.log(err.message);
		}
	});
}

function setFilter(paramId, paramValue) {
	pageConfig.params[paramId] = [paramValue];
	refreshMaster();
}

function resetFilters() {
	pageConfig.params = {};
	refreshMaster();
}

function refreshMaster() {
	window.masterReport.params(pageConfig.params).run();
}

$(function() {
	$("#filterTen").on('click', function() {
		limitResults(10);
	});

	$("#filterReset").on('click', function() {
		resetFilters();
	});
});
