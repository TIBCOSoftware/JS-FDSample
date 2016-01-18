(function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
	/*global jQuery,setTimeout,location,setInterval,YT,clearInterval,clearTimeout,pixelentity,Spinner */
	
	var lb;
	
	if (!$.pixelentity || !(lb = $.pixelentity.lightbox)) {
		return;
	}
	
	function Render(id,w,h) {
		
		var slider;
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
		
		function resize(nw,nh) {
			w = nw;
			h = nh;
			if (slider) {
				slider.resize(w,h);
			}
			return this;
		}
		
		function loaded() {
			lb.signal("loaded",id);
		}
		
		function complete() {
			lb.signal("unlocked",id);
		}
		
		function render() {
			setTimeout(gogo,50);
			return output;
		}
		
		function gogo() {
			if (slider) {
				slider.gogo();			
			}
		}

		
		function preload(el) {
			loading = true;
			if (!slider) {
				output = $('<div class="peFlareLightboxRenderGallery" />');
				lb.addToBuffer(output);
				slider = output.peBackgroundSlider({api:true,wait:true});
				slider.bind("loaded.pixelentity",loaded);
				slider.bind("complete.pixelentity",complete);
			}
			slider.load(el.resource,el.bw);
			//slider.configure(el.scale,"center,center");
			slider.configure("fillmax","center,center");
		}
		
		function destroy() {
			
			if (output) {
				output.detach();
				output = undefined;				
			}
			
			if (slider) {
				slider.unbind("loaded.pixelentity",loaded);
				slider.unbind("complete.pixelentity",complete);
				slider.destroy();
				slider = undefined;				
			}
			lb.signal("destroy",id);
		}


		$.extend(this, {
			// plublic API
			load: load,
			preload: preload,
			resize: resize,
			render: render,
			isGallery: true,
			destroy: destroy
		});
	}
	
	lb.register(Render,"shutter");
	
}(jQuery));