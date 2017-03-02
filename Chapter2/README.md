##  使用逗号实现组合选择器
	1) 在 jq 中是如何使用的.
	2) 思考一下自己如何实现该共能
		select( 'div, p, ul' )
		1> 一开始就应该使用 split 将字符串分割
			得到: [ 'div', ' p', ' ul' ]
		2> 将数组中每一个元素再次进行获取(  原来实现的 select 函数 )
		3> 将所有得到的结果合并起来

		有一个问题: 去掉两端的空格: str.trim

##  元素去重
	可以得到 select 返回的就是一个数组. 所以可以抽象一下. 就是在数组中去除重复元素
	var arr = [ 1, 2, 3, 1, 3, 2, 4 ]; // =>  [ 1, 2, 3, 4 ]  
	var tempArr = [];
	循环将 arr 中的 元素 一个一个 的加到 tempArr 中, 并且需要判断
	如果 tempArr 中不包含该元素才会加进去

##  去重复的步骤
	1> 首先验证是否存在 indexOf 方法
	2> 提供 unique 函数完成去除重复

##  利用空格实现 后代元素 选择器
	现在需要一个函数, 函数的参数与结构类似于 select
	该函数专门处理带有 空格的 后代元素	

##  首先看 each 的实现
	分析如何遍历数组	
```
	var arr1 = [ 1, 2, 3, 4 ];
	for ( var i = 0; i < arr.length; i++ ) {
		// 内部的代码. 变的是如何操作 i 和 arr[ i ]
	}

	中间的部分可以考虑抽取出来, 由于循环遍历的结构永远不变, 那么这里可以将
	循环的代码封装起来, 只留循环体可以被修改或改变

	function each( arr, code ) {
		for ( var i = 0; i < arr.length; i++ ) {
			// 内部的代码. 变的是如何操作 i 和 arr[ i ]
			eval( code );
		}
	}

	演化

	function each( arr, func ) {
		for ( var i = 0; i < arr.length; i++ ) {
			// 内部的代码. 变的是如何操作 i 和 arr[ i ]
			func( i, arr[ i ] );
		}
	}	

	// 如果要求遍历对象
	function each ( obj, func ) {
		for ( var k in obj ) {
			func.call( obj[ k ], k, obj[ k ] );
		}
	}
```

##  在 js 中( 在面向对象的编程语言中 ) 有一个规则: 鸭子辩形

##  map 函数	
	获得 函数的返回值	
	然后将返回值变成 数组	
```
	function map ( arr, func ) {
		var res = [], temp;
		for ( var i = 0; i < arr.length; i++ ) {
			temp = func.call( arr[ i ], i, arr[ i ] );
			if ( temp != null ) {
				res.push( temp );
			}
		} 
		return res;
	}
```