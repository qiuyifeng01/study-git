$(function(){
	//mpop关闭按钮
	/*$('.mpopobox h2 span').click(function(){
		$(this).parent().parent().parent().css('display','none');
	})*/
	
	//普通提示层出现1秒后慢慢消失
	setTimeout(function(){$('.mpopsimple').fadeOut('slow');},1000);
	
	
	//存号箱选项卡	
	$('.mcunhaoxiang h3 a').click(function(){
		$('.mcunhaoxiang h3 a').removeClass('on');
		$(this).addClass('on');	
		var i = $(this).index();
		$('.mchxtab').removeClass('onmchxtab').eq(i-1).addClass('onmchxtab');
	})
	
	//注册按钮提交
	$('.regsubmit').click(function() {
		alert('注册成功');location.reload();
        var type = $(this).attr('data');
        var username = $('#username' + type).val();
        var email = $('#email' + type).val();
        var password = $('#password' + type).val();
        var repassword = $('#repassword' + type).val();
        var param = 'username=' + username + '&email=' + email + '&password=' + password + '&repassword=' + repassword;
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/ajaxreg.html",
            data: param,
            success: function(msg) {
                if (msg.errorno) {
                    $('#' + type + '_error').html(msg.error);
                } else {
                    $('#' + type + '_error').html('注册成功');
                    location.reload();
                }
            }
        });
    });
	

	
	//登录按钮提交
	$('.loginsubmit').click(function() {
		alert('按回车登入成功');location.reload();
        var type = $(this).attr('data');
        var username = $('#username' + type).val();
        var password = $('#password' + type).val();
        var param = 'username=' + username + '&password=' + password;
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/ajaxlogin.html",
            data: param,
            success: function(msg) {
                if (msg.errorno) {
                    $('#' + type + '_error').html(msg.error);
                } else {
                    $('#' + type + '_error').html('登录成功');
                    location.reload();
                }
            }
        });
    });
	
})

//登录注册弹出框切换
function changempopform(box) {
    if (box == 'enter') {
		$('#mpop-login .mpop-tit').text('登录');
        $('#mpop-login .loginout a').removeClass('on').eq(0).addClass('on');
        $('.mpopformbox').css('display', 'none');
        $('.entermpop').css('display', 'block');
    }

    if (box == 'reg') {
		$('#mpop-login .mpop-tit').text('注册');
        $('#mpop-login .loginout a').removeClass('on').eq(1).addClass('on');
        $('.mpopformbox').css('display', 'none');
        $('.regmpop').css('display', 'block');
    }
}

//关闭mpopup
function closempop(id){
	alert('点击关闭');
	$(id).css('display','none');	
}

//打开mpopup,i为登入注册弹出层开关参数,time为弹框几秒后消失参数
function openmpop(id,time,i){
	document.body.scrollLeft = 0;
	//setTimeout(myopen(id,time,i),5000);
	myopen(id,time,i);
	//(myopen(id,time,i));
	/*alert('到左边了');
	if(i != ''){
		$('#mpop-login .loginout a').eq((i-1)).trigger('click');
	};
	$(id).css('display','block');
	if(time > 0){
		setTimeout(function(){$(id).fadeOut('slow');},time);
	};*/
}

function myopen(id,time,i){
	//alert('到左边了5秒后执行');
	setTimeout(function(){
		
		if(i != ''){
			$('#mpop-login .loginout a').eq((i-1)).trigger('click');
		};
		$(id).css('display','block');
		if(time > 0){
			setTimeout(function(){$(id).fadeOut('slow');},time);
		};
	
	},200);
	
	
}

