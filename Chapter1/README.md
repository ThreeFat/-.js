##  简要分析 jq 框架
	jq 是模块化. 是一个以代码集合与功能为中心的模块.
	jq 的整体结构
```
  (function ( window, undefined ) {
		// ...

	})( window );
```	
  1) 为何使用该结构  
	2) 为何传入参数 

	jQuery.extend = jQuery.fn.extend = function( obj ) {
		for ( var k in obj ) {
			this[ k ] = obj[ k ];
		}
	};
	等价于
	jQuery.extend = function( obj ) {
		for ( var k in obj ) {
			this[ k ] = obj[ k ];
		}
	};

	jQuery.fn.extend = function( obj ) {
		for ( var k in obj ) {
			this[ k ] = obj[ k ];
		}
	};

	
## 各个模块的简要说明
	1) 核心模块
	2) 回调模块( 简单的理解为函数调用模块 )
	3) 能力检查模块
	4) 数据缓存模块
	5) 缓动队列模块
	6) DOM 属性操作模块
	7) 事件处理模块
	8) Sizzle 引擎
	9) DOM 操作模块
	10) CSS 样式操作模块
	11) ajax 操作模块
	12) 动画模块


## 比较传统与函数封装

## 使用qsa获得元素

## 采用的策略是: 
	如果浏览器兼容 qsa 方法, 那么就直接使用该方法. 如果不支持, 就需要自己实现

	-> 先封装基本选择器函数

## 处理浏览器不兼容的方法名
	document.getElementsByClassName
	str.indexOf
	arr.filter
	...
	低版本的 IE浏览器可能不支持.

	一般有两种主流的实现办法
	1> 检查系统是否提供, 如果没有则自己加入
	2> 重新定义一个替代性方法( 函数 ). 在方法中判断系统是否支持, 如果不支持则自己实现算法
	

	第一种方法可能存在问题:
		如果我提供了对应的方法, 那么后面如果引入其他的 js 库. 那么在此检查该方法是否存在的时候
		就会检查到该方法已存在, 那么就会当做系统支持该方法. 那么我们自己实现的算法是否符合要求,
		就需要考虑.


	第二种方法实现需要考虑一些细节
		1> 为了方法更加的高效, 应该提供一个参数, 表示在什么标签下获得元素. 默认是 document
		2> 每次在检索的时候, 都要处理 if 判断, 应该减少原型链的遍历

	在框架被一加载的时候, 就完成判断, 是否存在存在一个变量中, 每次再判断的时候, 直接判断变量

## 如何对浏览器进行能力检查
		-> 对方法功能的检查
		-> 对方法的定义进行检查

		一般提供一个对象 support, 里面有很多属性, 属性名誉方法名相同, 但是其值为 boolean,
		表示该方法是否可用.


		var support = {
			qsa: true,
			getElementsByClassName: false
		};
