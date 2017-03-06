## 什么是事件处理
	-> 在 DOM 中事件就是一旦有某一个行为发出, 那么就有一个方法被调用
	-> 如何添加事件? 以点击事件为例
		1> 直接赋值
			div.onclick = function ( e ) {
				// 点击以后处理的过程
			};
		2> 调用方法
			标准 API
			div.addEventListener( 'click', function ( e ) {
				// 点击以后处理过程
			});
			低版本的 IE, 新的 IE 浏览器是不支持 该方法
			div.attachEvent( 'onclick', function ( e ) {
				// 点击以后的处理过程
			});
		3> 区别?
			第一种方法只能添加一个处理函数, 也就是说如果需要实现事
			件的累加, 那么就需要一些算法等实现. 但是第二种方法它是
			直接支持事件累加的.
	-> 都存在哪些事件
		for-in 遍历, 看 on 开头的就是事件

## jq 中的事件处理
	-> 在 jq 中如何添加事件. 以点击事件为例.
		-> on 方法
			$div.on( 'click', fn );
		-> 事件方法: click
			$div.click( fn );
	-> 在 jq 中事件追加的问题
		都支持事件追加的

## $ 如何实现事件的功能
	1> 事件的追加与移除
	2> 可以使用 on 来添加事件, 也可以使用 事件方法名 来添加事件
	3> load 事件
	4> 事件对象( 获得数据, 操作事件对象 )

## load 事件
	-> DOM 操作中添加 load 的方法
		window.onload = fn
		但是由于 window 是全局对象, 那么可以省略 window
		onload = fn
	-> jq 中的处理
		$( document ).ready( fn );
		$( fn )
		在 jq 中 reay 与 dom 中的 onload. 在 jq 不会等到所有的资源加载完毕

	-> 事件追加就是 dom 操作中的事件追加
		传入的如果是一个函数, 那么就看以前是否已经绑定函数
		如果没有绑定, 那么直接赋值即可
		如果绑定了, 那么就完成追加

		问题: 如果实现以前的函数, 和现在新的函数, 在页面加载以后一起执行?
		1> 将原来的函数取出来, 用 oldfn 引用
		2> 将原来的函数与现在的新函数( newfn )构造一个函数来调用它们
			onload = function () {
				oldfn();
				newfn();
			};

## 点击事件
	-> 先实现 click 方法, 利用它来添加点击实现
		1> 如何添加, 添加给谁
		2> 事件追加
	-> 实现 click 方法
		$.fn.extend({
			click: function ( fn ) {

				遍历 this, 给每一个 this[ i ] 绑定 fn
			} 

		})
	-> 点击事件的累加
		使用 addEventListener 代替 onclick
	-> 考虑兼容 IE 浏览器
		// attachEvent 不能用, 原因是反过来执行的
		这次只有自己实现事件追加与移除的功能
		
		要实现事件的追加与移除要解决的问题
		1> 要找地方存储函数. 使用数组
		2> 将来要使用 on, off 完成事件的添加与移除
			即这个数组要求可以被两个方法访问
			给每一个 $ 对象添加一个 events 的属性
			该属性存储每一个事件中可以有的事件处理函数
			<$>.events = {
				click: [ f1, f2, f3 ]
			}
		3> 如何触发事件
			如果点击按钮, 理论上回执行 onclick 中的函数, 或
			addEventListener 或 attachEvent 中绑定的函数. 
			在这样的函数中, 遍历对应的数组, 依次调用方法.
