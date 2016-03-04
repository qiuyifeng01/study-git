$(function(){
	//网站导航开关
	$('.webmap').hover(function(){
		$(this).addClass('current');
	},function(){
		$(this).removeClass('current');
	})
	
	//账号信息开关
	$('.userinfo').hover(function(){
		$(this).addClass('current');
	},function(){
		$(this).removeClass('current');
	})
	
	//头部搜索相关
	$('.selectbar').bind("mouseover", function(event) { 
		$(this).height('auto'); 
	});
	$('.selectbar').bind("mouseout", function(event) { 
		$(this).height(34); 
	});
	
	$('.selectbar ul li').bind("click", function(event) { 
		var onHtml = $(this).html();
		var Html = $('.selectbar ul li.selected').html();
		var searchfor = $(this).find('a').attr('name');
		$('input#searchfor').val(searchfor);
		$(this).html(Html);
		$('.selectbar ul li.selected').html(onHtml);
		$('.selectbar').height(34);	
	});
	
	//$('.btn-search').bind("mouseover", function(event) { $(this).addClass('on'); });
	//$('.btn-search').bind("mouseout", function(event) { $(this).removeClass('on'); });
	$('button.btn-search').bind("click", function(event) { 
		if($('input#js-keywords').val()==''){
			//alert('请填写关键字');
			return false;
		}else{
			$('#searchForm').submit();
		}
	});
	
	//顶部导航相关
	$('.webnav').hover(function(){
		$(this).addClass('current');
	},function(){
		$(this).removeClass('current');
	})
	
	//友情链接选项卡
	$('.linktabbtn a').mouseover(function(){
		var i = $(this).index();
		$('.linktabbtn a').removeClass('on');
		$(this).addClass('on');	
		$('.linkcontentbox p').removeClass('on').eq(i).addClass('on');
	})
	
	
})


//一直跟随滚轮滚到底
$.fn.smartFloat1 = function() {
    var position = function(element) {
        var top = element.position().top, pos = element.css("position");
        $(window).scroll(function() {
            var scrolls = $(this).scrollTop();
            if (scrolls > top) { //如果滚动到页面超出了当前元素element的相对页面顶部的高度
                if (window.XMLHttpRequest) { //如果不是ie6
                    element.css({
                        position: "fixed",
                        top: 0
                    }).addClass("shadow");  
                } else { //如果是ie6
                    element.css({
                        //position: "absolute",
                        top: scrolls
                    }); 
                }
            }else {
                element.css({
                    position: pos,
                    top: top
                }).removeClass("shadow");   
            }
        });
    };
    return $(this).each(function() {
        position($(this));                       
    });
};
//顶部导航智能定位                                 
$(function(){
    $(".webnavline").smartFloat1();
    //alert($(document).height());
});