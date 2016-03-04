/*!
 * FileName   : dww2.js
 * WebSite    : http://duowan.com
 * Desc       :
 * Author     : Tuyo
 * version    : 2.1.1
 * LastChange : 2011-12-09 11:25:39
 * */

// 切换器插件
(function($){
	$.fn.Switchable = function( options ){
		var opts = $.extend( {}, $.fn.Switchable.Default, options );
		var targetLi = $("." + opts.nav + " > li", $(this)),
			clickNext = $(".next", $(this)),
			clickPrev = $(".prev", $(this)),
			contentBox = $("." + opts.content, $(this));
		var index = 1,
			contentBoxNum = contentBox.children().size(),
			slideW = contentBox.children(":first").width(),
			slideH = contentBox.children(":first").height();
		var autoPlay, slideWH;
		if ( opts.effect == "scrollY" || opts.effect == "scrollTxt" ) {
			slideWH = contentBox.children(":first").outerHeight(true);
		} else if ( opts.effect == "scrollX" || opts.effect == "scrollLoopX" ) {
			slideWH = contentBox.children(":first").outerWidth(true);
			contentBox.css("width" , contentBoxNum * slideWH);
			contentBox.children().css({"float" : "left"});
			contentBox.children().css({"width" : slideW});
		}

		return this.each(function(){
			// 滚动函数
			var doPlay = function() {
				$.fn.Switchable.Effect[opts.effect]( contentBox, targetLi, index, slideWH, opts );
				if ( ++index * opts.steps >= contentBoxNum ) index = 0;
			}

			// 点击左右滚动
			if (clickNext.size()) {
				clickNext.click(function(event){
					if ( autoPlay ) clearInterval( autoPlay );
					$.fn.Switchable.Effect[opts.effect]( contentBox, targetLi, index, slideWH, opts );
					if ( opts.autoPlay ) autoPlay = setInterval(doPlay, opts.timer);
					event.preventDefault();
				});
				clickPrev.click(function(event){
					if ( autoPlay ) clearInterval( autoPlay );
					$.fn.Switchable.Effect[opts.effect]( contentBox, targetLi, index, slideWH, opts, "ltr" );
					if ( opts.autoPlay ) autoPlay = setInterval(doPlay, opts.timer);
					event.preventDefault();
				});
			}

			// 导航事件
			if ( targetLi.size() ) {
				if ( opts.event == "click" ) {
					targetLi.click(function(){
						if ( autoPlay ) {
							clearInterval(autoPlay);
						}
						index = targetLi.index(this);
						$.fn.Switchable.Effect[opts.effect]( contentBox, targetLi, index, slideWH, opts );
						targetLi.eq(index).addClass("selected").siblings().removeClass("selected");
					}).hover(function(){
						$(this).addClass("hover");
					}, function() {
						$(this).removeClass("hover");
					});
				} else if ( opts.event == "hover" ) {
					targetLi.hover(function(){
						if ( autoPlay ) {
							clearInterval(autoPlay);
						}
						index = targetLi.index(this);
						$.fn.Switchable.Effect[opts.effect]( contentBox, targetLi, index, slideWH, opts );
					}, function() {
						if ( autoPlay ) clearInterval( autoPlay );
						if ( opts.autoPlay ) autoPlay = setInterval(doPlay, opts.timer);
					});
				}
			}

			// 自动播放
			if ( opts.autoPlay ) {
				autoPlay = setInterval( doPlay, opts.timer );
				contentBox.hover(function(){
					if ( autoPlay ) clearInterval( autoPlay );
				}, function() {
					if ( autoPlay ) clearInterval( autoPlay );
					if ( opts.autoPlay ) autoPlay = setInterval( doPlay, opts.timer );
				});
			}
		});
	};
	$.fn.Switchable.Default = {
		event: "click",
		effect: "none",
		autoPlay: true,
		speed: "normal",
		timer: 2000,
		nav: "J_nav",
		content: "J_content",
		steps: 1
	};
	$.fn.Switchable.Effect = {
		none: function( contentObj, navObj, i, slideW, opts ) {
			contentObj.children().eq(i).show().siblings().hide();
			if (navObj) {
				navObj.eq(i).addClass("hover").siblings().removeClass("hover");
			}
		},
		fade: function( contentObj, navObj, i, slideW, opts ) {
			contentObj.children().eq(i).stop(true, true).fadeIn(opts.speed).siblings().hide();
			if (navObj) {
				navObj.eq(i).addClass("hover").siblings().removeClass("hover");
			}
		},
		scrollX: function( contentObj, navObj, i, slideW, opts ) {
			contentObj.stop().animate({"margin-left" : -i * opts.steps * slideW}, opts.speed);
			if (navObj) {
				navObj.eq(i).addClass("hover").siblings().removeClass("hover");
			}
		},
		scrollY: function( contentObj, navObj, i, slideH, opts ) {
			contentObj.stop().animate({"margin-top" : -i * opts.steps * slideH}, opts.speed);
			if (navObj) {
				navObj.eq(i).addClass("hover").siblings().removeClass("hover");
			}
		},
		scrollTxt: function( contentObj, undefined, i, slideH, opts ) {
			contentObj.stop().animate({"margin-top" : -opts.steps * slideH}, opts.speed, function() {
				for ( var i = 0; i < opts.steps; i++ ) {
					contentObj.children(":first").appendTo(contentObj);
				}
				contentObj.css({"margin-top" : 0});
			});
		},
		scrollLoopX: function( contentObj, navObj, i, slideW, opts, direction ) {
			if (contentObj.is(":animated")) return;

			direction = direction || "rtl";
			$.fn.Switchable.ScrollLoopX[direction]( contentObj, navObj, i, slideW, opts );
		}
	};
	$.fn.Switchable.ScrollLoopX = {
		ltr: function( contentObj, navObj, i, slideW, opts ) {
			for ( var i = 0; i < opts.steps; i++ ) {
				contentObj.children(":last").prependTo(contentObj);
			}
			contentObj.css({"margin-left" : -opts.steps * slideW});
			contentObj.stop().animate({"margin-left" : 0}, opts.speed);
		},
		rtl: function( contentObj, navObj, i, slideW, opts ) {
			contentObj.stop().animate({"margin-left" : -opts.steps * slideW}, opts.speed, function(){
				for (var i = 0; i < opts.steps; i++) {
					contentObj.children(":first").appendTo(contentObj);
				}
				contentObj.css({"margin-left" : 0});
			});
		}
	}
})(jQuery);


