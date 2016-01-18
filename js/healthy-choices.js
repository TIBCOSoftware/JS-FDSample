		var masterReport;
		
        // Get my Client Object
        visualize(function(v){
            JRSClient = v;
            initializeReports();
        });

        function renderReportLink(uri, container, v) {
			 
            return v.report({
                resource: uri,
                container: container,
				
				  linkOptions: {
                    events: {
                        "click"  : function(evt, link){
                            updateProduct(link.parameters.product_name, link.parameters.total_supply, link.parameters.product_group, link.parameters.price, link.parameters.total_units_case);
                        }
                    }
                },
				  
                error: function(err) {
                    console.log(err.message);
                }
            });
        }

        function initializeReports() {
            var master = '/public/Samples/FreshDelivery_Demo/HealthyChoiceProducts';

            masterReport = renderReportLink(master, '#healthy-choices', JRSClient);
            updateProduct('Ebony Red Pepper', '2', 'Fresh Vegetables', '2.88', '14');
        }
		
        // Update Slave report with the passed State Parameter
        function updateProduct(productName, supplyTotal, productGroup, productPrice, unitsCase) {

			var parameters = {};
			var productName2 = '';
			parameters['product'] = [ productName ];
            switch (productName) {
                    case 'Ebony Beets':
                        productName2 = 'Beets';
                        break;
                    case 'Ebony Canned Peanuts':
                        productName2 = 'Peanuts';
                        break;
					  case 'Ebony Corn on the Cob':
                        productName2 = 'Corn on the Cob';
                        break;
                    case 'Ebony Firm Tofu':
                        productName2 = 'Firm Tofu';
                        break;
					  case 'Ebony Honey Dew':
                        productName2 = 'Honey Dew';
                        break;
					  case 'Ebony New Potatos':
                        productName2 = 'New Potatoes';
                        break;
                    case 'Ebony Onions':
                        productName2 = 'Onions';
                        break;
					  case 'Ebony Party Nuts':
                        productName2 = 'Party Nuts';
                        break;
                    case 'Ebony Peaches':
                        productName2 = 'Peaches';
                        break;
					  case 'Ebony Plums':
                        productName2 = 'Plums';
                        break;
					  case 'Ebony Red Pepper':
                        productName2 = 'Red Pepper';
                        break;
					  case 'Hermanos Honey Dew':
                        productName2 = 'Yellow Honey Dew';
                        break;
                    case 'Hermanos Sweet Peas':
                        productName2 = 'Sweet Peas';
                        break;
                    case 'Hermanos Mandarin Oranges':
                        productName2 = 'Mandarin Oranges';
                        break;
					  case 'Hermanos Mixed Nuts':
                        productName2 = 'Mixed Nuts';
                        break;
                    case 'Hermanos Cauliflower':
                        productName2 = 'Cauliflower';
                        break;
					  case 'Hermanos Fancy Plums':
                        productName2 = 'Fancy Plums';
                        break;
					  case 'Hermanos Mushrooms':
                        productName2 = 'Mushrooms';
                        break;
                    case 'Hermanos Elephant Garlic':
                        productName2 = 'Elephant Garlic';
                        break;
                    case 'Hermanos Lettuce':
                        productName2 = 'Lettuce';
                        break;
					  case 'Hermanos Prepared Salad':
                        productName2 = 'Prepared Salad';
                        break;
                    case 'Hermanos Lemons':
                        productName2 = 'Lemons';
                        break;
					  case 'Hermanos Cantelope':
                        productName2 = 'Cantelope';
                        break;
                    default:
                        productName2 = 'N/A';
            }
			
			var parameters = {};
			var availSupply = '';
			parameters['supply'] = [ supplyTotal ];
			
			 switch (supplyTotal) {
                    case '1':
                        availSupply = 'None';
                        break;
                    case '2':
                        availSupply = 'Limited';
                        break;
					  case '3':
                        availSupply = 'Good';
                        break;
                    case '4':
                        availSupply = 'High';
                        break;
                    default:
                        availSupply = 'N/A';
			 }
			 
            $('#ImageLink').html('<img src="img/products/' + (productName) + '.jpg" height="200px">');
            $('#ProductName1').html(productName);
            $('#ProductNameSimple').html(productName2);
			 $('#Group').html(productGroup);
			 $('#AvailSupply').html(availSupply);
			 $('#Price').html('$ ' + Number(productPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
			 $('#UnitsCase').html(unitsCase);
        };
		
		/*
        * Re run the Report with a changed Input Parameter for seasonal availability
        *
        * @param {string} inputControlId - ID of the input parameter to be changed
        * @param {Object} paramValue - new value to be passed
         */
        function passControls(inputControlId, paramValue) {
            var parameters = {};

            parameters[inputControlId] = [ paramValue ];
            console.log(parameters);
            //currentPageIndex = 1;
            masterReport.params(parameters).run();
        }
		
		 function resetControls(inputControlId) {
            var parameters = {};
            parameters[inputControlId] = [ '1', '2', '3', '4' ];
            console.log(parameters);
            masterReport.params(parameters).run();
        }
		
		$(window).load(function() {
			function preload(arrayOfImages) {
    			$(arrayOfImages).each(function(){
        		$('<img/>')[0].src = this;
        		// Alternatively you could use:
        		// (new Image()).src = this;
    			});
			}
			preload([
				'img/products/Ebony Firm Tofu.jpg',
    			'img/products/Ebony Honey Dew.jpg',
				'img/products/Ebony New Potatos.jpg',
    			'img/products/Ebony Onions.jpg',
    			'img/products/Ebony Peaches.jpg',
				'img/products/Ebony Corn on the Cob.jpg',
    			'img/products/Ebony Red Pepper.jpg',
				'img/products/Ebony Plums.jpg',
				'img/products/Ebony Canned Peanuts.jpg',
    			'img/products/Ebony Beets.jpg',
    			'img/products/Ebony Party Nuts.jpg',
				'img/products/Hermanos Honey Dew.jpg',
				'img/products/Hermanos Sweet Peas.jpg',
				'img/products/Hermanos Mandarin Oranges.jpg',
    			'img/products/Hermanos Mixed Nuts.jpg',
    			'img/products/Hermanos Cauliflower.jpg',
				'img/products/Hermanos Fancy Plums.jpg',
				'img/products/Hermanos Mushrooms.jpg',
				'img/products/Hermanos Elephant Garlic.jpg',
    			'img/products/Hermanos Lettuce.jpg',
    			'img/products/Hermanos Prepared Salad.jpg',
				'img/products/Hermanos Lemons.jpg',
				'img/products/Hermanos Cantelope.jpg'
			]);
		});