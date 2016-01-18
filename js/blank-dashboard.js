/*
 * ========================================================================
 * blank-dashboard.js : v0.8.0
 *
 * ========================================================================
 * Copyright 2015
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

visualize({
    auth: {
        name: "superuser",
        password: "superuser"
    }
}, function (v) {
    v("#container").dashboard({
        resource: "/public/Samples/FreshDelivery_Demo/22.0_Blank_Starting_Dashboard",
        error: function(e){
            alert(e);
        }
    });
});
    


















