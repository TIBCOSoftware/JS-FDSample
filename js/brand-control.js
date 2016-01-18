/*
 * ========================================================================
 * brand-control.js : v0.8.0
 *
 * ========================================================================
 * Copyright 2014
 * Author: Mariano Luna, Daniel Petzold
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

var masterReport;
var slaveReport;
var defBrand = 'Hermanos';
var brandName = '';
var labelProducts = 'Products'
var labelTop10 = 'Top Ten Products';

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
						updateBrand(link.parameters.brand_name);
						
					}
				}
			},
			error: function(err) {
				console.log(err.message);
			}
		});
	}

        function initializeReports() {
            var master = '/public/Samples/FreshDelivery_Demo/Brands';
            var slave = '/public/Samples/FreshDelivery_Demo/Products';
			
			 $('#Label').html(labelProducts);
			 $('#BrandName1').html(defBrand);
			 
            masterReport = renderReportLink(master, '#brands', JRSClient);
            slaveReport = renderReport(slave, '#products', JRSClient);
        }

        // Update Slave report with the passed Brand Parameters
        function updateBrand(brandName) {
            keepBrand = brandName;
			 var parameters = {};
            parameters['brand'] = [ brandName ];
            slaveReport.params(parameters).run();
			 
            $('#BrandName1').html(brandName);		
        };
		
		function topTen() {
			if(typeof keepBrand === 'undefined'){
				keepBrand = defBrand;   
 			};
			var limitShown = 'limit 10';
			var parameters = {};
			parameters['Limiter'] = [ limitShown ];
			parameters['brand'] = [ keepBrand ];
			slaveReport.params(parameters).run();
			
			$('#Label').html(labelTop10); 
        }
		
		function resetControls() {
			if(typeof keepBrand === 'undefined'){
				keepBrand = defBrand;   
			};
			var limitShown = '';
			var parameters = {};
			parameters['Limiter'] = [ limitShown ];
			parameters['brand'] = [ keepBrand ];
			slaveReport.params(parameters).run();
			
			$('#Label').html(labelProducts);
        }
		
		// Preload images for tooltip
		$(window).load(function() {
			function preload(arrayOfImages) {
    			$(arrayOfImages).each(function(){
        		$('<img/>')[0].src = this;
    			});
			}
			preload([
				'img/products/thumbnails/Hermanos Fuji Apples.jpg',
				'img/products/thumbnails/Hermanos Garlic.jpg',
				'img/products/thumbnails/Hermanos Baby Onion.jpg',
				'img/products/thumbnails/Hermanos Summer Squash.jpg',
				'img/products/thumbnails/Hermanos Golden Delcious Apples.jpg',
				'img/products/thumbnails/Hermanos Elephant Garlic.jpg',
				'img/products/thumbnails/Hermanos Red Delcious Apples.jpg',
				'img/products/thumbnails/Hermanos Macintosh Apples.jpg',
				'img/products/thumbnails/Hermanos Potatos.jpg',
				'img/products/thumbnails/Hermanos Green Pepper.jpg',
				'img/products/thumbnails/Hermanos Tangerines.jpg',
				'img/products/thumbnails/Hermanos Squash.jpg',
				'img/products/thumbnails/Hermanos Mushrooms.jpg',
				'img/products/thumbnails/Hermanos Cauliflower.jpg',
				'img/products/thumbnails/Hermanos Walnuts.jpg',
				'img/products/thumbnails/Hermanos Mixed Nuts.jpg',
				'img/products/thumbnails/Hermanos Limes.jpg',
				'img/products/thumbnails/Hermanos Mandarin Oranges.jpg',
				'img/products/thumbnails/Hermanos Lemons.jpg',
				'img/products/thumbnails/Hermanos Dried Mushrooms.jpg',
				'img/products/thumbnails/Hermanos Cantelope.jpg',
				'img/products/thumbnails/Hermanos Prepared Salad.jpg',
    			'img/products/thumbnails/Hermanos Almonds.jpg',
    			'img/products/thumbnails/Hermanos Sweet Onion.jpg',
				'img/products/thumbnails/Hermanos Firm Tofu.jpg',
    			'img/products/thumbnails/Hermanos Honey Dew.jpg',
				'img/products/thumbnails/Hermanos New Potatos.jpg',
    			'img/products/thumbnails/Hermanos Onions.jpg',
				'img/products/thumbnails/Hermanos Fancy Plums.jpg',
    			'img/products/thumbnails/Hermanos Peaches.jpg',
				'img/products/thumbnails/Hermanos Corn of the Cob.jpg',
    			'img/products/thumbnails/Hermanos Tomatos.jpg',
				'img/products/thumbnails/Hermanos Shitake Mushrooms.jpg',
    			'img/products/thumbnails/Hermanos Red Pepper.jpg',
				'img/products/thumbnails/Hermanos Plums.jpg',
    			'img/products/thumbnails/Hermanos Oranges.jpg',
				'img/products/thumbnails/Hermanos Sweet Peas.jpg',
    			'img/products/thumbnails/Hermanos Lettuce.jpg',
				'img/products/thumbnails/Hermanos Canned Peanuts.jpg',
    			'img/products/thumbnails/Hermanos Beets.jpg',
				'img/products/thumbnails/Hermanos Broccoli.jpg',
    			'img/products/thumbnails/Hermanos Party Nuts.jpg',
				'img/products/thumbnails/Hermanos Fresh Lima Beans.jpg',
				'img/products/thumbnails/Hermanos Asparagus.jpg',
				'img/products/thumbnails/Tell Tale Fuji Apples.jpg',
				'img/products/thumbnails/Tell Tale Garlic.jpg',
				'img/products/thumbnails/Tell Tale Baby Onion.jpg',
				'img/products/thumbnails/Tell Tale Summer Squash.jpg',
				'img/products/thumbnails/Tell Tale Golden Delcious Apples.jpg',
				'img/products/thumbnails/Tell Tale Elephant Garlic.jpg',
				'img/products/thumbnails/Tell Tale Red Delcious Apples.jpg',
				'img/products/thumbnails/Tell Tale Macintosh Apples.jpg',
				'img/products/thumbnails/Tell Tale Potatos.jpg',
				'img/products/thumbnails/Tell Tale Green Pepper.jpg',
				'img/products/thumbnails/Tell Tale Tangerines.jpg',
				'img/products/thumbnails/Tell Tale Squash.jpg',
				'img/products/thumbnails/Tell Tale Mushrooms.jpg',
				'img/products/thumbnails/Tell Tale Cauliflower.jpg',
				'img/products/thumbnails/Tell Tale Walnuts.jpg',
				'img/products/thumbnails/Tell Tale Mixed Nuts.jpg',
				'img/products/thumbnails/Tell Tale Limes.jpg',
				'img/products/thumbnails/Tell Tale Mandarin Oranges.jpg',
				'img/products/thumbnails/Tell Tale Lemons.jpg',
				'img/products/thumbnails/Tell Tale Dried Mushrooms.jpg',
				'img/products/thumbnails/Tell Tale Cantelope.jpg',
				'img/products/thumbnails/Tell Tale Prepared Salad.jpg',
    			'img/products/thumbnails/Tell Tale Almonds.jpg',
    			'img/products/thumbnails/Tell Tale Sweet Onion.jpg',
				'img/products/thumbnails/Tell Tale Firm Tofu.jpg',
    			'img/products/thumbnails/Tell Tale Honey Dew.jpg',
				'img/products/thumbnails/Tell Tale New Potatos.jpg',
    			'img/products/thumbnails/Tell Tale Onions.jpg',
				'img/products/thumbnails/Tell Tale Fancy Plums.jpg',
    			'img/products/thumbnails/Tell Tale Peaches.jpg',
				'img/products/thumbnails/Tell Tale Corn of the Cob.jpg',
    			'img/products/thumbnails/Tell Tale Tomatos.jpg',
				'img/products/thumbnails/Tell Tale Shitake Mushrooms.jpg',
    			'img/products/thumbnails/Tell Tale Red Pepper.jpg',
				'img/products/thumbnails/Tell Tale Plums.jpg',
    			'img/products/thumbnails/Tell Tale Oranges.jpg',
				'img/products/thumbnails/Tell Tale Sweet Peas.jpg',
    			'img/products/thumbnails/Tell Tale Lettuce.jpg',
				'img/products/thumbnails/Tell Tale Canned Peanuts.jpg',
    			'img/products/thumbnails/Tell Tale Beets.jpg',
				'img/products/thumbnails/Tell Tale Broccoli.jpg',
    			'img/products/thumbnails/Tell Tale Party Nuts.jpg',
				'img/products/thumbnails/Tell Tale Fresh Lima Beans.jpg',
				'img/products/thumbnails/Tell Tale Asparagus.jpg',
				'img/products/thumbnails/Ebony Fuji Apples.jpg',
				'img/products/thumbnails/Ebony Garlic.jpg',
				'img/products/thumbnails/Ebony Baby Onion.jpg',
				'img/products/thumbnails/Ebony Summer Squash.jpg',
				'img/products/thumbnails/Ebony Golden Delcious Apples.jpg',
				'img/products/thumbnails/Ebony Elephant Garlic.jpg',
				'img/products/thumbnails/Ebony Red Delcious Apples.jpg',
				'img/products/thumbnails/Ebony Macintosh Apples.jpg',
				'img/products/thumbnails/Ebony Potatos.jpg',
				'img/products/thumbnails/Ebony Green Pepper.jpg',
				'img/products/thumbnails/Ebony Tangerines.jpg',
				'img/products/thumbnails/Ebony Squash.jpg',
				'img/products/thumbnails/Ebony Mushrooms.jpg',
				'img/products/thumbnails/Ebony Cauliflower.jpg',
				'img/products/thumbnails/Ebony Walnuts.jpg',
				'img/products/thumbnails/Ebony Mixed Nuts.jpg',
				'img/products/thumbnails/Ebony Limes.jpg',
				'img/products/thumbnails/Ebony Mandarin Oranges.jpg',
				'img/products/thumbnails/Ebony Lemons.jpg',
				'img/products/thumbnails/Ebony Dried Mushrooms.jpg',
				'img/products/thumbnails/Ebony Cantelope.jpg',
				'img/products/thumbnails/Ebony Prepared Salad.jpg',
    			'img/products/thumbnails/Ebony Almonds.jpg',
    			'img/products/thumbnails/Ebony Sweet Onion.jpg',
				'img/products/thumbnails/Ebony Firm Tofu.jpg',
    			'img/products/thumbnails/Ebony Honey Dew.jpg',
				'img/products/thumbnails/Ebony New Potatos.jpg',
    			'img/products/thumbnails/Ebony Onions.jpg',
				'img/products/thumbnails/Ebony Fancy Plums.jpg',
    			'img/products/thumbnails/Ebony Peaches.jpg',
				'img/products/thumbnails/Ebony Corn of the Cob.jpg',
    			'img/products/thumbnails/Ebony Tomatos.jpg',
				'img/products/thumbnails/Ebony Shitake Mushrooms.jpg',
    			'img/products/thumbnails/Ebony Red Pepper.jpg',
				'img/products/thumbnails/Ebony Plums.jpg',
    			'img/products/thumbnails/Ebony Oranges.jpg',
				'img/products/thumbnails/Ebony Sweet Peas.jpg',
    			'img/products/thumbnails/Ebony Lettuce.jpg',
				'img/products/thumbnails/Ebony Canned Peanuts.jpg',
    			'img/products/thumbnails/Ebony Beets.jpg',
				'img/products/thumbnails/Ebony Broccoli.jpg',
    			'img/products/thumbnails/Ebony Party Nuts.jpg',
				'img/products/thumbnails/Ebony Fresh Lima Beans.jpg',
				'img/products/thumbnails/Ebony Asparagus.jpg',
				'img/products/thumbnails/Tri-State Fuji Apples.jpg',
				'img/products/thumbnails/Tri-State Garlic.jpg',
				'img/products/thumbnails/Tri-State Baby Onion.jpg',
				'img/products/thumbnails/Tri-State Summer Squash.jpg',
				'img/products/thumbnails/Tri-State Golden Delcious Apples.jpg',
				'img/products/thumbnails/Tri-State Elephant Garlic.jpg',
				'img/products/thumbnails/Tri-State Red Delcious Apples.jpg',
				'img/products/thumbnails/Tri-State Macintosh Apples.jpg',
				'img/products/thumbnails/Tri-State Potatos.jpg',
				'img/products/thumbnails/Tri-State Green Pepper.jpg',
				'img/products/thumbnails/Tri-State Tangerines.jpg',
				'img/products/thumbnails/Tri-State Squash.jpg',
				'img/products/thumbnails/Tri-State Mushrooms.jpg',
				'img/products/thumbnails/Tri-State Cauliflower.jpg',
				'img/products/thumbnails/Tri-State Walnuts.jpg',
				'img/products/thumbnails/Tri-State Mixed Nuts.jpg',
				'img/products/thumbnails/Tri-State Limes.jpg',
				'img/products/thumbnails/Tri-State Mandarin Oranges.jpg',
				'img/products/thumbnails/Tri-State Lemons.jpg',
				'img/products/thumbnails/Tri-State Dried Mushrooms.jpg',
				'img/products/thumbnails/Tri-State Cantelope.jpg',
				'img/products/thumbnails/Tri-State Prepared Salad.jpg',
    			'img/products/thumbnails/Tri-State Almonds.jpg',
    			'img/products/thumbnails/Tri-State Sweet Onion.jpg',
				'img/products/thumbnails/Tri-State Firm Tofu.jpg',
    			'img/products/thumbnails/Tri-State Honey Dew.jpg',
				'img/products/thumbnails/Tri-State New Potatos.jpg',
    			'img/products/thumbnails/Tri-State Onions.jpg',
				'img/products/thumbnails/Tri-State Fancy Plums.jpg',
    			'img/products/thumbnails/Tri-State Peaches.jpg',
				'img/products/thumbnails/Tri-State Corn of the Cob.jpg',
    			'img/products/thumbnails/Tri-State Tomatos.jpg',
				'img/products/thumbnails/Tri-State Shitake Mushrooms.jpg',
    			'img/products/thumbnails/Tri-State Red Pepper.jpg',
				'img/products/thumbnails/Tri-State Plums.jpg',
    			'img/products/thumbnails/Tri-State Oranges.jpg',
				'img/products/thumbnails/Tri-State Sweet Peas.jpg',
    			'img/products/thumbnails/Tri-State Lettuce.jpg',
				'img/products/thumbnails/Tri-State Canned Peanuts.jpg',
    			'img/products/thumbnails/Tri-State Beets.jpg',
				'img/products/thumbnails/Tri-State Broccoli.jpg',
    			'img/products/thumbnails/Tri-State Party Nuts.jpg',
				'img/products/thumbnails/Tri-State Fresh Lima Beans.jpg',
				'img/products/thumbnails/Tri-State Asparagus.jpg',
				'img/products/thumbnails/High Top Fuji Apples.jpg',
				'img/products/thumbnails/High Top Garlic.jpg',
				'img/products/thumbnails/High Top Baby Onion.jpg',
				'img/products/thumbnails/High Top Summer Squash.jpg',
				'img/products/thumbnails/High Top Golden Delcious Apples.jpg',
				'img/products/thumbnails/High Top Elephant Garlic.jpg',
				'img/products/thumbnails/High Top Red Delcious Apples.jpg',
				'img/products/thumbnails/High Top Macintosh Apples.jpg',
				'img/products/thumbnails/High Top Potatos.jpg',
				'img/products/thumbnails/High Top Green Pepper.jpg',
				'img/products/thumbnails/High Top Tangerines.jpg',
				'img/products/thumbnails/High Top Squash.jpg',
				'img/products/thumbnails/High Top Mushrooms.jpg',
				'img/products/thumbnails/High Top Cauliflower.jpg',
				'img/products/thumbnails/High Top Walnuts.jpg',
				'img/products/thumbnails/High Top Mixed Nuts.jpg',
				'img/products/thumbnails/High Top Limes.jpg',
				'img/products/thumbnails/High Top Mandarin Oranges.jpg',
				'img/products/thumbnails/High Top Lemons.jpg',
				'img/products/thumbnails/High Top Dried Mushrooms.jpg',
				'img/products/thumbnails/High Top Cantelope.jpg',
				'img/products/thumbnails/High Top Prepared Salad.jpg',
    			'img/products/thumbnails/High Top Almonds.jpg',
    			'img/products/thumbnails/High Top Sweet Onion.jpg',
				'img/products/thumbnails/High Top Firm Tofu.jpg',
    			'img/products/thumbnails/High Top Honey Dew.jpg',
				'img/products/thumbnails/High Top New Potatos.jpg',
    			'img/products/thumbnails/High Top Onions.jpg',
				'img/products/thumbnails/High Top Fancy Plums.jpg',
    			'img/products/thumbnails/High Top Peaches.jpg',
				'img/products/thumbnails/High Top Corn of the Cob.jpg',
    			'img/products/thumbnails/High Top Tomatos.jpg',
				'img/products/thumbnails/High Top Shitake Mushrooms.jpg',
    			'img/products/thumbnails/High Top Red Pepper.jpg',
				'img/products/thumbnails/High Top Plums.jpg',
    			'img/products/thumbnails/High Top Oranges.jpg',
				'img/products/thumbnails/High Top Sweet Peas.jpg',
    			'img/products/thumbnails/High Top Lettuce.jpg',
				'img/products/thumbnails/High Top Canned Peanuts.jpg',
    			'img/products/thumbnails/High Top Beets.jpg',
				'img/products/thumbnails/High Top Broccoli.jpg',
    			'img/products/thumbnails/High Top Party Nuts.jpg',
				'img/products/thumbnails/High Top Fresh Lima Beans.jpg',
				'img/products/thumbnails/High Top Asparagus.jpg'
			]);
		});