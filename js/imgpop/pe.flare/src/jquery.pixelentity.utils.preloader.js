(function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false */ 
	/*global jQuery,setTimeout */

	$.pixelentity = $.pixelentity || {version: '1.0.0'};
	
	if ($.pixelentity.preloader) {
		return;
	}
	
	function loaded(e) {
		var image = $(e.currentTarget);
		//var loaderInfo = image.data("peUtilsLoader");
		var loaderInfo;
		
		while (image.data("peUtilsLoader") && (loaderInfo = image.data("peUtilsLoader").shift())) {
			if (--loaderInfo.total <= 0) {
				var cb = loaderInfo.callback;
				var target = loaderInfo.target;
				image.unbind("load error",loaded);
				cb(target);
			}
		}
	}
	
	var preloader = $.pixelentity.preloader = {
			load: function (el,callback,noreplace) {
				el = (el instanceof jQuery) ? el : $(el);
				var images = (el[0].tagName.toLowerCase() == "img") ? [el[0]] : el.find("img").get();
			
				var image;
				var list = [];
				var complete;
			
				while ((image = images.shift())) {
					complete = image.complete;
					if (!(image.src && complete && !(image.src.match(/blank.png$/i) !== null && image.getAttribute("data-src")))) {
						list.push(image);
					}
				}
				
				if (list.length > 0) {
					var loaderInfo = {
							target: el,
							callback: callback,
							total: list.length
						};
					while ((image = list.shift())) {
					
						image = $(image);
					
						if (!noreplace && $.browser.msie && image[0].src.match(/blank.png$/i) !== null) {
							image.removeAttr("src");
							image.replaceWith(image.clone());
							if (!image.attr("data-src")) {
								// nothing to be loaded here
								loaderInfo.total--;
								//continue;
							}
						}
				
						if (image.data("peUtilsLoader")) {
							image.data("peUtilsLoader").push(loaderInfo);
						} else {
							image.data("peUtilsLoader",[loaderInfo]);
						}
						
						image
							.one("load error",loaded);
						 
						if (image.attr("data-src")) {
							image.attr("src",image.attr("data-src"));
							image.removeAttr("data-src");
						} else if ($.browser.msie) {
							image.attr("src",image.attr("src"));
						}
						
						image = undefined;
						
					}
				} else {
					callback(el);
				}		
			}
		};
		
}(jQuery));