
var select = 

(function () {

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





function select ( selector, results ) {
	results = results || [];
  var m, temp, selectors, i, subselector;
	
  if ( typeof selector != 'string' ) return results;

  // 处理分割的问题
  selectors = selector.split( ',' );


  for ( i = 0; i < selectors.length; i++ ) {
    // selectors[ i ] 选择器
    subselector = myTrim( selectors[ i ] );
    // 判断
    if ( support.qsa ) {

      results.push.apply( results, document.querySelectorAll( subselector ) );

    } else if ( m = rbaseselector.exec( subselector ) ) {
      // 捕获到数据了
      if ( m[ 1 ] && ( temp = document.getElementById( m[ 1 ] ) ) ) {
        results.push( temp );
      } else if ( m[ 2 ] ) {
        results.push.apply( results, getByClassName( m[ 2 ] ) );
      } else if ( m[ 3 ] ) {
        results.push.apply( results, document.getElementsByTagName( m[ 3 ] ) ); // selector
      } else if ( m[ 4 ] ) {
        results.push.apply( results, document.getElementsByTagName( m[ 4 ] ) ); // selector
      }
      // 注意: 3 和 4 是可以合并
    }
  }
	
  return results;
}


return select;
})();
