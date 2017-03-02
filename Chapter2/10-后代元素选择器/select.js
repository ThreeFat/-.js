var select = (function() {

    // 正则表达式
    var rnative = /\{\s*\[native/;
    var rtrim = /^\s+|\s+$/g;
    //                          1           2         3     4
    var rbaseselector = /^(?:\#([\w\-]+)|\.([\w\-]+)|(\*)|(\w+))$/;

    // 基本函数, support 对象, 验证 qsa 与 byclass
    var support = {};
    support.qsa = rnative.test(document.querySelectorAll + '');
    support.getElementsByClassName =
        rnative.test(document.getElementsByClassName + '');
    support.trim = rnative.test(String.prototype.trim + '');
    support.indexOf = rnative.test(Array.prototype.indexOf + '');


    // 基本方法 类名选择器的兼容
    function getByClassName(className, node) {
        node = node || document;
        var allElem, res = [],
            i;
        if (support.getElementsByClassName) {
            return node.getElementsByClassName(className);
        } else {
            allElem = node.getElementsByTagName('*');
            for (i = 0; i < allElem.length; i++) {
                if (allElem[i].className === className) {
                    res.push(allElem[i]);
                }
            }
            return res;
        }
    }

    // 去除字符串两端空格方法
    var myTrim = function(str) {
        // 表示两端去空格, 然后返回去除空格的结果
        if (support.trim) {
            return str.trim();
        } else {
            // 自定义实现
            return str.replace(rtrim, '');
        }
    }

    // 用于兼容数组不支持的indexOf方法
    var myIndexOf = function(array, search, startIndex) {
        startIndex = startIndex || 0;
        if (support.indexOf) {
            return array.indexOf(search, startIndex);
        } else {
            for (var i = startIndex; i < array.length; i++) {
                if (array[i] === search) {
                    return i;
                }
            }
            return -1;
        }
    }

    // 用于数组去重
    var unique = function(array) {
        var resArray = [],
            i = 0;
        for (; i < array.length; i++) {
            if (myIndexOf(resArray, array[i]) == -1) {
                resArray.push(array[i]);
            }
        }
        return resArray;
    }

    // 用于基本选择器
    function basicSelect(selector, node) {
        node = node || document;
        var m, res;
        if (m = rbaseselector.exec(selector)) {
            if (m[1]) { // id
                res = document.getElementById(m[1]);
                if (res) {
                    return [res];
                } else {
                    return [];
                }
            } else if (m[2]) { // class
                // return node.getElementsByClassName( m[ 2 ] );
                return getByClassName(m[2], node);
            } else if (m[3]) {
                return node.getElementsByTagName(m[3]);
            } else if (m[4]) {
                return node.getElementsByTagName(m[4]);
            }
        }
        return [];
    }

    // 用于后代元素选择器
    function select2(selector, results) {
        results = results || [];
        // 给传入的字符串分割成数组
        var selectors = selector.split(' ');
        // 假定 'div p .c'
        var arr = [], node = [document];
        for (var j = 0; j < selectors.length; j++) {
            for (var i = 0; i < node.length; i++) {
                arr.push.apply(arr, basicSelect(selectors[j], node[i]));
            }
            node = arr;
            arr = [];
        }
        results.push.apply(results, node);
        return results;
    }
    // 入口函数
    function select(selector, results) {
        results = results || [];
        var m, temp, selectors, i, subselector;
        
        if (typeof selector != 'string') return results;

        // 表明参数都没有问题, 接下来就是如何选择
        // 首先判断 qsa 是否可用
        // 然后再 一步步的 自己实现
        if (support.qsa) {
            results.push.apply(results, document.querySelectorAll(selector));
        } else {
            // 不存在再来考虑自己实现
            selectors = selector.split(',');
            // 循环
            for (i = 0; i < selectors.length; i++) {
                subselector = myTrim(selectors[i]);
                // 接下来就是 处理 subselector
                if (rbaseselector.test(subselector)) {
                    // 使用基本选择器
                    results.push.apply(results, basicSelect(subselector));
                } else {
                    // 使用后代选择器函数
                    select2(subselector, results);
                }
            }
        }
        // 返回 去重的result
        return unique(results);
    }
    return select;


})();
