/*
 * ========================================================================
 * shipping.js : v0.8.0
 *
 * ========================================================================
 * Copyright 2014
 * Authors: Daniel Petzold, Mariano Luna
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
	"pages": [{
			"label": "Create Adhoc",
			"url": "?_flowId=adhocFlow&resource=/public/Samples/FreshDelivery_Demo/New_Admin_Ad_Hoc_View&theme=embedded_scdp"
		}, {
			"label": "Library",
			"url": "?_flowId=searchFlow&mode=library&theme=embedded_scdp"
		}, {
			"label": "Report List",
			"url": "?_flowId=searchFlow&mode=search&filterId=resourceTypeFilter&filterOption=resourceTypeFilter-reports&theme=embedded_scdp"
		}, {
			"label": "Home",
			"url": "?_flowId=homeFlow&theme=embedded_scdp"
		}

	]
};


//load the config and get the script for the configured server instance
$.getJSON('./config/config.json', function(data) {
	$.getScript(data.visualizeJS, function() {
		initPage(data.jrsConfig, data.jrsHostname);
	});
});

function initPage(jrsConfig, hostname) {
	visualize({
		auth: jrsConfig.auth
	}, function(v) {

		$(function() {

			//add all of the menu options
			for (var i = 0, l = pageConfig.pages.length; i < l; i++) {
				$('#mySelect').append($("<option/>", {
					value: hostname + pageConfig.pages[i].url,
					text: pageConfig.pages[i].label
				}));
			}

			//embed the initial iframe
			$('<iframe>', {
				src: hostname + pageConfig.pages[0].url,
				id: 'myFrame',
				width: 1160,
				height: 600,
				frameborder: 0,
				scrolling: 'no'
			}).appendTo('#adhoc');

			$("#mySelect").on('change', function() {
				var url = $(this).val();
				if (url === 'Select your view') {
					return
				}
				$("#adhoc iframe").attr('src', url);
			});
		});

	});
}
