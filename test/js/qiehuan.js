$(function(){
      $(".changeMenu > ul > li > a").mouseover(function(e){          
		  if(this == e.target){
            var container = $(this).parent().parent();
            var index = $.inArray(this, $(this).parent().parent().parent().find("a"));
			var panels,temStyle;
			panels = $(this).parent().parent().parent().parent().find(".ui-tabs-panel");					
			if (panels.eq(index).is(".ui-tabs-panel")){
					
				if($(container).children().is(".on")){
				  $(container).children().removeClass("on").eq(index).addClass("on");
				}
				panels.addClass("conNo").eq(index).removeClass("conNo");				
				}            			
          }
      });//tabÇÐ»»
});//jqueryµÄonready ui-tabs-panel divNone0