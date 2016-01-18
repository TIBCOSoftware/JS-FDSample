(function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false */ 
	/*global jQuery,Image */
	
	
	var a = (new Image()).style,b = 'ransition',c,t; 

	t = $.support.csstransitions = 
		(c = 't' + b) in a && c ||
		(c = 'webkitT' + b) in a && c || 
		(c = 'MozT' + b) in a && c || 
		(c = 'OT' + b) in a && c ||
		(c = 'MST' + b) in a && c || 
		false;
	
	$.support.csstransitionsEnd = (t == "MozTransition" && "transitionend") || (t == "OTransition" && "oTransitionEnd") || (t && t+"End"); 
		
	
}(jQuery));

		

