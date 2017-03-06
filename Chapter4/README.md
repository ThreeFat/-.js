## 核心成员
	1> selector 用来存储该 itcast 对象的选择器
	2> toArray 方法
	3> get 方法
	4> each 与 map 方法
	5> eq 方法

## 作为 itcast 的静态方法
	1> 判断类型的系列
	2> each 与 map

## 定义的变量存储数组方法
	1> push
	2> slice


## 操作
1> selector
	凡是使用选择器获得元素来创建的 jq 对象都有 selector 属性
	凡是使用 jq 对象创建 jq 对象都有 该属性
	其实就是为了说明该元素是使用 指定的选择器获取到的.

	我们只需要在使用选择器创建的对象时来添加即可
	在 jq 中还使用 该属性来判断 对象是否为 jq 对象

	我们实现对其简化: 
	1) 提供一个 selector 表示 选择器
	2) 提供一个 type 属性, 存储 'itcast'. 用来表示对象是否为 itcast 类型
2> toArray
	将 jq 对象中的每一个元素取出来组成一个数组返回
	var res = [];
	for ( ... ) {
		res.push( ... )
	}
3> eq 
	1) 如果传入的参数是数字, 根据序号获得元素即可. 而且得到的是 jq 对象.
	2) 如果传入的是负数, 那么使用 length + num 获得元素
4> 回顾一下 jq 中 each 的使用
	$( 'div' ).each( function ( k, v ) {
		this 就是 dom 对象
	})
5> slice
	获得数组的子元素	
	arr.slice( startIndex );	
	arr.slice( startIndex, endIndex );
	拷贝数据获得数组
	arr.slice( 0 )
	将伪数组转换成数组
	[].slice.call( 伪数组, 0 );

## 添加 DOM 操作方法
	appendTo 还不够完善
	1> 该方法应该可以接受多种参数: itcast 对象, dom 对象, 选择器
	2> 没有实现元素链变化的方法
		例如页面中有 2 个 div, 那么下面的代码
		$( '<p>ppppp</p>' ).appendTo( 'div' );
		整个页面中有几个 p 被加上去了呢?
	应该还需要提供
	append
	prepend
	prependTo

## 如果参数是一个字符串的选择器, 那么可以将其转换成 itcast 对象
	如果是一个 itcast 对象 ...
	如果是一个 dom 对象 ...

	可以将 dom 对象, 选择器, itcast 统一

## 如果 appendTo 的目标有多个元素. 那么会将 this 中的数据 多拷贝一份
	然后再一一加入.

	循环嵌套中根据 i 和 j 如何确定是最后一次循环
	i == length - 1
	j == length - 1

## 链式编程
	return this; 
	主要就是通过隐式迭代的方法,将this指针return出来

## append
	appendTo 将自己加到 某一个东西 后
	将一个 itcast 对象加到另一个 itcast 对象的 后面

	I( '...' ).append( '...' )

## prependTo 和 prepend


















