/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
/*global jQuery,setTimeout,location,setInterval,YT,clearInterval,clearTimeout,pixelentity,ajaxurl */

String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('%'+i, 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};


