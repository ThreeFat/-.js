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
      this.events = {};
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


// 样式操作
$.extend({
  getStyle: function ( o, name ) {
    if ( o.currentStyle ) {
      return o.currentStyle[ name ];
    } else {
      return window.getComputedStyle( o )[ name ];
    }
  }
});

$.fn.extend({    
  css1: function ( option ) {

    return this.each(function () {
      for ( var k in option ) {
        this.style[ k ] = option[ k ];
      }
    });

  },
  css: function ( option ) { // name, value
    var len = arguments.length,
      args = arguments;
    if ( len === 2 ) {
      // 判断键值
      if ( $.isString( args[ 0 ] ) && 
         $.isString( args[ 1 ] ) ) {
        return this.each(function () {
          this.style[ args[ 0 ] ] = args[ 1 ];
        });
      }

    } else if ( len === 1 ) {
      if ( $.isString( option ) ) {
        // 获取样式
        return this[ 0 ].style[ option ] || 
            $.getStyle( this[ 0 ], option );

      } else if ( typeof option == 'object' ) {
        return this.each(function () {
          for ( var k in option ) {
            this.style[ k ] = option[ k ];
          }
        });
      }


    }

    return this;
  },
  addClass: function ( name ) {

    // 判断有没有
    // += ' ' + name
    return this.each(function () {
      // this 表示 每一个 dom 元素
      var classTxt = this.className;

      // undefined, null, ""
      if ( classTxt ) {

        if ( (' ' + classTxt + ' ').indexOf( ' ' + name + ' ' ) == -1 ) {
          // 正常跳出, 就是没有找到该样式
          this.className += ' ' + name;
        } else {
          // 中间跳出, 已经存在该类样式
        }

      } else {
        // 没有
        this.className = name;
      }


    });

  },
  removeClass: function ( name ) {
    return this.each(function () {
      var classTxt = ' ' + this.className + ' ';
      var rclassName = new RegExp( ' ' + name + ' ', 'g' );
      this.className = classTxt
              .replace( rclassName, ' ' )
              .replace( /\s+/g, ' ')
              .trim();
    });

  },
  hasClass: function ( name ) {
    for ( var i = 0; i < this.length; i++ ) {
      if ( (' ' + this[ i ].className + ' ')
          .indexOf( ' ' + name + ' ' ) != -1 ) {
        return true;
      }
    }
    return false;
  },
  toggleClass: function ( name ) {
    if ( this.hasClass( name ) ) {
      this.removeClass( name );
    } else {
      this.addClass( name );
    }
    return this;
  }

});


// 属性方法操作
$.fn.extend({
  attr: function ( name, value ) {
    if ( value ) {
      if ( $.isString( name ) && $.isString( value ) ) {
        return this.each(function () {
          // this.属性 = 值
          this.setAttribute( name, value );
        });
      }
    } else {
      if ( $.isString( name ) ) {
        return this[ 0 ].getAttribute( name );
      }
    }
    return this;
  },
  prop: function ( name, value ) {
    if ( value ) {
      if ( $.isString( name ) && $.isString( value ) ) {
        return this.each(function () {
          this[ name ] = value
        });
      }
    } else {
      if ( $.isString( name ) ) {
        return this[ 0 ][ name ];
      }
    }
    return this;
  },
  val: function ( value ) {
    return this.attr( 'value', value );
  },
  html: function ( html ) {
    return this.prop( 'innerHTML', html );
  },
  text: function ( txt ) {
    if ( txt ) {
      // 传入了内容. 应该插入
      // 保持链式
      return this.each( function () {
        this.innerHTML = ''; // removeChild 循环
        this.appendChild( document.createTextNode( txt + '' ) );
      });
    } else {
      // 没哟传入内容要获得内容
      // 遍历节点的子元素, 并将文本节点 ( nodeType == 3) 加入到数组中
      var arr = [];
      getTxt( this[ 0 ], arr );
      return arr.join( ' ' );
    }

    return this;

    function getTxt( node, list ) {
      var arr = node.childNodes;
      for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[ i ].nodeType === 3 ) {
          list.push( arr[ i ].nodeValue );
        }
        if ( arr[ i ].nodeType === 1 ) {
          getTxt( arr[ i ], list );
        } 
      }
    }
  }
});


