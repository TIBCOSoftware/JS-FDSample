(function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
	/*global jQuery,setTimeout,location,setInterval,YT,clearInterval,clearTimeout,pixelentity,Spinner */
	
	var lb;
	
	if (!$.pixelentity || !(lb = $.pixelentity.lightbox)) {
		return;
	}
	
	function Render(id,w,h) {
		
		var img;
		var iw,ih;
		var loading = false;
		var output = false;
		var conf;
		
		function load(el) {
			conf = el;
			lb.signal("locked",id);
			preload(el);
			return this;
		}
		
		function unlock() {
			lb.signal("unlocked",id);
		}

		function resize(nw,nh) {
			w = nw;
			h = nh;
			if (img) {
				var offset = 0;
				if (conf.scale == "fit") {
					offset = 40;
				}
				
				var scaler = $.pixelentity.Geom.getScaler(conf.scale,"center","center",w-offset,h-offset,iw,ih);
				img.transform(
					scaler.ratio,
                    parseInt(scaler.offset.w,10)+offset/2,
					parseInt(scaler.offset.h,10)+offset/2,
					iw,
                    ih,
                    true,
					$.pixelentity.browser.android && $.pixelentity.browser.android < 3 
				);
				
			}
			return this;
		}
		
		function loaded() {
			iw = img[0].naturalWidth || img[0].width || img.width();
			ih = img[0].naturalHeight || img[0].height || img.height();
			lb.signal("loaded",id);
			setTimeout(unlock,500);

		}
		
		function render() {
			if (!output) {
				output = $('<div class="peFlareLightboxRenderImage" />').append(img.addClass(conf.scale));
				img.wrap("<div/>");				
			}
			return output;
		}

		
		function preload(el) {
			loading = true;
			img = $('<img class="singleImage" src="%0"/>'.format(el.resource));
			lb.addToBuffer(img);
			$.pixelentity.preloader.load(img,loaded);
		}
		
		function destroy() {
			img = undefined;
			if (output) {
				output.detach();
				output = undefined;				
			}
			lb.signal("destroy",id);
		}


		$.extend(this, {
			// plublic API
			load: load,
			preload: preload,
			resize: resize,
			render: render,
			isGallery: false,
			destroy: destroy
		});
	}
	
	lb.register(Render,"default");
	
}(jQuery));