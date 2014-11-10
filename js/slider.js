/*
 * $(".slider-container").sliderUi();
 * Author ivan.kuzmichov@gmail.com
 */
(function($) {

"use strict";

$.fn.sliderUi = function(o) {
	o = $.extend({
		autoPlay: true,
		delay: 3000,
		controlShow: true,
		arrowsShow: true,
		caption: false,
		speed: 300,
		jsEasing: "swing",
		cssAnimate: true,
		cssEasing: "ease-out"
	}, o || {});

	return this.each(function() {
		var
			container    = $(this),
			slider       = container.find(".slider"),
			arrows       = container.find(".switch"),
			caption      = slider.find(".caption"),
			img          = slider.find("img"),
			imgLen       = img.length,
			imgWidth     = container.width(),
			sliderWidth  = imgLen * imgWidth,
			controlPanel = null,
			current      = 0,
			offset       = null,
			busy         = false,
			timer        = null;

		slider.css("width", sliderWidth + "px");
		img.width( imgWidth );
		slider.show();

		$(window).on("resize", function() {
			if(o.cssAnimate) {
				slider.css("transition", "none")
			}
			imgWidth     = container.width();
			sliderWidth  = imgLen * imgWidth;
			img.width( imgWidth );
			slider.css({
				width: sliderWidth + "px",
				marginLeft: -(imgWidth*current) + "px"
			});
		})

		!o.caption && caption.remove();

		if( o.controlShow) {
			controlPanel = $("<div/>", {
				"class": "slider-nav"
			})
			.appendTo(container);

			// Control links
			var links = [];
			for(var i = 0; imgLen > i; i++) {
				var act = (current === i) ? "active" : "";
					links.push("<a href='#' class='"+act+"' data-id='"+i+"'></a>");
			}
			controlPanel.get(0).innerHTML = links.join("");

			var navControl = controlPanel.find("a");
			navControl.on("click", function(e) {
				e.preventDefault();
				current = this.getAttribute("data-id");
				show("current");
			})
		}

		var show = function(side) {
			if(busy) return;

			if(side === "next") {
				if(current < imgLen - 1) {
					offset = - (imgWidth*(++current)) + "px";
				}
				else {
					offset = 0;
					current  = 0;
				}
			}
			else if(side === "current") {
				offset = - (imgWidth*current) + "px";
			}
			else {
				if(current > 0) {
					offset = - (imgWidth*(--current)) + "px";
				}
				else {
					offset = - (imgWidth*(imgLen - 1)) + "px";
					current  = imgLen -1;
				}
			}
			if(o.controlShow) {
				navControl.removeClass("active");
				navControl.eq(current).addClass("active");
			}

			if(!o.cssAnimate) {
				busy = true;
				slider.animate({"margin-left": offset}, o.speed, o.easing, function() {
					busy = false;
				})
			}
			else {
				slider.css({
					transition: "margin-left " + o.speed + "ms " + o.cssEasing,
					marginLeft: offset
				})
			}

		}

		if(o.arrowsShow) {
			arrows.on("click", function(e) {
				e.preventDefault();
				var side = this.id;
				show(side);
			})
		}
		else {
			arrows.remove();
		}

		var auto = function() {
			if(timer) clearInterval(timer);
			timer = setInterval(function() {
				show("next");
			}, o.delay);
		}

		if(o.autoPlay) auto();
		if(o.autoPlay)
			container.hover(function() {
				clearInterval(timer);
			}, function() {
				auto();
			});
	});

}

})(jQuery);