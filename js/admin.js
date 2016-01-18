/*
 * ========================================================================
 * admin.js : v0.8.0
 *
 * ========================================================================
 * Copyright 2014
 * Authors: Daniel Petzold
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

function handleError(e) {
    alert(e);
}

visualize({
    auth: {
        name: "superuser",
        password: "superuser"
    }
}, function (v) {
    var initialParams = {
        Country: ["USA", "Canada", "Mexico"]
    };
    
    var dashboard = v.dashboard({
        resource: "/public/Samples/Dashboards/Admin_Inventory_Dashboard",
        container: "#container",
        error: handleError,
        params: initialParams,
        success: function() {
            $("button").prop("disabled", false);
            buildParamsInput();
        }
    });
    
    
    function buildParamsInput() {
        var params = dashboard.data().parameters;

        for (var i = params.length-1; i >= 0; i--) {
            var $el = $("<div><select type='select' class='form-control admin-select' data-paramId='" + params[i].id + "'><option value='all'>ALL COUNTRIES</option><option value='USA'>USA</option><option value='Canada'>Canada</option><option value='Mexico'>Mexico</option></select></div>");
            
            $(".input").prepend($el);
            
            $el.find("input").val(dashboard.params()[params[i].id]);
        }
    }
    
    
    $("button").on("click", function() {
        var params = {};
        
        $("[data-paramId]").each(function() {
            params[$(this).attr("data-paramId")] = $(this).val().indexOf("[") > -1 ? JSON.parse($(this).val()) : [$(this).val()];    
        });
        
        $("button").prop("disabled", true);
        
        dashboard.params(params).run()
            .fail(handleError)
            .always(function() { $("button").prop("disabled", false); });
    });
});


