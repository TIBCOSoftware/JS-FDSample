/*
 * ========================================================================
 * browseCreated.js : v0.8.0
 *
 * ========================================================================
 * Copyright 2018
 * Authors: Sherman Wood
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
			"label": "Create Dashboard",
			"url": "/dashboard/designer.html?decorate=no"
		}
	]
};

var visualize;

app.initializeVisualize(initPage);

function initPage(jrsConfig, v) {
	visualize = v;
	visualize.resourcesSearch({
		folderUri:"/Self_Service",
		recursive: false,
		types: ['dashboard', 'reportUnit', 'adhocDataView'],
		sortBy: 'creationDate',
		limit: 20,
		success: listRepository,
		error: handleError
	});
}

function listRepository(results) {
	/*
	 return { title: aResult.label, key: aResult.uri, resourceType: aResult.resourceType};
	 */
	var $el = $("#resources");
	$el.empty(); // remove old options
	var resultsSize = 0;
	$.each(results, function() {
		$el.append($("<option></option>")
		 .attr("value", this.uri  + '|' + this.resourceType).text(this.label + ' - ' + this.resourceType));
		resultsSize++;
		// Show the first one
		if (resultsSize == 1) {
			display(this.uri, this.resourceType, this.label + ' - ' + this.resourceType);
		}
	});

    $el.change(function() {
		// parse out value
		var parts = this.value.split('|');
		// should be at least 2 parts. take the last part as the resource type
		var resourceType = parts[parts.length - 1];
		var uri = parts.slice(0, parts.length - 1).join('|');
		display(uri, resourceType, $(this).find("option:selected").text());
	});
}

function display(uri, resourceType, description) {
	$('#description').html(description);
	if (resourceType == 'dashboard') {
		visualize.dashboard({
			resource: uri,
			container: "#container",
			error: handleError
		});
	} else if (resourceType == 'reportUnit') {
		visualize.report({
			resource: uri,
			container: "#container",
			error: handleError
		});
	} else if (resourceType == 'adhocDataView') {
		visualize.adhocView({
			resource: uri,
			container: "#container",
			error: handleError
		});
	} else {
		alert('Unknown type: ' + resourceType + ' for URI: ' + uri + '. Can\'t display.');
	}
}

function handleError(e) {
	alert(e);
}