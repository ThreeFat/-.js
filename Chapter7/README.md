## 动画的本质
	1> 补间动画
	2> 序列帧动画

	所谓的序列帧动画, 简单来说, 序列就是一个排列( 就好好比一个连
	续变动的动作目的照片), 帧就是一张一张的照片( 一张照片就是一个帧 ).
	序列帧动画就是根据时间按照排列中的每一张图片依次显示构成的动画.

	补间动画, 设定两头的时间与帧, 然后由计算机自动计算中间的变化, 
	自动的插入帧, 而形成的动画.

	由于我们页面上不是荧幕也不是画板因此不能直接得到照片( Canvas 除外 )
	但是我们可以根据时间依次修改页面中元素的样式( left, top, width, 
	height, ... ), 从而实现想要的效果.

	典型的效果: 移动

## 不定时的匀速运动

	练习: 写一段代码, 让盒子往左下角运动

## 现在需要控制时间
	需要制定在什么时间内完成这个动画

	速度 *  时间 = 路程

## 一些概念
	位移: 你从现在到将来的距离
		如果没有往复运动, 那么位移就是路程
		简单的理解, 位移就是带有方向的位置变换
		0 -> 5
		0 -> -5
	速速: 是有方向的
	加速度: 速度的变化率

	时间 * 速度 = 位移

	向量( 矢量 )

## 将公式与移动结合
	每隔几毫秒, 就移动一点点. left = 原left + 数字 + 'px'
	更换公式以后, 我们的 left = 开始left + g( t ) + 'px'

	速度 * 时间 = 路程
	v * 2000 = 500
	v => 0.25

	计时器: 每隔 20 毫秒执行一次 每 20 毫秒移动 5 像素

	left = 开始left + 5 * t + 'px'

## 代码实现
	1> 记录原来的位置, 但是代码应该放在 计时器的外面
	2> 在指定的时候停止计时器
		-> 时间到了就停止 这个
		-> 位置到了就停止 错误
	3> 应该在计时器一开始的时候就获得时间
	4> 在计时器内部每次执行的时候再获取一次时间, 求差就可以得到经过的时间
	5> 利用函数计算位移, 与原来的坐标进行累加

## 封装 move 函数
	1> 时间需要用户提供
	2> 速度需要重新计算
	function move( node, x, time ) {
	
	}

## 变速运动
	计算位置
		left = 原始的 left 值 + g( t ) + 'px'
	让我们的盒子慢慢停下来
	因此需要一个函数, 一开始很快, 后来变得很慢, 最后停下来

	需要一个函数 t 的取值范围是 0 到 time
	要求 g( t ) 的取值是 0 到 x

	// 数学公式的说明 了解为主
	g(t) = (x - 0) * sin( deltaTime * Math.PI / 2 / time );

	S = v0*t + a * t^2 / 2

## 变速运动的构造
	需要在 t 达到 time 的时候 值就是 distance
	log( t + 1 ) / log( time + 1 ) * distance

## 在 js 中处理动画

	$( '#div' ).animate( { 样式 }, 1000, easing, fn )

## 如果有多个属性
	1> 获得初始值需要修改
	2> 设置最后的值需要修改









