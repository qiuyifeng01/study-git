var t = n = 0, counts = 5;//$("#lunbobox ol li").size();
$("#lunbobox ol li").mouseover(function() {
	var i = $(this).index();
	n = i;
	//alert('n='+n+',i='+i+'');
	if (i >= counts) return;
	$("#lunbobox ul").animate({'margin-left':(-410*i)});
	$(this).addClass('on').siblings().removeClass('on');
});
$('#lunbobox ul').hover(function(){
	clearInterval(t);
},function(){
	t = setInterval("showAutos()", 5000);
})
t = setInterval("showAutos()", 5000);
function showAutos()
{
	n = n >= (counts - 1) ? 0 : ++n;
	$("#lunbobox ol li").eq(n).trigger('mouseover');
}