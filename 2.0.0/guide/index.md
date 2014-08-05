## 综述

SearchText。

## 初始化组件
		
    S.use('kg/searchText/2.0.0/index', function (S, SearchText) {
        // 1. 实例化的方式调用
         var searchText = new SearchText({container:'#demo',markColor:'red'});
         searchText.search('北京')；

        // 2. NodeList直接调用searchText方法
        S.one('#demo').searchText('北京');
    })

## API说明
