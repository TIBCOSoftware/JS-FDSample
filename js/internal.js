		var masterReport;
		var loggedInUser;
        var usersObject = {"users": [
            {"userName":"jasperadmin", "password":"jasperadmin", "roles":"Ext_User", "orgId":"organization_1", "expireTime":"blue", "region":"East", "level":"1"},
            {"userName":"CaliforniaUser", "password":"CaliforniaUser", "roles":"Ext_User", "orgId":"organization_1", "expireTime":"blue", "region":"West", "level":"2"},
            {"userName":"Sue", "password":"password", "roles":"Ext_Mgr", "orgId":"organization_1", "expireTime":"blue", "region":"North", "level":"3"},
            {"userName":"Beth", "password":"password", "roles":"Ext_Mgr", "orgId":"organization_1", "expireTime":"blue", "region":"South", "level":"4"},
            {"userName":"Pat", "password":"password", "roles":"Ext_User", "orgId":"organization_1", "expireTime":"blue", "region":"North", "level":"5"}
            ]
        };
        
        $( document ).ready(function() {
            
    //Get username passed from url
	var locate = window.location
	document.convert.myurl.value = locate

	var text = document.convert.myurl.value
	
	function delineate(str){
		theleft = str.indexOf("=") + 1;
		theright = str.lastIndexOf("&");
		return(str.substring(theleft, theright));
	}
	var username = delineate(text)
	
	//Get password passed from last url
	function delineate2(str)
	{
		point = str.lastIndexOf("=");
		return(str.substring(point+1,str.length));
	}
	
	var password = delineate2(text)
	
    var un = username;
    var pw = password;
                
    var internalurl = 'internal.html?u='+un+'&p='+pw;
    

                $.each( usersObject, function( data ) {
                    $.each(this,function(index,user){

                        if (user.userName == un & user.password == pw ){
                            loggedInUser = user;
                            
                            visualize({
                                auth: {
                                    name: user.userName,
                                    password: user.password
                                }
                            }, function (v) {

                                //render report from provided resource
                                v("#internal1").report({
                                    resource: "/public/Samples/FreshDelivery_Demo/FreshDelivery_Internal_Report",
                                    error: handleError
                                });
                                
                                //show error
                                function handleError(err){
                                    alert(err.message);
                                }

                                $("#logout").click(function () {
                                    v.logout().done(function () {
                                    
                                    });
                                });
                            });
                        }
                    })
                });


            // visualize({
            // auth: {
            //     name: "jasperadmin",
            //     password: "jasperadmin",
            //     organization: "organization_1"
            // }
            // },function(v){
            //     JRSClient = v;
            //     initializeReports();

                

            // });
        });



        // Get my Client Object
        

        function renderReportLink(uri, container, v) {
			 
            return v.report({
                resource: uri,
                container: container,
				
				  linkOptions: {
                    events: {
                        "click"  : function(evt, link){
                            updateProduct(link.parameters.store_country, link.parameters.store_state);
                        }
                    }
                },
				  
                error: function(err) {
                    console.log(err.message);
                }
            });
        }

        function initializeReports() {
            var master = '/public/Samples/FreshDelivery_Demo/Internal1';

            masterReport = renderReportLink(master, '#internal1', JRSClient);
        }
        
	//Changing login credentials        
	var count = 2;
	function validate() {
	var un = document.myform.username.value;
	var pw = document.myform.pword.value;
	var valid = false;

	var unArray = ["jasperadmin", "CaliforniaUser", "User3"];  // as many as you like - no comma after final entry
	var pwArray = ["jasperadmin", "CaliforniaUser", "Pass3"];  // the corresponding passwords;

	for (var i=0; i <unArray.length; i++) {
	if ((un == unArray[i]) && (pw == pwArray[i])) {
	valid = true;
	break;
	}
	}

	var initialurl = 'internal.html?u='+un+'&p='+pw;
	if (valid) {
	window.location = initialurl;
	return false;
	}

	var t = " tries";
	if (count == 1) {t = " try"}

	if (count >= 1) {
	alert ("Invalid username and/or password.");
	document.myform.username.value = "";
	document.myform.pword.value = "";
	}

	}

			 
		
		