(function ( window, undefined ) {


var push = [].push;

function $ ( html ) {

	return new $.fn.init( html );

}

$.fn = $.prototype = {

	constructor: $,

	length: 0,

	init: function ( html ) {
		// [].push.apply( this, parseHTML( html ) );

		if ( html == null || html === '' ) {
			// 结束
			return;
		}


		if ( typeof html === 'function' ) {

		}

		if ( $.isString( html ) ) {
			if ( /^</.test( html ) ) {
				push.apply( this, parseHTML( html ) );
			} else {
				// 选择器
				// select( html );
				push.apply( this, $.select( html ) );
			}

		}
	}
}

$.fn.init.prototype = $.fn;


// 添加可扩展的方法 extend
$.extend = $.fn.extend = function ( obj ) {
  for ( var k in obj ) {
    // if ( k 是 obj 自己提供的方法 ) obj.hasOwnProperty( k )
    this[ k ] = obj[ k ];
  }
}







// select 引擎专门用于搜素元素
var select = 

(function () {


var push = [].push;

// 如果出现了错误那么就需要重写 push
try {
  var div = document.createElement( 'div' );
  div.innerHTML = '<p></p>';
  var arr = [];
  push.apply( arr, div.getElementsByTagName( 'p' ));
} catch ( e ) {

  push = {
    apply: function ( array1, array2 ) {
      for ( var i = 0; i < array2.length; i++ ) {
        array1[ array1.length++ ] = array2[ i ]; 
      }
    }
  };
}



// 正则表达式
var rnative = /\{\s*\[native/;
var rtrim = /^\s+|\s+$/g;
//                          1           2         3     4
var rbaseselector = /^(?:\#([\w\-]+)|\.([\w\-]+)|(\*)|(\w+))$/;






// 基本函数, support 对象, 验证 qsa 与 byclass
var support = {};

support.qsa = rnative.test( document.querySelectorAll + '' );
support.getElementsByClassName = 
	rnative.test( document.getElementsByClassName + '' );
support.trim = rnative.test( String.prototype.trim + '' );
support.indexOf = rnative.test( Array.prototype.indexOf + '' );






// 基本方法
function getByClassName ( className, node ) {
  node = node || document;
  var allElem, res = [], i;

  if ( support.getElementsByClassName ) {
    return node.getElementsByClassName( className );
  } else {
    allElem = node.getElementsByTagName( '*' );
    for ( i = 0; i < allElem.length; i++ ) {
      if ( allElem[ i ].className === className ) {
        res.push( allElem[ i ] );
      }
    }
    return res;
  }
}

// 自定义实现 trim 方法
var myTrim = function ( str ) {
	// 表示两端去空格, 然后返回去除空格的结果
	if ( support.trim ) {
		return str.trim();
	} else {
		// 自定义实现
		return str.replace( rtrim, '' );
	}
}

var myIndexOf = function ( array, search, startIndex ) {
  startIndex = startIndex || 0;
  if ( support.indexOf ) {
    return array.indexOf( search, startIndex );
  } else {
    for ( var i = startIndex; i < array.length; i++ ) {
      if ( array[ i ] === search ) {
        return i;
      }
    }
    return -1;
  }
}


var unique = function ( array ) {
  var resArray = [], i = 0;
  for ( ; i < array.length; i++ ) {
    if ( myIndexOf( resArray, array[ i ] ) == -1 ) {
      resArray.push( array[ i ] );
    }
  }
  return resArray;
} 


function basicSelect ( selector, node ) {
  node = node || document;
  var m, res;
  if ( m = rbaseselector.exec( selector ) ) {
    if ( m[ 1 ] ) { // id
      res = document.getElementById( m[ 1 ] );
      if ( res ) {
        return [ res ];
      } else {
        return [];
      }
    } else if ( m[ 2 ] ) {  // class
      // return node.getElementsByClassName( m[ 2 ] );
      return getByClassName( m[ 2 ], node );
    } else if ( m[ 3 ] ) {
      return node.getElementsByTagName( m[ 3 ] );
    } else if ( m[ 4 ] ) {
      return node.getElementsByTagName( m[ 4 ] );
    }
  }
  return [];
}


function select2 ( selector, results ) {

  results = results || [];

  var selectors = selector.split( ' ' );

  // 假定 'div p .c'

  var arr = [], node = [ document ];


  for ( var j = 0; j < selectors.length; j++ ) {
    for ( var i = 0; i < node.length; i++ ) {
      push.apply( arr, basicSelect( selectors[ j ], node[ i ] ));
    } 
    node = arr;
    arr = [];
  }

  push.apply( results, node );
  return results;

}

function select ( selector, results ) {
	results = results || [];
  var m, temp, selectors, i, subselector;
	
  if ( typeof selector != 'string' ) return results;

  // 表明参数都没有问题, 接下来就是如何选择
  // 首先判断 qsa 是否可用
  // 然后再 一步步的 自己实现
  if ( support.qsa ) {
    push.apply( results, document.querySelectorAll( selector ) );
  } else {
    // 不存在再来考虑自己实现
    selectors = selector.split( ',' );
    // 循环
    for ( i = 0; i < selectors.length; i++ ) {
      subselector = myTrim( selectors[ i ] );
      // 接下来就是 处理 subselector
      if ( rbaseselector.test( subselector ) ) {
        // 基本选择器
        push.apply( results, basicSelect( subselector ) );
      } else {
        // select2 函数
        select2( subselector, results );
      }
    }
  }
  // 返回 result
  return unique( results );
}


return select;
})();

$.select = select;   // 在需要的时候 可以使用第三方的 选择器引擎



// 需要一些判断的方法
$.extend({
  isString: function ( data ) {
    return typeof data === 'string';
  }

});


// DOM 操作的方法
// 将字符串转换为 DOM 对象的函数
var parseHTML = (function () {
	var div = document.createElement( 'div' );
	function parseHTML ( html ) {
		div.innerHTML = html;
		var res = [];
		for ( var i = 0; i < div.childNodes.length; i++ ) {
			res.push( div.childNodes[ i ] );
		}
		div.innerHTML = '';
		return res;
	}
	return parseHTML;
})();

$.fn.extend({
  appendTo: function ( dom ) {
    for ( var i = 0; i < this.length; i++ ) {
      dom.appendChild( this[ i ] );
    }  
  }
});


window.$ = window.I = $;



})( window )



















