/*
 * ========================================================================
 * visualizeHelper.js : v0.1.0
 * 
 * ========================================================================
 * Copyright 2014
 * Author: Mariano Luna (https://github.com/marianol)
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


/*
 Initialize Visualize.js config and JRSClient object placeholder

 Visualize.js Common config now this can be held here, still each page needs to call the remote visualize.js
  scripts still have not found a way to parametrize that so is easy to move the sample form a JRS running in
  a different URL without using awk
 Full Example:
 myConfig = {
     auth: {
         name: "jasperadmin",
         password: "jasperadmin",
         organization:"organization_1",
         locale: "en",
         timezone: "Europe/Helsinki"
     }
 }
 */
jrsConfig =  {
    auth: {
        name: "jasperadmin",
        password: "jasperadmin",
        organization: "organization_1"
    }
};

var JRSClient; // Will be storing my JRS Client object here :)


// Pass config to Visualize
visualize.config(jrsConfig);

/**
 * Create and run report component with provided properties
 * @param {string} uri   - report properties
 * @param {string} container - div name to render the report
 * @param {Object} v - a visualize.js Jasper Client object (JrsClient)
 * @returns {Report} report - instance of Report generated
 */
function renderReport(uri, container, v) {
    return v.report({
        resource: uri,
        container: container,
        /*
        // I'll be setting this event handlers function as needed on the caller, see context-ic.html as an example
        events: {
            changeTotalPages: function(totalPages) {
                if ( typeof reportChangeTotalPages == 'function' ) {
                    reportChangeTotalPages(totalPages);
                }
            }
            reportCompleted: function(status, error) {
                if (status === "ready") {
                    // do something
                } else if (status === "failed") {
                    error && alert(error);
                }
            }
        },

        linkOptions: {
             events: {
                 "click"  : function(evt, link){

                     console.log(evt.target); // prints dom elem which represents link in report
                     console.log(link); // print link's data look in report data schema
                     }
             }
         },
        */
        error: function(err) {
                alert(err.message);
            }
        });

}

/**
 * Render standard Jasper Input Controls IC given the IC object
 * @todo extend this to handle all available IC Types
 *
 * @param {Options} inputParameters   -  inputControls instance
 *
 */
function renderStandardIC(inputParameters) {
    // Only working with single and multi selects now.
    $.each( inputParameters, function( id, inputControl ) {
        // console.log("IC # " + id + " - Label" + inputControl.label + " - Type: " + inputControl.type);

        var element;
        var elementProperties;

        $('#inputName').html(inputControl.label);
        /* Possible JRS IC Types:
         •	bool
         •	singleSelect
         •	singleSelectRadio
         •	multiSelectCheckbox
         •	multiSelect
         •	singleValue
         •	singleValueText
         •	singleValueNumber
         •	singleValueDate
         •	singleValueDatetime
         •	singleValueTime
         */
        switch(inputControl.type)
        {
            case 'singleSelect':
            case 'singleSelectRadio':
                element = '<select/>';
                elementProperties = {
                    'id': inputControl.id,
                    'name': inputControl.id,
                    'type': 'select-one'
                }
                break;
            case 'multiSelectCheckbox':
            case 'multiSelect':
                element = '<select/>'
                elementProperties = {
                    'id': inputControl.id,
                    'name': inputControl.id,
                    'type': 'select-multiple',
                    'multiple' : 'multiple'
                }
                break;
            default:
                element = '<input/>'
                elementProperties = {
                    'id': inputControl.id,
                    'type': inputControl.type
                }
        }
        var sel = $(element , elementProperties ).appendTo( '#inputOptions' );

        // @todo This should change to handle all types of Input Controls
        $.each(inputControl.state.options, function() {
            sel.append(
                        $( '<option />', {
                            'value': this.value,
                            'text': this.label
                        } )
                    );
        });
    });
}


function makeFrame() {
    ifrm = document.createElement("IFRAME");
    ifrm.setAttribute("src", "http://developerfusion.com/");
    ifrm.style.width = 640+"px";
    ifrm.style.height = 480+"px";
    document.body.appendChild(ifrm);

    /*
    // You can also use jQuery
         $('<iframe />', {
             name: 'myFrame',
             id:   'myFrame',
             ...
         }).appendTo('body');
     */


}

