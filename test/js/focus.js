// mfocus JavaScript 焦点图
var mt = mn = 0, mcounts = 3;//$("#mplay_list a").size();
$(function(){
$("#mplay_list a:not(:first-child)").hide();
$("#mplay_info").html($("#mplay_list a:first-child").find("img").attr('alt'));
$("#mplay_text li:first-child").css({"background":"#FF6600",'color':'#fff'});
$("#mplay_info").click(function(){window.open($("#mplay_list a:first-child").attr('href'), "_blank")});
$("#mplay_text li").mouseover(function() {
var mi = $(this).text() - 1;
mn = mi;
if (mi >= mcounts) return;
$("#mplay_info").html($("#mplay_list a").eq(mi).find("img").attr('alt'));
$("#mplay_info").unbind().click(function(){window.open($("#mplay_list a").eq(mi).attr('href'), "_blank")})
$("#mplay_list a").filter(":visible").fadeOut(100).parent().children().eq(mi).fadeIn(200);
$(this).css({"background":"#FF6600",'color':'#fff'}).siblings().css({"background":"#999",'color':'#fff'});
});
mt = setInterval("mshowAutos()", 5000);
//$("#mplay").hover(function(){clearInterval(mt)}, function(){mt = setInterval("mshowAutos()", 5000);});
})
function mshowAutos()
{
mn = mn >= (mcounts - 1) ? 0 : ++mn;
$("#mplay_text li").eq(mn).trigger('mouseover');
}