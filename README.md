# $.js

## 深入解析jQuery源码,深入面向对象编程思维
> $.js是深入研究jQuery,然后仿照jQ写出来的实现部分jQuery功能API的框架组件,主要实现了以下几个模块的功能:

### 框架的选择器模块
> select选择器搜索引擎,已实现id,类名,标签名选择到元素,也可以通过组合选择器,后代选择器获取到元素.  
  详情见代码Chapter1,2实例
  
### DOM基本操作
> 仿照jQ中的DOM操作模块,实现的API有:appendTo(),prependTo(),html(),text()等.  
  详情见代码Chapter3,4实例
  
### 事件处理
> jQuery的强大之处不只是它的选择器引擎,另外就是它实现了大部分是事件并且兼容低版本IE  
  所以,我也将大部分浏览器都支持的事件都在$.js中实现,并且兼容低版本的IE,可以通过 on() 方法绑定事件,
  也能通过事件本身的名字如: click() 来实现事件绑定,还能通过 off() 方法解除事件绑定
  更多详情参考代码Chapter5实例
  
### 属性操作与样式操作
>  继承了jQ的样式操作与属性操作方法,一样的API,一样的类名增删改查
 详情见代码Chapter6实例
 

