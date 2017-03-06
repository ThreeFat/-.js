(function ( window, undefined ) {


var arr = [],
    push = arr.push,
    slice = arr.slice;

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
			return; // this
		}


		if ( typeof html === 'function' ) {

      // 如果是一个函数, 那么就将 函数绑定到 onload 上, 然后返回
      // onload = html;

      // 首先判断是否已经有函数
      var oldFn = onload;
      if ( typeof oldFn === 'function' ) {
        onload = function () {
          oldFn();
          html();
        };
      } else {
        onload = html;
      }


      return;
		}



    if ( html && html.type === '$' ) {
      // 是一个 $ 对象
      // 将传入的 $ 对象所有的元素都加到 this 中
      push.apply( this, html );
      this.selector = html.selector;

      this.events = html.events;

      return;
    }




		if ( $.isString( html ) ) {
			if ( /^</.test( html ) ) {
				push.apply( this, parseHTML( html ) );
        // push.apply( this, $.fn.parseHTML( html ) );
			} else {
				// 选择器
				// select( html );
				push.apply( this, $.select( html ) );
        this.selector = html;
			}

		}



    // 判断是不是一个 DOM 对象 
    if ( html.nodeType ) {
      // 是 DOM 对象
      this[ 0 ] = html;
      this.length = 1;
    }


    this.events = {};

	},

  selector: '',   // 表示使用了选择器

  type: '$',

  toArray: function () {
    // var res = [];
    // for ( var i = 0; i < this.length; i++ ) {
    //   res.push( this[ i ] );
    // }
    // return res;

    return slice.call( this, 0 );    
  },
  get: function ( index ) {
    if ( index === undefined ) {
      return this.toArray();
    }
    return this[ index ];
  },
  eq: function ( num ) {
    var dom;
    if ( num >= 0 ) {
      dom = this.get( num );
    } else {
      dom = this.get( this.length + num );
    }
    return this.constructor( dom );
  },

  each: function ( func ) {
    // 将 this 中的每一个 DOM 元素遍历一下
    return $.each( this, func );
  },
  map: function ( func ) {
    return $.map( this, func );
  } 
};

$.fn.init.prototype = $.fn;


// 添加可扩展的方法 extend
$.extend = $.fn.extend = function ( obj ) {
  for ( var k in obj ) {
    this[ k ] = obj[ k ];
  }
};







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




// 添加 each 与 map 功能, 给 $ 构造函数添加静态方法
$.extend({

  each: function ( arr, func ) {
    var i;
    // 在 ES5 中还引入了 Array.isArray 的方法专门来判断数组
    if ( arr instanceof Array || arr.length >= 0) {
      for ( i = 0; i < arr.length; i++ ) {
        func.call( arr[ i ], i, arr[ i ] );
      }
    } else {
      for ( i in arr ) {
        func.call( arr[ i ], i, arr[ i ] );
      }
    }
    return arr;
  },

  map: function ( arr, func ) {
    var i, res = [], tmp;
    if ( arr instanceof Array || arr.length >= 0 ) {
      for ( i = 0; i < arr.length; i++ ) {
        tmp = func( arr[ i ], i );
        if ( tmp != null ) {
          res.push( tmp );
        }
      }
    } else {
      for ( i in arr ){
        tmp = func( arr[ i ], i );
        if ( tmp != null ) {
          res.push( tmp );
        }
      }
    }
    return res;
  } 
});



// DOM 操作
// 工具方法
$.extend({
  prependChild: function ( parent, element ) {
    parent.insertBefore( element, parent.firstChild );
  }
});


// DOM 方法
$.fn.extend({
  appendTo: function ( selector ) {
    var iObj = this.constructor( selector );
    var newObj = this.constructor();
    for ( var i = 0; i < this.length; i++ ) {
      for ( var j = 0; j < iObj.length; j++ ) {
        var temp = 
            i == this.length - 1 && j == iObj.length - 1 
              ? this[ i ] 
              : this[ i ].cloneNode( true );

        [].push.call( newObj, temp );
        iObj[ j ].appendChild( temp );
      }
    }
    return newObj;
  },
  append: function ( selector ) {

    this.constructor( selector ).appendTo( this );

    return this;
  },
  prependTo: function ( selector ) {
    var iObj = this.constructor( selector );
    var newObj = this.constructor();
    for ( var i = 0; i < this.length; i++ ) {
      for ( var j = 0; j < iObj.length; j++ ) {
        var temp = 
            i == this.length - 1 && j == iObj.length - 1 
              ? this[ i ] 
              : this[ i ].cloneNode( true );

        [].push.call( newObj, temp );
        // iObj[ j ].appendChild( temp );
        prependChild( iObj[ j ], temp );
      }
    }
    return newObj;
  },
  prepend: function ( selector ) {
    this.constructor( selector ).prependTo( this );
    return this;
  }
});


// 事件处理
$.fn.extend({
  on: function ( type, fn ) {
    
    if ( !this.events[ type ] ) {
      this.events[ type ] = [];

      var that = this;
      this.each(function () {
        // this 就是 DOM 对象
        var self = this;
        var f = function ( e ) {
          for ( var i = 0; i < that.events[ type ].length; i++ ) {
            // that.events[ type ][ i ](  );
            // 在数组中是方法调用模式, this 就是这个数组, 需要将其指向为 dom 对象
            // 不仅如此, 还需要提供 e
            that.events[ type ][ i ].call( self, e );
          }

        };

        if ( this.addEventListener ) {
          this.addEventListener( type, f );
        } else {
          this.attachEvent( 'on' + type, f );
        }

      });


    }

    this.events[ type ].push( fn );

    return this;
  },
  off: function ( type, fn ) {
    // 删除某些事件
    // 遍历数组, 从数组中删除函数即可
    var arr = this.events[ type ];
    if ( arr ) {
      // 如何从数组中删除数据
      // 获得数组中 fn 的索引
      for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[ i ] == fn ) {
          break;
        }
      }
      if ( i != arr.length ) {
        arr.splice( i, 1 );
      }
    }
    return this;
  }
});


// 其他事件
// click
// $.fn.click = function ( fn ) {

//   this.on( 'click', fn );
// };

$.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
  "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
  "change select submit keydown keypress keyup error contextmenu" ).split( ' ' ) , function ( i, v ) {

    // v 表示的就是名字
    // console.log( v );

    $.fn[ v ] = function ( fn ) {
      this.on( v, fn );
      return this;
    };
    
  });

// hover, toggle
$.fn.extend({

  hover: function ( f1, f2 ) {

    return this
      .mouseover( f1 )
      .mouseout( f2 );

  },
  toggle: function (  ) {
    var i = 0;
    var args = arguments;
    this.on( 'click', function ( e ) {
      // console.log( this );
      args[ i % args.length ].call( this, e );

      i++;
    });

  }

});














window.$ = window.I = $;



})( window )



















