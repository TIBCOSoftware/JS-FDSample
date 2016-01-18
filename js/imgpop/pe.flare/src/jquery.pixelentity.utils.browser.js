(function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false */ 
	/*global jQuery,Image */
	
	$.pixelentity = $.pixelentity || {version: '1.0.0'};
	
	var ua = navigator.userAgent.toLowerCase();
	var iDev = ua.match(/(iphone|ipod|ipad)/) !== null;
	var android = !iDev && ua.match(/android ([^;]+)/);
	if (android) {
		android = android[1].split(/\./);
		android = parseFloat(android.shift() + "." + android.join(""));
	} else {
		android = false;
	}
	var mobile = (iDev || android || ua.match(/(android|blackberry|webOS|opera mobi)/) !== null);

	
	$.pixelentity.browser = {
		iDev: iDev,
		android: android,
		mobile: mobile
	};
	
	
}(jQuery));

		

