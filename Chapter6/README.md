## 样式操作
	-> 有哪些方法常用
		.css(), .addClass(), .hasClass(), .removeClass(), 
		.toggleClass()
	-> .css 方法
		1> 带有一个 json 对象的方法: 设置样式
		2> 带有一个键值对的 方法: 设置样式
		3> 带有一个名字字符串的方法: 读取样式

		带有两个参数或一个参数使用 arguments 来进行判断
		.length == 2
		.length == 1:
			是一个字符串
			是一个对象

		if ( arguments.length == 2 ) {
			// 设置样式			
		} else if ( .length == 1 ) {
			if ( option 是 string ) {
				获取
			} else if ( 是一个 object ) {
				设置
			}
		}

		$( '#dv' ).css()

		获得样式的时候, 应该考虑首先使用 style, 但是如果没有数据
		那么就使用 IE currentStyle , 新浏览器中 getComputeStyle
	-> .addClass 方法
		给 dom元素 添加 className 属性
		难点在与 className 属性已经有内容
		<div class="box clear botton"></div>

		添加的类名不能影响原有的名字, 并且如果已经有这个名字了, 就不应该再次添加了

		参数: 类名

		name: ' c '

		class=" c1 "
		class=" c1 c c2 "
		class=" c "
		class=" c1 c2 c "

		使用 split 可以完成. 还有一种技巧
		(' ' + classTxt + ' ').indexOf( ' ' + name + ' ' ) != -1
	-> removeClass
		removeClass 不用考虑其他只需要查找, 然后找到后移除即可
	-> hasClass
		只要 $ 对象中有一个 dom 元素包含对应的属性, 那么就返回 true
		算法: 依次遍历, 只要有一个就停止遍历, 返回 true, 如果全部遍历都没有
		那么就就是返回 false
	-> toggleClass

## 属性操作
	.attr(), .prop(), .val(), .html(), text()
	-> attr
		语法: 
			$( ... ).attr( 'src', '1.jpg' )
			$( ... ).attr( 'src' )
	-> prop 方法
	-> val
	-> html
	-> text
		1> 将字符串插入到html节点中
		2> 读取一个 节点中的 所有的后代节点
		<div>123
			<div>456</div>
			<div>789</div>
			0
		</div>




























