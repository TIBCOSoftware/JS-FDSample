(function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false */ 
	/*global jQuery,setTimeout,location,Froogaloop */

	$.pixelentity = $.pixelentity || {version: '1.0.0'};
	
	if ($.pixelentity.vimeo) {
		return;
	}
	
	var playerID=0;
	
	function VimeoPlayer(target,conf) {
		
		var self = this;
		var player;

		function start() {
			playerID++;
			
			var iframe = $('<iframe id="pe_vimeo_player'+playerID+'" src="http://player.vimeo.com/video/'+conf.videoId+'?autoplay='+(conf.playerVars.autoplay ? 1 : 0)+'&loop='+(conf.playerVars.loop ? 1 : 0)+'&api=1&player_id=pe_vimeo_player'+playerID+'&origin='+location.href.match(/:\/\/(.[^\/]+)/)[1]+'" width="'+conf.width+'" height="'+conf.height+'" frameborder="0"></iframe>')[0];
			$(target).append(iframe);
			player = new Froogaloop(iframe);
			player.addEvent("ready",ready);
			setTimeout(ready,4000);
		}
		
		
		function ready() {
			if (player) {
				player.removeEvent("ready",ready);
				$(self).trigger("video_ready.pixelentity");
				player.addEvent("finish",ended);
			}
		}
		
		function ended() {
			$(self).trigger("video_ended.pixelentity");
		}
		
		$.extend(self, {
			destroy: function() {
				if (player) {
					player.removeEvent("ready",ready);
					player.removeEvent("finish",ended);
					$(player.element).remove();
					delete player.element;
					player = undefined;
				}
				self = undefined;
			}
		});
		
		start();
	}
	
	$.pixelentity.vimeo = function(callback) {
		callback(VimeoPlayer);
	};
	
}(jQuery));