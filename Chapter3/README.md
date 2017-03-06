## parseHTML
	在 jq 中有一个创建 DOM 对象的方法? 
	$( '<div></div><div></div><div></div>' )[ 0 ] 或 .get( 0 )

	$( '#d' )

	$( 'html' )

	$( dom )

	$( $obj )

	$( func )

	function $ ( arg ) {
		if ( arg 是 选择器 ) {

		} else if ( arg 是函数 ) {

		} else if ( arg 是 DOM 对象 ) {

		} ...
		...
	}

## 如何实现 parseHTML 函数
	1> 方法的定义( 参数与返回值 )
		参数: 字符串
		返回: DOM 数组
	2> 有两种方法
		第一种方法使用 createElement
		第二种方法使用 innerHTML 技巧

## 两种创建元素的办法的性能对比
	需求: 创建 10000 个 div 并设置其样式与内容
	组织代码的元素要注意利用内存数据提高性能

## 实现将一个 html 的字符串转换成 html dom 对象的办法
	'<div>div</div>'
	假设有一个 div 作为容器, 只需要将 该字符串 赋值给 div.innerHTML 即可
	然后再 遍历 childNodes 即可

## 假定 parseHTML 就是 $
	在 jq 中 创建元素后是需要添加到 dom 中
	$( '<div>div</div>' ).appendTo( document.body );

	我们应该让其返回值带有一个 appendTo 的方法, 并且该方法允许将自己中存储
	的 DOM 对象一一的添加到 参数表示的 DOM 对象中去.

	这里其实只是 parseHTML, 并非真正的 $ 方法. 因此实际上是 $ 方法创建
	了 DOM 数组的对象. 而且该数组应该有很多的方法.

	function $ ( html ) {

		var obj = parseHTML( html );

		obj.appendTo = function ( dom ) {};

	}

## 框架结构的搭建
	不应该给数组提供新的成员
	无法实现复用

	实际上是应该有一个构造函数创建一个对象, 该对象应该是一个 伪数组
	而由于有构造函数, 那么他就有原型, 所有的方法应该加到原型中

	function $ ( html ) {

		return new F( html );

	}


	functiuon F( html ) {
		push.apply( this, parseHTML( html ) );
	}
	F.prototype = {
		length: 0,
		appendTo: function ( dom ) {}
	}


## jq 中封装的更加完整

	function $ ( ... ) {
		new F( ... )
	}
	// 将所有的功能放到了 F 的 prototype 中
	// 那么如果需要会框架进行扩展, 需要引两个名字到外面
	// 一个是 $, 一个是 F
	// 增加新的功能就是 
	F.prototype.新方法 = function () { ... }

	// jq 将 F 替换为 $ 的原型属性中的一个方法

	function $ () {
		return new $.prototype.init( ... );
	}
	$.prototype = {
		init: function ( ... ) {

		}
	}

	// 新问题出现了
	// 如何为其扩展
	// 在 jq 中多加一个方法是利用 给 $.prototype 添加方法来实现的
	// 问题: 现在给 $.prototype 添加方法, 可以让当前对象使用该方法吗?

	// 对象是被 $.prototype.init 所创建的, 因此只需
	// 要让 $.prototype.init.prototype 与 $.prototype 指向相同即可


## 给 $.prototype 取一个别名, 为了更方便的使用.
	-> fn


## 在 jq 中 $() 中可以使用什么参数
	1> 函数: onload 事件
	2> 字符串: 选择器, html 字符串
	3> DOM 对象
	4> jq 对象


	假定现在只考虑 传入的是 html 字符串或 选择器
	我们需要修改的代码就是 init 函数

	if ( 参数是函数 ) {

	}

	if ( 参数是 DOM 对象 ) {

	}

	if ( 参数 是 字符串 ) {
		if ( 是 html 字符串 ) {
			parseHTML
		} else {
			select
		}
	}

##  给 $ 这个函数对象添加各种方法
	给 $.prototype 这个原型添加各种方法

	mix 就是将一个对象中的成员全部加到另一个对象中

	// 1
	$.isString = function () {} 
	$.isFunction = function () {}

	// 2
	$.extend({
		isString: function() {},
		isFunction: function () {}
	});

	$.fn.extend( {} );





