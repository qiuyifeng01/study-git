$(function(){
	//游戏选项卡
	$('.gametabbtn li').mouseover(function(){
		var i = $(this).index();
		$('.gametabbtn li a').removeClass('on');
		$(this).find('a').addClass('on');	
		$('.gametabcontent').addClass('conNo').eq(i).removeClass('conNo');
	})
	
	//礼包颜色提示
	$('.icon-lb-new').hover(function(){
		$(this).parent().find('.icontip').show();
	},function(){
		$(this).parent().find('.icontip').hide();
	});
	
	//左侧游戏和礼包切换卡效果
	$('.gamecolumn h3 span a').on('mouseover',function(){
		var i = $(this).index();
		$('.gamecolumn h3 span a').removeClass('on');
		$(this).addClass('on');	
		$('.gamecolumn .gameztconent').addClass('conNo').eq(i).removeClass('conNo');
	})
	
	$('.libaocolumn h3 span a').on('mouseover',function(){
		var i = $(this).index();
		$('.libaocolumn h3 span a').removeClass('on');
		$(this).addClass('on');	
		$('.libaocolumn .gameztconent').addClass('conNo').eq(i).removeClass('conNo');
	})
	
	//礼包分页效果
	$('.hotqiehuannum p a').on('mouseover',function(){
		var i = $(this).index();
		$('.hotqiehuannum p a').removeClass('on');
		$(this).addClass('on');	
		$(this).parent().parent().parent().find('.qiehuanbox').addClass('conNo').eq(i).removeClass('conNo')
	})
	
	$('.newqiehuannum p a').on('mouseover',function(){
		var i = $(this).index();
		$('.newqiehuannum p a').removeClass('on');
		$(this).addClass('on');	
		$(this).parent().parent().parent().find('.qiehuanbox').addClass('conNo').eq(i).removeClass('conNo')
	})
	
	//游戏礼包出现隐藏效果
	$('.gameztlist').hover(function(){
		$(this).addClass('gameztlisthover');
	},function(){
		$(this).removeClass('gameztlisthover');
	})
	
	//二维码出现隐藏效果
	$('.gameztpic').hover(function(){
		$(this).find('p').addClass('on');
	},function(){
		$(this).find('p').removeClass('on');
	})
	
	//推荐活动专题选项卡
	$('.tjhuodong h3 span a').on('mouseover',function(){
		var i = $(this).index();
		$('.tjhuodong h3 span a').removeClass('on');
		$(this).addClass('on');	
		$('.tjhuodongconbox .tjcon').addClass('conNo').eq(i).removeClass('conNo')
	})
	
	//图标文字介绍出现
	$('.tubiaobox ul li').hover(function(){
		$(this).find('a').css('visibility','visible');	
	},function(){
		$(this).find('a').css('visibility','hidden');	
	})
	
	//游戏选项卡
	$('.picnews_b2 h3 span a').on('mouseover',function(){
		var i = $(this).index();
		$('.picnews_b2 h3 span a').removeClass('on');
		$(this).addClass('on');
		$('.gameulbox').css('display','none').eq(i).css('display','block');
	})
	
	//推荐游戏二维码
	$('.gameulbox ul li').hover(function(){
		$(this).addClass('on');	
	},function(){
		$(this).removeClass('on');	
	})
	
	
	//图片选项卡
	$('.picturetabbtn a').mouseover(function(){
		var i = $(this).index();
		$('.picturetabbtn a').removeClass('on');	
		$(this).addClass('on');
		$('.picturelist').removeClass('onpicturelist').eq(i).addClass('onpicturelist');
	})
	
	//top榜
	$('.gamebangul li').on('mouseover',function(){
		//$('.gamebangul li').removeClass('on');
		$(this).parent().find('li').removeClass('on');	
		$(this).addClass('on');	
	})
})