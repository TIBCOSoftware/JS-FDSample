(function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
	/*global jQuery,setTimeout,location,setInterval,YT,clearInterval,clearTimeout,pixelentity */
	
	$.pixelentity = $.pixelentity || {version: '1.0.0'};
	
	$.pixelentity.peSimpleThumb = {	
		conf: {
			api: false
		} 
	};
	
	function PeSimpleThumb(target, conf) {
		
		var img;
		
		// init function
		function start() {
			img = $("<img/>").attr("src",target.attr("data-src")).fadeTo(0,0);
			target.append(img);
			$.pixelentity.preloader.load(img,loaded);
		}
		
		function loaded() {
			var iw = img[0].naturalWidth || img[0].width || img.width();
			var ih = img[0].naturalHeight || img[0].height || img.height();
			var scaler = $.pixelentity.Geom.getScaler("fill","center","center",target.width(),target.height(),iw,ih);
			img.transform(
				scaler.ratio,
                parseInt(scaler.offset.w,10),
				parseInt(scaler.offset.h,10),
				iw,
                ih,
                true,
				true 
			);
			
			img.fadeTo(500,1);
			target.addClass("loaded");
			
			target = undefined;
			img = undefined;
		}

		
		$.extend(this, {
			// plublic API
			destroy: function() {
				target.data("peSimpleThumb", null);
				target = undefined;
			}
		});
		
		// initialize
		start();
	}
	
	// jQuery plugin implementation
	$.fn.peSimpleThumb = function(conf) {
		
		// return existing instance	
		var api = this.data("peSimpleThumb");
		
		if (api) { 
			return api; 
		}
		
		conf = $.extend(true, {}, $.pixelentity.peSimpleThumb.conf, conf);
		
		// install the plugin for each entry in jQuery object
		this.each(function() {
			var el = $(this);
			api = new PeSimpleThumb(el, conf);
			el.data("peSimpleThumb", api); 
		});
		
		return conf.api ? api: this;		 
	};
	
}(jQuery));