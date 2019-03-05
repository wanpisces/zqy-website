$(function(){

$('#carousel').carousel();
// tabItem($('#tab-switch1 .province-tab a'),$('#tab-switch1 .province-item'),'click');
tabItem($('#tab-switch2 .item-line-tit span'),$('#tab-switch2 .section-zr-item ul'),'click');
tabItem($('#tab-switch3 .item-line-tit span'),$('#tab-switch3 .section-zr-item ul'),'click');
tabItem($('.remen-bd-wrap a'),$('.rank-wrap ol'),'click');//榜单切换
tabItem($('#tab-switch4 .remen-bd-wrap span'),$('#tab-switch4 ol'),'click');
tabItem($('#tab-switch5 .news-nav-wrap span'),$('#tab-switch5 .news-list-wrap .news-list-item'),'mouseover');
tabItem($('#tab-switch6 .news-nav-wrap span'),$('#tab-switch6 .news-list-wrap .news-list-item'),'mouseover');
tabItem($('#tab-switch7 .news-nav-wrap span'),$('#tab-switch7 .news-list-wrap .news-list-item'),'mouseover');
tabItem($('#tab-switch8 .news-nav-wrap span'),$('#tab-switch8 .news-list-wrap .news-list-item'),'mouseover');
tabItem($('#tab-switch9 .news-nav-wrap span'),$('#tab-switch9 .news-list-wrap .news-list-item'),'mouseover');
tabItem($('#tab-switch10 .news-nav-wrap span'),$('#tab-switch10 .news-list-wrap .news-list-item'),'mouseover');
tabItem($('#tab-switch11 .news-nav-wrap span'),$('#tab-switch11 .news-list-wrap .news-list-item'),'mouseover');
goodsChange($('.buy-big-wrap ul li'),$('.buy-small-wrap ul li'));//购买页
getDate();//日期展示




    /*------------公用方法------------*/
    function goodsChange(bigNode,smallNode){
        bigNode.eq(0).show();
        smallNode.eq(0).addClass('on');
        smallNode.each(function(index){
            $(this).mouseover(function(){
                bigNode.eq(index).fadeIn().siblings().fadeOut();
                $(this).addClass('on').siblings().removeClass('on');
            })
        })
    }
    //日期
    function getDate(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        month<10?month="0"+month:month=""+month;
        day<10?day="0"+day:day=""+day;
        var str = "";
        var week = new Date().getDay();
        if (week == 0) {
                str = "星期日";
        } else if (week == 1) {
                str = "星期一";
        } else if (week == 2) {
                str = "星期二";
        } else if (week == 3) {
                str = "星期三";
        } else if (week == 4) {
                str = "星期四";
        } else if (week == 5) {
                str = "星期五";
        } else if (week == 6) {
                str = "星期六";
        }
        $('.nav-date').text(year+'年'+month+'月'+day+'日 '+str);
    }


// tab切换
    layui.use('element', function(){
    var $ = layui.jquery
        ,element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块
    //Hash地址的定位
    var layid = location.hash.replace(/^#tab=/, '');
    element.tabChange('tab', layid);
    element.on('tab(ttab)', function(elem){
        location.hash = 'tab='+ $(this).attr('lay-id');
    });
});


    //下拉框
    function dropDown(parent,node){
        parent.click(function(){
            // window.event?window.event.cancelBubble=true:event.stopPropagation();
            var e=getEvent();
            if(window.event){
                //e.returnValue=false;//阻止自身行为
                e.cancelBubble=true;//阻止冒泡
             }else if(e.preventDefault){
                //e.preventDefault();//阻止自身行为
                e.stopPropagation();//阻止冒泡
             }
            $(this).find('ul').slideToggle();
        });
        $("body").click(function(){
            parent.find('ul').slideUp();
        })
      }
    //获取事件
      function getEvent(){
        if(window.event)    {return window.event;}
        func=getEvent.caller;
        while(func!=null){
          var arg0=func.arguments[0];
          if(arg0){
           if((arg0.constructor==Event || arg0.constructor ==MouseEvent
              || arg0.constructor==KeyboardEvent)
              ||(typeof(arg0)=="object" && arg0.preventDefault
              && arg0.stopPropagation)){
              return arg0;
            }
          }
          func=func.caller;
        }
        return null;
      }





    function tabItem($item,$box,event){//选项卡
        $box.eq(0).show();
        $item.eq(0).addClass('on');
        $item.on(event,function(){
          var index = $(this).index();
          $(this).addClass("on").siblings().removeClass("on");
          $box.eq(index).show().siblings().hide();
        });
    }
});



;(function ($) {
    $.fn.carousel = function () {
        var speed = 1000,
            interval = 2000,
            nowIndex = 0,
            timer = null,
            oPrev = $(this).find(".prev"),
            oNext = $(this).find(".next"),
            cslBtn = $(this).find(".csl-btn"),
            oP = $(this).find("p"),
            ol = $(this).find("ol"),
            olLi = null,
            oUl = $(this).find(".csl-content ul"),
            firstLi = oUl.find("li:first").clone(),
            liWidth = oUl.find("li:first").outerWidth();
        oUl = oUl.append(firstLi);
        var length = oUl.children("li").length;
        var ulWidth = length*liWidth;
        oUl.width(ulWidth);
        olLi = $(this).find("ol li"),
        olLi.first().addClass("on");
        oP.eq(0).show();
        $(this).hover(function(){
            cslBtn.show();
        },function(){
            cslBtn.hide();
        })
        oPrev.click(function(){
            clearInterval(timer);
            nowIndex --;
            if (nowIndex == -1) {
                nowIndex = length-2;
                oUl.css({"left":-liWidth*(length-1)+"px"});
            }
            oUl.stop().animate({"left":-liWidth*nowIndex+"px"},speed);
            olLi.eq(nowIndex).addClass("on").siblings().removeClass("on");
            oP.eq(nowIndex).show().siblings().hide();
            timer = setInterval(cslProgcess,interval);
        });
        oNext.click(function(){
            clearInterval(timer);
            nowIndex ++;
            if (nowIndex == length) {
                nowIndex = 1;
                oUl.css({"left":"0px"});
            }
            oUl.stop().animate({"left":-liWidth*nowIndex+"px"},speed);
            if(nowIndex == length-1){
                olLi.eq(0).addClass("on").siblings().removeClass("on");
                oP.eq(0).show().siblings().hide();
            }else{
                olLi.eq(nowIndex).addClass("on").siblings().removeClass("on");
                oP.eq(nowIndex).show().siblings().hide();
            }
            timer = setInterval(cslProgcess,interval);
        });
        olLi.hover(function(){
            clearInterval(timer);
            nowIndex = $(this).index();
            oUl.stop().animate({"left":-liWidth*nowIndex+"px"},speed);
            olLi.eq(nowIndex).addClass("on").siblings().removeClass("on");
            oP.eq(nowIndex).show().siblings().hide();
        },function(){
            timer = setInterval(cslProgcess,interval);
        });
        oUl.hover(function(){
            clearInterval(timer);
        },function(){
            timer = setInterval(cslProgcess,interval);
        });
        function cslProgcess(){
            nowIndex ++;
            if (nowIndex == length) {
                nowIndex = 1;
                oUl.css({"left":"0px"});
            }
            oUl.stop().animate({"left":-liWidth*nowIndex+"px"},speed);
            if(nowIndex == length-1){
                olLi.eq(0).addClass("on").siblings().removeClass("on");
                oP.eq(0).show().siblings().hide();
            }else{
                olLi.eq(nowIndex).addClass("on").siblings().removeClass("on");
                oP.eq(nowIndex).show().siblings().hide();
            }
        }
        timer = setInterval(cslProgcess,interval);
    }
})(jQuery);