(function ( window, undefined ) {



function parseHTML ( html ) {
	var div = document.createElement( 'div' );
	div.innerHTML = html;
	var res = [];
	for ( var i = 0; i < div.childNodes.length; i++ ) {
		res.push( div.childNodes[ i ] );
	}
	return res;
}



function $ ( html ) {

	return new $.fn.init( html );

}

$.fn = $.prototype = {

	constructor: $,

	length: 0,

	init: function ( html ) {
		[].push.apply( this, parseHTML( html ) );
	},

	appendTo: function ( dom ) {
		for ( var i = 0; i < this.length; i++ ) {
			dom.appendChild( this[ i ] );
		}

	}
}

$.fn.init.prototype = $.fn;







window.$ = window.I = $;



})( window )



















