/*!build time : 2014-08-05 6:26:38 PM*/
KISSY.add("gallery/searchText/1.0/index",function(a,b,c){function d(a){var b=this;d.superclass.constructor.call(b,a)}var e=b.all;return b.prototype.searchText=b.searchText||function(b,c){var d,f={divFlag:!0,divStr:" ",markClass:"",markColor:"red",nullReport:!0,callback:function(){return!1}},g=a.merge(f,c||{});d=g.markClass?"class='"+g.markClass+"'":"style='color:"+g.markColor+";'",e("span[rel='mark']").each(function(){var a=document.createTextNode(e(this).text());e(this).replaceWith(e(a))});var h=function(a){var b=/[\^\.\\\|\(\)\*\+\-\$\[\]\?]/g,c={};return c["^"]="\\^",c["."]="\\.",c["\\"]="\\\\",c["|"]="\\|",c["("]="\\(",c[")"]="\\)",c["*"]="\\*",c["+"]="\\+",c["-"]="\\-",c.$="\\$",c["["]="\\[",c["]"]="\\]",c["?"]="\\?",a=a.replace(b,function(a){return c[a]})};e(this).each(function(){var c=e(this);if(b=a.trim(b),""===b)return alert("\u5173\u952e\u5b57\u4e3a\u7a7a"),!1;var f=[];g.divFlag?f=b.split(g.divStr):f.push(b);var i=c.html();i=i.replace(/<!--(?:.*)\-->/g,"");var j=/[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g,k=i.match(j),l=0;a.each(k,function(b,c){/<(?:.|\s)*?>/.test(b)||(a.each(f,function(a){if(""!==a){var c=new RegExp(h(a),"g");c.test(b)&&(b=b.replace(c,"\u2642"+a+"\u2640"),l=1)}}),b=b.replace(/\u2642/g,"<span rel='mark' "+d+">").replace(/\u2640/g,"</span>"),k[c]=b)});var m=k.join("");return e(this).html(m),0===l&&g.nullReport?(alert("\u6ca1\u6709\u641c\u7d22\u7ed3\u679c"),!1):void g.callback()})},a.extend(d,c,{initializer:function(){this.container=a.one(this.get("container"))||a.all("body"),this.defaultConfig={divFlag:this.get("divFlag")||!0,divStr:this.get("divStr")||" ",markClass:this.get("markClass")||"",markColor:this.get("markColor")||"red",nullReport:this.get("nullReport")||!0,callback:this.get("callback")||function(){return!1}}},search:function(b){a.each(this.container,function(c){a.all(c).searchText(b,this.defaultConfig)})}},{ATTRS:{container:{value:""},divFlag:{value:!0},divStr:{value:" "},markClass:{value:""},markColor:{value:"red"},nullReport:{value:!0},callback:{value:null}}}),d},{requires:["node","base"]});