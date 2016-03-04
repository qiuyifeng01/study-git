//打开大图展示
function openbigpic(n){
	var i = n-1;
    $('#bigpics').css('display','block');
	changepic(i);
};

//关闭大图展示
function closebigpic(){
    $('#bigpics').css('display','none');
};

//大图展示下一张
function next(){
	var num = $('#bigpics ul li').length;
	var n = $('#bigpics ul li.on').index();
	var i = 0;
	if(n <  num){
		i = n;
	}else{
		//alert('已经是最后一张了！');	
		i = 0;
	};
	changepic(i);
};

//大图展示上一张
function pre(){
	var num = $('#bigpics ul li').length;
	var n = $('#bigpics ul li.on').index();
	var i = 0;
	if(n == 1){
		//alert('已经是第一张了！');
		i = num-1 ;	
	}else{
		i = n-2;
	};
	changepic(i);
}

//图片切换方法
function changepic(i){
	$('#bigpics ul li').removeClass('on').eq(i).addClass('on');
	var w = $('#bigpics ul li').eq(i).width()+4;
	var h = $('#bigpics ul li').eq(i).height()+4;
	var mt = ($(window).height()-h)/2 ;
	$('#bigpics ul').width(w);
	$('#bigpics ul').css('top',mt);
	$('#bigpics .fanyebtn').width(w);
	$('#bigpics .fanyebtn').height(h);
	$('#bigpics .fanyebtn a').height(h);
}

//图片居中定位
function dingwei(_this){
    //alert($(window).height());
    var img=new Image();
    img.src=_this.src;
    
    //alert(img.height);
    $(_this).parent().width(img.width);
    $(_this).parent().height(img.height);
    //var mt = ($(window).height()-_this.height)/2 ;
    //$(_this).parent().css('margin-top',mt);
}


//打开视频播放
function openbigvideo(n){
	var i = n-1;
    $('#bigvideo').css('display','block');
	var w = 860, h=524;//设置视频大小
	var mt = ($(window).height()-h)/2 ;
	$('#bigvideo ul li').removeClass('on').eq(i).addClass('on');
	$('#bigvideo ul').width(w);
	$('#bigvideo ul').css('top',mt);
};

//关闭大图展示
function closebigvideo(){
    $('#bigvideo').css('display','none');
};