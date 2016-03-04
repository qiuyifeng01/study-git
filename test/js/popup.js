$(function(){
	//pop关闭按钮
	/*$('.popobox h2 span').click(function(){
		$(this).parent().parent().parent().css('display','none');
	})*/
	
	//普通提示层出现1秒后慢慢消失
	setTimeout(function(){$('.popsimple').fadeOut('slow');},1000);
	
	
	//存号箱选项卡	
	$('.cunhaoxiang h3 a').click(function(){
		$('.cunhaoxiang h3 a').removeClass('on');
		$(this).addClass('on');	
		var i = $(this).index();
		$('.chxtab').removeClass('onchxtab').eq(i-1).addClass('onchxtab');
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
	
	$('.regpop').find('input').keyup(function() {
        document.onkeydown = function(event) {
			alert('按回车注册成功');location.reload();
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13) {
                var type = $('.regpop').find("input[type='button']").attr('data');
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
            }
        }
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
	
	 $('.enterpop').find('input').focus(function() {
        document.onkeydown = function(event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13) {
				alert('登入成功');location.reload();
                var type = $('.enterpop').find("input[type='button']").attr('data');
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
            }
        }
    });
})

//登录注册弹出框切换
function changepopform(box) {
    if (box == 'enter') {
		$('#pop-login .pop-tit').text('登录');
        $('.loginout a').removeClass('on').eq(0).addClass('on');
        $('.popformbox').css('display', 'none');
        $('.enterpop').css('display', 'block');
    }

    if (box == 'reg') {
		$('#pop-login .pop-tit').text('注册');
        $('.loginout a').removeClass('on').eq(1).addClass('on');
        $('.popformbox').css('display', 'none');
        $('.regpop').css('display', 'block');
    }
}

//关闭popup
function closepop(id){
	$(id).css('display','none');	
}

//打开popup,i为登入注册弹出层开关参数,time为弹框几秒后消失参数
function openpop(id,time,i){
	if(i != ''){
		$('#pop-login .loginout a').eq((i-1)).trigger('click');
	};
	$(id).css('display','block');
	if(time > 0){
		setTimeout(function(){$(id).fadeOut('slow');},time);
	};
}

