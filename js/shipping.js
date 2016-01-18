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


$(document).ready(function(){
    var viewlist = { 
     "pages" : [
     {
     "label" : "Create Adhoc",
     "url" : "http://localhost:8080/jasperserver-pro/flow.html?_flowId=adhocFlow&resource=/public/Samples/FreshDelivery_Demo/New_Admin_Ad_Hoc_View"
     },
	 {
     "label" : "Library",
     "url" : "http://localhost:8080/jasperserver-pro/flow.html?_flowId=searchFlow&mode=library"
     },  
     {
     "label" : "Report List",
     "url" : "http://localhost:8080/jasperserver-pro/flow.html?_flowId=searchFlow&mode=search&filterId=resourceTypeFilter&filterOption=resourceTypeFilter-reports"
     },
	 {
     "label" : "Home",
     "url" : "http://localhost:8080/jasperserver-pro/flow.html?_flowId=homeFlow"
     } 
         
     ]
    };
    
    var menu = viewlist.pages;
    var length = menu.length;
    
    for(var j = 0; j < length; j++)
    {
        $('#mySelect').append($("<option/>", {
            value: menu[j].url ,
            text: menu[j].label
        }));
    }
    $("#mySelect" ).change(function() {
            $("#myFrame").attr("src", $("#mySelect").val());  
            console.log("myFrame changed to: " + $( "#mySelect" ).val());
        });
 
});

visualize({
    auth: {
        name: "jasperadmin",
        password: "jasperadmin",
        organization: "organization_1"
    }
}, function (v) {
    console.log("Viz - login");    
    // Load the Repo seach by default..
    $('<iframe>', {
       src: 'http://localhost:8080/jasperserver-pro/flow.html?_flowId=adhocFlow&resource=/public/Samples/FreshDelivery_Demo/New_Admin_Ad_Hoc_View',
       id:  'myFrame',
       frameborder: 0,
       scrolling: 'no'
   }).appendTo('#adhoc');

    console.log("Iframe loaded with: " + document.getElementById('myFrame').src ); 
    
});

