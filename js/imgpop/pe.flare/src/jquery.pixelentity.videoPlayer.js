(function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
	/*global jQuery,setTimeout,projekktor,location,setInterval,YT,clearInterval */

	$.pixelentity = $.pixelentity || {version: '1.0.0'};
	
	function getInfo(url,formats,poster,size) {
		var result, type, id, i,w = false,h = false;
		
		url = url ? url : "";
		
		for (var filter in types) {
			if (typeof filter === "string" ) {
				result = url.match(types[filter]);
				if (result && result.length > 0) {
					type = filter;
					id = result[2];
					poster = posters[type] ? posters[type].replace("$ID",id) : "";
					break;
				}	
				
			}
		}
		
		// no know source found, see if local video
		if (!id) {
			var src = url.match(local);
			if (src) {
				type = "local";
				id = [src[0]];
				if (formats) {
					formats = formats.split(",");
					for (i=0;i<formats.length;i++) {
						id.push(src[1]+formats[i]);
					}
				}
			} else {
				id = false;
			}
		}
		
		if (size) {
			var token = size.split(/x| |,/);
			w = parseInt(token[0],10) || 0;
			h = parseInt(token[1],10) || 0;
		}
		
		return {
			video: id,
			videoType: type,
			videoPoster: poster,
			videoW : w,
			videoH : h
			
		};
	}

	
	$.pixelentity.videoplayer = {	
		conf: { 
			autoPlay: false,
			responsive: false,
			api: false
		},
		getInfo: getInfo
	};
	
	var instances = [];
	
	var types = {
			vidly: /http:\/\/(vid.ly)\/([\w|\-]+)/i,
			youtube: /http:\/\/(www.youtube.com\/watch\?v=|youtube.com\/watch\?v=|youtu.be\/)([\w|\-]+)/i,
			vimeo: /http:\/\/(vimeo\.com|www\.vimeo\.com)\/([\w|\-]+)/i
		};
	
	var posters = {
			vidly: "http://cf.cdn.vid.ly/$ID/poster.jpg",
			youtube: "http://img.youtube.com/vi/$ID/0.jpg",
			vimeo: "http://vimeo.com/api/v2/video/$ID.json?callback=?"
		};
	
	var local = /(.+[^w])(mp4|webm|ogv)$/i;
	
	function PeVideoPlayer(target, conf) {
		var preview,w,h,type,id,poster;
		var container;
		var player = false;
		var instanceID;
		
		
		
		function start() {
			var info = getInfo(target[0].href,target.attr("data-formats"),target.attr("data-poster"),target.attr("data-size"));
			
			if (info.video) {
				id = info.video;
				type = info.videoType;
				poster = info.videoPoster;
			} else {
				return;
			}
			
			if (info.videoW !== false) {
				target.css({
					width: info.videoW,
					height: info.videoH
				});
			}
			
			/*
			for (var filter in types) {
				if (typeof filter === "string" ) {
					result = url.match(types[filter]);
					if (result && result.length > 0) {
						type = filter;
						id = result[2];
						poster = posters[type] ? posters[type].replace("$ID",id) : "";
						break;
					}	
					
				}
			}
			
			// no know source found, see if local video
			if (!id) {
				var src = url.match(local);
				if (src) {
					type = "local";
					id = [src[0]];
					var formats = target.attr("data-formats");
					if (formats) {
						formats = formats.split(",");
						for (i=0;i<formats.length;i++) {
							id.push(src[1]+formats[i]);
						}
					}
				} else {
					return;
				}
			}
			
			if (target.attr("data-size")) {
				var token = target.attr("data-size").split(/x| |,/);
				w = parseInt(token[0],10) || 0;
				h = parseInt(token[1],10) || 0;
				target.css({
					width: w,
					height: h
				});
			}*/
			
			
			w = info.videoW || target.width();
			h = info.videoH || target.height();
			
			var icon = $('<span class="largePlay"></span>');
			
			if (conf.responsive) {
				
				container = $("<div/>").fadeTo(0,0);
				
				target
					.append(icon)
					.removeAttr("href")
					.append(container)
					.wrap('<div class="videoWrapper sixteenBYnine '+info.videoType+'"></div>')
					.addClass("peActiveWidget")
					.bind("enable.pixelentity ",enable)
					.bind("disable.pixelentity ",disable)
					.bind("click",play);
			} else {
				target
					.append(icon)
					.wrap('<div style="position: relative; overflow: hidden"></div>')
					.addClass("peActiveWidget")
					.bind("enable.pixelentity ",enable)
					.bind("disable.pixelentity ",disable)
					.bind("click",play);
				
				icon.css({
					left: (w-icon.width()) >> 1,
					top: (h-icon.height()) >> 1
				});
				
				container = $("<div/>").css({
					"position": "absolute",
					"z-index": 2,
					"display": "none",
					"width": w+"px",
					"height": h+"px"
				});
				
				target.parent().prepend(container);
				
			}
			
			
			
			var img = target.children("img:eq(0)");
			
			if (img.length > 0) {
				preview = img;
				poster = img.attr("src");
				posterLoaded();
			} else if (poster) {
				if (type == "vimeo") {
					$.getJSON(poster,vimeoPosterUrlLoaded);
				} else {
					getPoster();
				}
			} else if (target.attr("data-poster")) {
				poster = target.attr("data-poster");
				getPoster();
			}
			
			if ($.pixelentity.browser.mobile || conf.autoPlay) {
				enable();
			}
			
		} 
		
		function vimeoPosterUrlLoaded(data) {
			poster = (data && data[0] && data[0].thumbnail_large) || false;
			if (poster) {
				getPoster();
			}
		}
		
		function getPoster() {
			preview = $("<img/>");
			preview.fadeTo(0,0).css("opacity",0).attr("data-src",poster);
			target.append(preview);
			$.pixelentity.preloader.load(preview,posterLoaded);
		}
		
		function posterLoaded() {
			
			if (conf.responsive) {
				//preview.width("100%").height("100%").fadeTo(300,1);
				preview.width("100%").fadeTo(300,1);
				return;
			}
			
			var iw = preview[0].width || preview.width();
			var ih = preview[0].height || preview.height();
		
			var scaler = $.pixelentity.Geom.getScaler(
				"fillmax",
				"center",
				"center",
				w,
				h,
				iw,
				ih
				
			);
			
			preview.transform(scaler.ratio,scaler.offset.w,scaler.offset.h,w,h,true);
			preview.fadeTo(300,1);
		}
		
		function play(e) {
			if (player) {
				return false;
			}
			
			if (!$.pixelentity.browser.mobile) {
				for (var i=0;i<instances.length;i++) {
					if (i != instanceID) {
						instances[i].disable();
					}
				}
			}
			
			container.show().fadeTo(0,0);
			player = container.peVideo({
				api: true,
				useVideoTag: conf.responsive && $.pixelentity.browser.mobile,
				//useVideoTag: true,
				width: conf.responsive ? "100%" : w,
				height: conf.responsive ? "100%" : h,
				type    : type,
				videoId : id,
				poster:poster,
				hd: true,
				autoPlay:true,
				loop:true
			});
			player.one("video_ready.pixelentity",show);
			
			// for testing
			//setTimeout(disable,3000);
			
			return false;
		}
		
		function show() {
			container.fadeTo(500,1);
		}
		
		function stop() {
		}
		
		function enable() {
			if (!player && ($.pixelentity.browser.mobile || conf.autoPlay)) {
				play();
			}
		}
		
		function disable() {
			if (player) {
				if (player.destroy) {
					player.destroy();
				}
				player = false;
				container.empty().fadeTo(0,0).hide();
			}
		}
		
		
		$.extend(this, {
			enable: enable,
			disable: disable,
			destroy: function() {
				if (player && player.destroy) {
					player.destroy();
				}
				player = undefined;
				instances.splice(instanceID,1);
				target.data("peVideoPlayer", null);
				target = undefined;
				
			}
		});
		
		instanceID = instances.length;
		instances.push(this);
				
		start();
		
		
	}
	
	// jQuery plugin implementation
	$.fn.peVideoPlayer = function(conf) {
		// return existing instance
		
		var api = this.data("peVideoPlayer");
		
		if (api) { 
			return api; 
		}

		conf = $.extend(true, {}, $.pixelentity.videoplayer.conf, conf);
		
		// install kb for each entry in jQuery object
		this.each(function() {
			api = new PeVideoPlayer($(this), conf);
			$(this).data("peVideoPlayer", api); 
		});
		
		return conf.api ? api: this;		 
	};
	
		
}(jQuery));
