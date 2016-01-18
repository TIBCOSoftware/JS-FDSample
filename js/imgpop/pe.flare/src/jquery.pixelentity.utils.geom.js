(function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false */ 
	/*global jQuery,setTimeout */

	$.pixelentity = $.pixelentity || {version: '1.0.0'};

	$.pixelentity.Geom = {
		getScaler: function (scaleMode,halign,valign,w,h,tw,th) {
			
			var info = {};
			
			var rw = w/tw;
			var rh = h/th;
			var r;
			
			// get scale ratio
			if (typeof scaleMode  == 'string') {
				switch (scaleMode) {
					case "fill":
					case "fillmax":
						r = rw > rh ? rw : rh;
						if (scaleMode == "fill") {r = Math.min(1,r);}
					break;
					case "fit":
					case "fitmax":
						r = rw < rh ? rw : rh;
						if (scaleMode == "fit") {r = Math.min(1,r);}
					break;
					case "none":
						r = 1;
					break;
				}
			} else {
				r = scaleMode;
			}
			
			// scale ration
			info.ratio = r;
			
			info.diff = {};
			info.offset = {};
			info.align = {w:halign,h:valign};
			
			// now compute offset with requested alignment
			//with (info) {
			
			var diff = info.diff;
			var offset = info.offset;
			
			diff.w = offset.w = w-tw*r;
			diff.h = offset.h = h-th*r;
			
			switch (halign) {
				case "center":
					offset.w = diff.w / 2;
				break;
				case "left":
					offset.w = 0;
				break;
			}
		
			switch (valign) {
				case "center":
					offset.h = diff.h / 2;
				break;
				case "top":
					offset.h = 0;
				break;
			}
				
			//}
			
			
			// return the scaler object
			return info;
		},
		
		// split a string in object
		splitProps : function(comma,numeric) {
			var token = comma.split(/,/);
			
			return numeric ? { h:parseFloat(token[0]), w:parseFloat(token[1])} : { h:token[0], w:token[1]};
		}
	};
		
}(jQuery));

		

