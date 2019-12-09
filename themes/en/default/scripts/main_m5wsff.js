'use strict';

function throlle(fn,delay){
	delay || (delay=100);
	var timeout = null,
		starTime = new Date();
	clearTimeout(timeout);
	return function(){
		var endTime = new Date();
		if(endTime-starTime<delay){
			timeout = setTimeout(function(){
				fn();
				starTime = endTime;
			},delay);
		}else{
			fn();
		}
	}
}


var _rootWindow = $(window);

var header = {
	navBox: $('.header-navigation'),
	openNavigation: function(){
		$('.menu-btn').click(function(){
			$('body').addClass('open');
			$('.header-bg').fadeIn();
		});
	},
	closeNavigation: function(){
		$('.close-navigation,.header-bg').click(function(){
			$('body').removeClass('open');
			$('.header-bg').fadeOut();
		})
	},
	__init: function(){
		header.openNavigation();
		header.closeNavigation();
	}
}

var footer = {
	btObj: $('.back-top'),
	showBackTop: function(){
		$(window).scroll(function(){
			if($(this).scrollTop()>100){
				footer.btObj.removeClass('opa');
			}else{
				footer.btObj.addClass('opa');
			}
		})
	},
	backTopAnimate: function(){
		footer.btObj.on('click',function(){
			$('html,body').animate({'scrollTop': 0});
		});
	},
	__init: function(){
		footer.showBackTop();
		footer.backTopAnimate();
	}
}

$(function(){
	var wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 0,
		mobile: true,
		live: true
	});

	$('img.lazyload').lazyload({
		threshold: 200,
		effect: 'fadeIn'
	});

	wow.init();
	header.__init();
	footer.__init();

	var headerBox = $('.header'),
    	headerHeight = headerBox.height();
    var hp = 0, ht=0,bodyEle = $('body');
    _rootWindow.scroll(function(){
    	if(!bodyEle.hasClass('open')){
    		var winSTop = hp = _rootWindow.scrollTop();
	    	if(winSTop>headerHeight){
	    		bodyEle.addClass('pageScroll');
	    	}

	    	if(ht>hp||winSTop<=headerHeight){
	    		bodyEle.removeClass('pageScroll');
	    	}
    	}
    	
    	setTimeout(function(){ht = hp;},0);
    });
    
})
