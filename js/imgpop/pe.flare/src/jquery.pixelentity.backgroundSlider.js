(function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
	/*global jQuery,setTimeout,location,setInterval,YT,clearInterval,clearTimeout,pixelentity */
	
	$.pixelentity = $.pixelentity || {version: '1.0.0'};
	
	$.pixelentity.peBackgroundSlider = {	
		conf: {
			api: false,
			wait: false
		} 
	};
	
	function PeBackgroundSlider(target, conf) {
		
		var prevColor,currentColor,currentBW,jwindow;
		var jthis = $(this);
		var loading = 0;
		var align = "center,center".split(/,/);
		var scale = "fillmax";
		var w,h;
		var lock = false;
		var go = false;
		
		// init function
		function start() {
			jwindow = $(window);
		}

		
		function load(color,bw) {
			
			go = lock = false;
			
			if (currentColor) {
				prevColor = currentColor.removeClass("peCurrentColor").addClass("pePrevColor");
			}
			
			loading = color ? 1 : 0;
			loading += bw ? 1 : 0;

			jthis.triggerHandler("loading.pixelentity");

			var firefox = $.browser.mozilla;
			
			if (color) {
				currentColor = $("<img/>").addClass("peCurrentColor").attr("data-src",color);
				if (firefox) {
					currentColor.css("background-color","rgba(255,255,255,.01)");
				}
				target.append(currentColor.fadeTo(0,0)[0]);
				$.pixelentity.preloader.load(currentColor,imageLoaded);
			} else {
				currentColor = false;
			}

			if (bw) {
				currentBW = $("<img/>").addClass("peCurrentBW").attr("data-src",bw);
				if (firefox) {
					currentBW.css("background-color","rgba(255,255,255,.01)");
				}
				target.append(currentBW.fadeTo(0,0)[0]);
				$.pixelentity.preloader.load(currentBW,imageLoaded);
			} else {
				currentBW = false;
			}
			
			if (!loading) {
				loaded();
			}

		}
		
		function imageLoaded(c) {
			loading--;
			if (loading === 0) {
				loaded();
			}
		}

		function loaded() {
			if (lock) {
				return;
			}
			lock = true;
			jthis.triggerHandler("loaded.pixelentity");
			if (go || !conf.wait) {
				begin();
			}
		}
		
		function gogo() {
			go = true;
			if (loading === 0) {
				begin();
			}
		}

		
		function begin() {
			getSize(currentColor);
			getSize(currentBW);
			resize();
			if (prevColor) {
				if (currentColor) {					
					prevColor.fadeTo(400,0);
					fadeIn();
				} else {
					prevColor.fadeTo(400,0,fadeIn);
				}
			} else {
				fadeIn();
			}
		}
 

		function resize() {
			w = jwindow.width();
			h = window.innerHeight ? window.innerHeight: jwindow.height();
			resizeImage(currentColor,1.02);
			resizeImage(currentBW,1);
		}
		
		function resizeImage(current,ratio) {
			if (current) {
				var iw = current.data("w");
				var ih = current.data("h");
				var scaler = $.pixelentity.Geom.getScaler(scale,align[1],align[0],w,h,iw,ih);
				current.transform(scaler.ratio*ratio,
								  parseInt(scaler.offset.w+iw*(scaler.ratio-scaler.ratio*ratio)*0.5,10),
								  parseInt(scaler.offset.h+ih*(scaler.ratio-scaler.ratio*ratio)*0.5,10),
								  iw,
								  ih,
								  true,
								  $.pixelentity.browser.android && $.pixelentity.browser.android < 3);
			}
		}
		
		function getSize(current) {
			if (current) {
				current.data("w",current[0].width || current.width() || current[0].naturalWidth);
				current.data("h",current[0].height || current.height() || current[0].naturalHeight);				
			}
		}
		
		
		function fadeIn() {
			if (currentBW) {
				currentBW.delay(200).fadeTo(800,1);
            }
			if (currentColor) {
				currentColor.delay(600).fadeTo(1200,1,complete);			
			} else {
				complete();
			}
		}
		
		function complete() {
			if (prevColor) {
				prevColor.remove();
				prevColor = false;
			}
			if (currentBW) {
				currentBW.remove();
				currentBW = false;
			}
			if (jthis) {
				jthis.triggerHandler("complete.pixelentity");				
			}
		}

		function bind() {
			jthis.bind.apply(jthis,arguments);
		}
		
		function unbind() {
			jthis.unbind.apply(jthis,arguments);
		}
		
		function configure(s,a) {
			scale = s;
			align = a.split(/,/);
		}
		
		function destroy() {
			prevColor = currentColor = currentBW = jwindow = jthis = undefined;
			target.data("peBackgroundSlider", null);
			target = undefined;
		}

		
		$.extend(this, {
			// plublic API
			load:load,
			resize:resize,
			gogo:gogo,
			bind:bind,
			unbind:unbind,
			configure:configure,
			destroy: destroy
		});
		
		// initialize
		start();
	}
	
	// jQuery plugin implementation
	$.fn.peBackgroundSlider = function(conf) {
		
		// return existing instance	
		var api = this.data("peBackgroundSlider");
		
		if (api) { 
			return api; 
		}
		
		conf = $.extend(true, {}, $.pixelentity.peBackgroundSlider.conf, conf);
		
		// install the plugin for each entry in jQuery object
		this.each(function() {
			var el = $(this);
			api = new PeBackgroundSlider(el, conf);
			el.data("peBackgroundSlider", api);
		});
		
		return conf.api ? api: this;		 
	};
	
}(jQuery));