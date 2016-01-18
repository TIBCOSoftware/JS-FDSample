// Inital login for admin section/dashboards  
// Note: Like all Javascript password scripts, the user can view valid usernames/passwords and the redirect url simply with View Source.  
// This particular page login is for demonstration purposes only.  

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

var initialurl = 'admin2.html?u='+un+'&p='+pw;
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