var KISSDW = {
	// 切换器（jquery）
	switchable: function( selector, options ) {
		jQuery(selector).Switchable( options );
	},

	// Tab（jquery）
	tab: function( selector, eventType ) {
		var navLi = jQuery(selector).find(".J_nav > li"),
			contLi = jQuery(selector).find(".J_content > li");
		var classType = eventType == "hover" ? "hover" : "selected";

		if ( classType == "hover" ) {
			var timer;
			navLi.hover(function(){
				var i = navLi.index(this);
				timer = setTimeout(function(){navEvent(i, "hover");contEvent(i);}, 300);
			}, function() {
				if (timer) {
					clearTimeout(timer);
				}
			});
		} else {
			navLi.hover(function(){
				var i = navLi.index(this);
				navEvent(i, "hover");
			}, function(){
				jQuery(this).removeClass("hover");
			}).click(function(){
				var i = navLi.index(this);
				navEvent(i, "selected");
				contEvent(i);
			});
		}

		function navEvent(i, type) {
			navLi.eq(i).addClass(type).siblings().removeClass(type);
		}
		function contEvent(i) {
			contLi.eq(i).show().siblings().hide();
		}
	},

	// 导航树（jquery）
	navtree: function( showAll ) {
		if (jQuery(".sitenav").length) {
			// ie
			if (!-[1, ]) {
				jQuery(".sitenav ul").each(function(){
					jQuery(this).children("li:last-child").addClass("last-child");
				});
			}

			jQuery(".sitenav>ul>li").each(function(){
				var ul = jQuery(this).find("ul:first");
				if (!ul.length) return;

				if ( showAll ) {
					ul.attr("class", "show");
				}

				var span = jQuery("<span></span>");
				span.prependTo(ul.siblings("b"));
				span.height = ul.height();
				span.status = "visible";

				if (ul.attr("class") !== "show") {
					ul.css("height", "0");
					span.status = "hidden";
				}

				span.click(function(){
					if (span.status === "hidden") {
						span.status = "visible";
						ul.animate({height: span.height}, 500);
					}
					else {
						span.status = "hidden";
						ul.animate({height: 0}, 500);
					}
				});
			});
		}
	},

	// Tab默认日期（jquery）
	calendar: function( selector ) {
		var day = new Date().getDay(),
			dayNum = day == 0 ? 6 : day - 1;

		jQuery(selector).find(".J_nav > li").eq(dayNum).addClass("selected");
		jQuery(selector).find(".J_content > li").eq(dayNum).removeClass("hide");
	},

	// 弹框
	popupbox: function( id, options ) {
		var box = document.getElementById(id);
		if (!box) return;

		var _default = {
			existMask: true
		};
		var opts = jQuery.extend( {}, _default, options );

		// 创建遮罩，显示弹出框
		this.open = function(maskCss, boxCss) {
			this.box.style.cssText = boxCss;
			this.mask.style.cssText = maskCss;

			// 解决ie6 bug
			if(!window.XMLHttpRequest) {
				document.documentElement.scrollTop++;
				document.documentElement.scrollTop--;
			}

			if ( opts.existMask ) document.body.appendChild(this.mask);
		},

		// 关闭遮罩
		this.close = function() {
			document.getElementsByTagName("html")[0].style.backgroundImage = "";

			// ie6 清空css表达式
			this.box.style.cssText = "";
			this.box.style.display = "none";

			if ( opts.existMask ) document.body.removeChild(this.mask);
		}

		this.box = box;
		this.mask = document.createElement("div");

		// dom宽高
		this.box.style.display = "block";
		var boxWidth = this.box.clientWidth,
			boxHeight = this.box.clientHeight;

		// 创建遮罩，显示弹出框
		var maskCss = "position:fixed;left:0;top:0;z-index:32766;width:100%;height:100%;filter:alpha(opacity=70);-moz-opacity:0.7;opacity:0.7;background:#000;",
			boxCss = "display:block;position:fixed;left:50%;top:50%;z-index:32767;margin:-" + boxHeight / 2 + "px 0 0 -" + boxWidth / 2 + "px;";
		// ie6
		if(!window.XMLHttpRequest) {
			// ie6 css表达式
			maskCss += "position:absolute;top:expression(documentElement.scrollTop);height:expression(document.documentElement.clientHeight);";
			boxCss += "position:absolute;top:expression(documentElement.scrollTop + document.documentElement.clientHeight/2);";

			// 解决ie6 bug
			document.getElementsByTagName("html")[0].style.backgroundImage = "url(blank)";
		}
		this.open(maskCss, boxCss);

		// 关闭弹出框事件设置（约定关闭按钮classname为btn-close）
		var tags = this.box.getElementsByTagName("*");
		for (var i = 0; i < tags.length; i++) {
			if (tags[i].className == "btn-close") {
				var self = this;
				tags[i].onclick = function() {
					self.close();
					return false;
				}
				break;
			}
		}
	},

	// 特殊连接提示框
	datatip: function( imgsrc ) {
		if (imgsrc) {
			document.write('<style type="text/css">#data-tip b, #data-tip div{background-image:url(' + imgsrc + ')}</style>');
		}

		// 相对mouse位置
		var offset = {x : 15, y : 15};

		// 分配事件
		var aTags = document.getElementsByTagName("a");
		for (var i = 0; i < aTags.length; i++) {
			if (aTags[i].getAttribute("data-tip") != null) {
				aTags[i].onmouseover = mouseover;
				aTags[i].onmousemove = mousemove;
				aTags[i].onmouseout = mouseout;
			}
		}

		// 鼠标移上或离开
		function isMouseLeaveOrEnter(e, handler) {
			if (e.type != 'mouseout' && e.type != 'mouseover') return false;

			var reltg = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement;
			while (reltg && reltg != handler)
				reltg = reltg.parentNode;
			return (reltg != handler);
		}

		// 鼠标移上
		function mouseover() {
			var event = window.event || arguments[0],
				srcElement = event.srcElement || event.target;
			if(!isMouseLeaveOrEnter(event, this)) return;

			while (srcElement && !srcElement.getAttribute("data-tip")) srcElement = srcElement.parentNode;
			html = "<b></b><div>" + srcElement.getAttribute("data-tip") + "</div>";

			var tip = document.getElementById("data-tip");
			if (tip) {
				tip.innerHTML = html;
				tip.style.display = "block";
			} else {
				var tip = document.createElement("div");
				tip.id = "data-tip";
				tip.innerHTML = html;
				document.body.appendChild(tip);
			}
		}

		// 鼠标移动（在目标上）
		function mousemove() {
			var tip = document.getElementById("data-tip");
			if (!tip) return;

			var event = window.event || arguments[0];
			var pos = mousecoords(event);
			tip.style.left = (pos.x + offset.x) + "px";
			tip.style.top = (pos.y + offset.y) + "px";
		}

		// 鼠标离开
		function mouseout() {
			var event = window.event || arguments[0];
			if (!isMouseLeaveOrEnter(event, this)) return;

			var tip = document.getElementById("data-tip");
			if (!tip) return;

			tip.style.display = "none";
		}

		// 鼠标位置
		function mousecoords(event) {
			if (event.pageX) {
				return {x : event.pageX, y : event.pageY};
			} else {
				return {
					x : event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft),
					y : event.clientY + (document.documentElement.scrollTop || document.body.scrollTop)
				}
			}
		}
	},

	// 设为首页
	setHomePage: function( obj ) {
		var aUrls=document.URL.split("/");
	    var vDomainName="http://"+aUrls[2]+"/";
	    try{//IE
	        obj.style.behavior="url(#default#homepage)";
	        obj.setHomePage(vDomainName);
	    }catch(e){//other
	        if(window.netscape) {//ff
	            try {
	                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	            }
	            catch (e) {
	                    alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将[signed.applets.codebase_principal_support]设置为'true'");
	            }
	            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
	            prefs.setCharPref('browser.startup.homepage',vDomainName);
	         };
	    };
	},

	// 加入收藏
	addFavorite: function() {
		var aUrls=document.URL.split("/");
	    var vDomainName="http://"+aUrls[2]+"/";
	    var description=document.title;
	    try{//IE
	        window.external.AddFavorite(vDomainName,description);
	    }catch(e){//FF
	        window.sidebar.addPanel(description,vDomainName,"");
	    };
	},

	// 复制地址
	copyURL: function() {
		var myHerf=top.location.href;
		var title=document.title;
		if(window.clipboardData){
			var tempCurLink=title + "\n" + myHerf;
			var ok=window.clipboardData.setData("Text",tempCurLink);
			if(ok) alert("复制成功！按Ctrl+V ,粘贴到QQ或微博上发给你的好友们吧！");
		}else{prompt("按Ctrl+C复制当前网址", myHerf + " " + title);}
	},

	// 三级菜单
	jsmenu: function( selector ) {
		var jsMenu = jQuery(selector);

		/* 二级菜单top */
		var height = jQuery(">ul>li", jsMenu).height();
		jQuery(">ul>li>ul", jsMenu).css({top: height});

		/* 二三级菜单水平对齐 */
		var width = jQuery("ul>li>ul", jsMenu).width();
		jQuery("ul ul ul", jsMenu).css({left: width}).siblings("a").addClass("expand");
		jQuery(">ul>li:last>ul", jsMenu).css({left: "auto",right: 0}).find("ul").css({left: "auto", right: width});

		jQuery("li", jsMenu).hover(
			function () {
				jQuery(this).addClass("hover");
			},
			function () {
				jQuery(this).removeClass("hover");
			}
		);
	},

	// 提前加载图片
	preLoadImg: function(urls) {
		for ( var i = 0; i < urls.length; i++ ) {
			var img = new Image();
			img.src = urls[i];
		}
	},

	// 固定位置块
	/*
	 * vertical的值为"top"或"bottom"
	 * num为vertical相对应的数值（单位为整数）
	 * closeId为关闭固定位置块的按钮id
	 */
	fixedPosition: function( id, vertical, num, closeId ) {
		var timer,
			el = document.getElementById(id),
			elHeight = el.clientHeight,
			closeEl = document.getElementById(closeId);

		if ( !el ) return;
		if ( vertical != "top" && vertical != "bottom" ) return;
		if ( isNaN(num) ) return;

		// 关闭
		if ( !!closeEl ) {
			closeEl.onclick = function() {
				el.parentNode.removeChild(el);
			}
		}

		if ( window.XMLHttpRequest ) return;

		// ie6

		// 事件
		window.resize = function(){setTop()}
		window.onscroll = function(){setTop()}

		function setTop() {
			if ( !el ) return;
			el.style.display = "none";
			if ( timer ) clearTimeout(timer);
			timer = setTimeout(function(){
				el.style.top = getTop();
				jQuery(el).fadeIn();
			}, 100);
		}

		function getTop() {
			var _t = document.documentElement.scrollTop || document.body.scrollTop;

			if ( vertical == "top" ) {
				return _t + num;
			}  else if ( vertical == "bottom" ) {
				var _h = document.documentElement.clientHeight || document.body.clientHeight;
				return _t + _h - elHeight - num;
			}
		}
	}
};

// 特殊处理
jQuery(function(){
	jQuery('#J_BackToTop').click(function(){
		jQuery('html,body').animate({scrollTop:0},0);
		return false;
	});
});