// 动画处理

$.Easing = {
  line: function ( x, t, b, c, d ) {
    var speed = ( c - b ) / d;
    return speed * t;
  },
  change: function ( x, t, b, c, d ) {
    return Math.log( t + 1 ) / Math.log( d + 1 ) * ( c - b );
  },
  easeInQuad: function (x, t, b, c, d) {
    return c*(t/=d)*t + b;
  },
  easeOutQuad: function (x, t, b, c, d) {
    return -c *(t/=d)*(t-2) + b;
  },
  easeInOutQuad: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
  },
  easeInCubic: function (x, t, b, c, d) {
    return c*(t/=d)*t*t + b;
  },
  easeOutCubic: function (x, t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
  },
  easeInOutCubic: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  },
  easeInQuart: function (x, t, b, c, d) {
    return c*(t/=d)*t*t*t + b;
  },
  easeOutQuart: function (x, t, b, c, d) {
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
  },
  easeInOutQuart: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
    return -c/2 * ((t-=2)*t*t*t - 2) + b;
  },
  easeInQuint: function (x, t, b, c, d) {
    return c*(t/=d)*t*t*t*t + b;
  },
  easeOutQuint: function (x, t, b, c, d) {
    return c*((t=t/d-1)*t*t*t*t + 1) + b;
  },
  easeInOutQuint: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
    return c/2*((t-=2)*t*t*t*t + 2) + b;
  },
  easeInSine: function (x, t, b, c, d) {
    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
  },
  easeOutSine: function (x, t, b, c, d) {
    return c * Math.sin(t/d * (Math.PI/2)) + b;
  },
  easeInOutSine: function (x, t, b, c, d) {
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  },
  easeInExpo: function (x, t, b, c, d) {
    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  },
  easeOutExpo: function (x, t, b, c, d) {
    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  },
  easeInOutExpo: function (x, t, b, c, d) {
    if (t==0) return b;
    if (t==d) return b+c;
    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc: function (x, t, b, c, d) {
    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
  },
  easeOutCirc: function (x, t, b, c, d) {
    return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
  },
  easeInOutCirc: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
  },
  easeInElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
  },
  easeOutElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
  },
  easeInOutElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
  },
  easeInBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c*(t/=d)*t*((s+1)*t - s) + b;
  },
  easeOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
  },
  easeInOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158; 
    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
  },
  easeOutBounce: function (x, t, b, c, d) {
    if ((t/=d) < (1/2.75)) {
      return c*(7.5625*t*t) + b;
    } else if (t < (2/2.75)) {
      return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
    } else if (t < (2.5/2.75)) {
      return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
    } else {
      return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
    }
  }

};


$.fn.extend({

  animate: function ( props, dur, easing, fn ) {
    // 假设 props 就是 x 和 y
    var x = this[ 0 ], 
      isOver = false,
      that = this;
    // 1. 获得当前位置与时间
    var startx = parseInt( x.style.left || x.offsetLeft ),
      starty = parseInt( x.style.top  || x.offsetTop ),

      startTime = +new Date();

      // 2. 开启计时器
    this.intervalId = setInterval(function () {
      // 3. 获得已经过的时间
      var t = (+new Date) - startTime;

      if ( t >= dur ) {
        clearInterval( intervalId );
        t = dur;
        isOver = true;
      }

      // 4. 实现欢动
      easing = easing || 'change';

      // 5. 设置属性值
      x.style.left = startx + 
        $.Easing[ easing ]( null, t, startx, parseInt(props[ 'left' ]), dur )
        + 'px';
      x.style.top = starty + 
        $.Easing[ easing ]( null, t, starty, parseInt(props[ 'top' ]), dur )
        + 'px';



      if ( isOver && fn ) {
        fn.apply( that );
      }
    }, 20 );


  },
  intervalId: null,
  stop: function () {
    clearInterval( this.intervalId );
    this.intervalId = null;
  }
});









window.$ = window.I = $;



})( window )



















