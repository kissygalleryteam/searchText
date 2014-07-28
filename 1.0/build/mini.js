/*
combined files : 

gallery/searchText/1.0/index
gallery/searchText/1.0/mini

*/
/**
 * @fileoverview 
 * @author 骏隆<junlong.hjl@alibaba-inc.com>
 * @module searchText
 * @refer to http://www.zhangxinxu.com/study/js/jquery.textSearch-1.0.js
 **/
KISSY.add('gallery/searchText/1.0/index',function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     * 
     * @class SearchText
     * @constructor
     * @extends Base
     */
    function SearchText(comConfig) {
        var self = this;
        //调用父类构造函数
        SearchText.superclass.constructor.call(self, comConfig);
    }
    Node.prototype.searchText=Node.searchText||function(str,options){
        var defaults = {
            divFlag: true,
            divStr: " ",
            markClass: "",
            markColor: "red",
            nullReport: true,
            callback: function(){
                return false;
            }
        };
        var sets = S.merge( defaults, options || {}), clStr;
        if(sets.markClass){
            clStr = "class='"+sets.markClass+"'";
        }else{
            clStr = "style='color:"+sets.markColor+";'";
        }

        //对前一次高亮处理的文字还原
        $("span[rel='mark']").each(function() {
            var text = document.createTextNode($(this).text());
            $(this).replaceWith($(text));
        });


        //字符串正则表达式关键字转化
        var regTrim = function(s){
            var imp = /[\^\.\\\|\(\)\*\+\-\$\[\]\?]/g;
            var imp_c = {};
            imp_c["^"] = "\\^";
            imp_c["."] = "\\.";
            imp_c["\\"] = "\\\\";
            imp_c["|"] = "\\|";
            imp_c["("] = "\\(";
            imp_c[")"] = "\\)";
            imp_c["*"] = "\\*";
            imp_c["+"] = "\\+";
            imp_c["-"] = "\\-";
            imp_c["$"] = "\\$";
            imp_c["["] = "\\[";
            imp_c["]"] = "\\]";
            imp_c["?"] = "\\?";
            s = s.replace(imp,function(o){
                return imp_c[o];
            });
            return s;
        };
        $(this).each(function(){
            var t = $(this);
            str = S.trim(str);
            if(str === ""){
                alert("关键字为空");
                return false;
            }else{
                //将关键字push到数组之中
                var arr = [];
                if(sets.divFlag){
                    arr = str.split(sets.divStr);
                }else{
                    arr.push(str);
                }
            }
            var v_html = t.html();
            //删除注释
            v_html = v_html.replace(/<!--(?:.*)\-->/g,"");

            //将HTML代码支离为HTML片段和文字片段，其中文字片段用于正则替换处理，而HTML片段置之不理
            var tags = /[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g;
            var a = v_html.match(tags), test = 0;
            S.each(a, function(c, i){
                if(!/<(?:.|\s)*?>/.test(c)){//非标签
                    //开始执行替换
                    S.each(arr,function(con,index){
                        if(con === ""){return;}
                        var reg = new RegExp(regTrim(con), "g");
                        if(reg.test(c)){
                            //正则替换
                            c = c.replace(reg,"♂"+con+"♀");
                            test = 1;
                        }
                    });
                    c = c.replace(/♂/g,"<span rel='mark' "+clStr+">").replace(/♀/g,"</span>");
                    a[i] = c;
                }
            });
            //将支离数组重新组成字符串
            var new_html = a.join("");

            $(this).html(new_html);

            if(test === 0 && sets.nullReport){
                alert("没有搜索结果");
                return false;
            }

            //执行回调函数
            sets.callback();
        });
    }
    S.extend(SearchText, Base, /** @lends SearchText.prototype*/{
        initializer: function() {
            this.container= S.one(this.get('container'))|| S.all('body');
            this.defaultConfig = {
                divFlag: this.get('divFlag')||true,
                divStr: this.get('divStr')||" ",
                markClass: this.get('markClass')||"",
                markColor: this.get('markColor')||"red",
                nullReport: this.get('nullReport')||true,
                callback: this.get('callback')||function(){
                    return false;
                }
            };
        },
        search:function(keyword){
            this.container.searchText(keyword,this.defaultConfig);
        }
    }, {ATTRS : /** @lends SearchText*/{
        container:{
            value:''
        },
        /**
         * 支持多词搜索
         * */
        divFlag:{
            value:true
        },
        /**
         * 分隔符
         * */
        divStr:{
            value:" "
        },
        /**
         * 替换文本样式
         * */
        markClass:{
            value:''
        },
        /**
         * 替换文本颜色
         * */
        markColor:{
            value:red
        },
        /**
         * 没有结果时是否提示
         * */
        nullReport:{
            value:true
        },
        /**
         * 查询介绍回调函数
         * */
        callback:{
            value:null
        }
     }});
    return SearchText;
}, {requires:['node', 'base']});




/**
 * @fileoverview 
 * @author 骏隆<junlong.hjl@alibaba-inc.com>
 * @module searchText
 **/
KISSY.add('gallery/searchText/1.0/mini',function(S, Component) {

  return Component;

}, {
  requires: ["./index"]
});
