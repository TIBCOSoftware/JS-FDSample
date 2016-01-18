(function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false */ 
	/*global jQuery,setTimeout,WebKitCSSMatrix */

	var origin = "0px 0px";
	// nearest
	var scalingMode = "bilinear";

	/*
		very stripped down version of 
		https://github.com/heygrady/transform/blob/master/README.md
	*/
	
	var rmatrix = /progid:DXImageTransform\.Microsoft\.Matrix\(.*?\)/;
	
	// Steal some code from Modernizr
	var m = document.createElement( 'modernizr' ),
		m_style = m.style;
		
	/**
	 * Find the prefix that this browser uses
	 */	
	function getVendorPrefix() {
		var property = {
			transformProperty : '',
			MozTransform : '-moz-',
			WebkitTransform : '-webkit-',
			OTransform : '-o-',
			msTransform : '-ms-'
		};
		for (var p in property) {
			if (typeof m_style[p] != 'undefined') {
				return property[p];
			}
		}
		return null;
	}
	
	function supportCssTransforms() {
		var props = [ 'transformProperty', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform' ];
		for ( var i in props ) {
			if ( m_style[ props[i] ] !== undefined  ) {
				return true;
			}
		}
		return false;
	}
		
	// Capture some basic properties
	var vendorPrefix			= getVendorPrefix(),
		transformProperty		= vendorPrefix !== null ? vendorPrefix + 'transform' : false,
		transformOriginProperty	= vendorPrefix !== null ? vendorPrefix + 'transform-origin' : false;
	
	// store support in the jQuery Support object
	$.support.csstransforms = supportCssTransforms();
	
	$.support.hw3dTransform = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix());

	// IE9 public preview 6 requires the DOM names
	if (vendorPrefix == '-ms-') {
		transformProperty = 'msTransform';
		transformOriginProperty = 'msTransformOrigin';
	}

	function transform(el,ratio,dx,dy,w,h,noFilter,forceCompat) {
		if ($.support.csstransforms && !forceCompat) {
			var offs;
			
			var unit="px";
			if (w && h && (parseInt(dx,10) != dx || parseInt(dy,10) != dy)) {
				dx=100*dx/w;
				dy=100*dy/h;
				
				dx=parseInt(dx*1000,10)/1000;
				dy=parseInt(dy*1000,10)/1000;
				
				unit="%";
			} else {
				dx = parseInt(dx,10);
				dy = parseInt(dy,10);
			}
			
			if ($.support.hw3dTransform) {
				offs = (dx !== undefined ) ? "translate3d("+dx+unit+","+dy+unit+",0) " : "translateZ(0) ";
			} else {
				offs = (dx !== undefined ) ? "translate("+dx+unit+","+dy+unit+") " : "";
			}
			
			$(el).css(transformOriginProperty,origin).css(transformProperty,offs+"scale("+ratio+")");
			
		} else if (!noFilter && !forceCompat && $.browser.msie) {
			var style = el.style;
			var matrixFilter = 'progid:DXImageTransform.Microsoft.Matrix(FilterType="'+scalingMode+'",M11='+ratio+',M12=0,M21=0,M22='+ratio+',Dx='+dx+',Dy='+dy+')';
			var filter = style.filter || $.curCSS( el, "filter" ) || "";
			style.filter = rmatrix.test(filter) ? filter.replace(rmatrix, matrixFilter) : filter ? filter + ' ' + matrixFilter : matrixFilter;
		} else {
			$(el)
				.width(w*ratio)
				.height(h*ratio)
				.css({
					"margin-left": dx+"px",
					"margin-top": dy+"px"
				});
		}
	}

	$.fn.transform = function(ratio,dx,dy,w,h,noFilter,forceCompat) {
		
		this.each(function() {
			transform(this,ratio,dx,dy,w,h,noFilter,forceCompat);
		});
		
		return this;		 
	};	
		
}(jQuery));

		

