/* jQuery simple slider */
(function($) {

"use strict";

var
supportCss3 = function( value ) {
	var el = document.createElement('div');
	switch(value) {
		case "transform":
			var prefix = {
				transform       : "transform",
				webkitTransform : "-webkit-transform",
				mozTransform    : "-moz-transform",
				msTransform     : "-ms-transform",
				oTransform      : "-o-transform"
			}
		break;
		case "transition":
			var prefix = {
				transition       : 'transition',
				webkitTransition : 'webkitTransition',
				mozTransition    : 'mozTransition',
				oTransition      : 'oTransition'
			}
		break;
	}
	for(var name in prefix) {
		if(el.style[name] !== undefined) {
			return prefix[name];
		}
	}
	return false;
},
transform  = supportCss3("transform"),
transition = supportCss3("transition");


$.fn.sliderUi = function(o) {
	o = $.extend({
		autoPlay: true,
		delay: 3000,
		controlShow: true,
		arrowsShow: true,
		caption: false,
		speed: 300,
		cssEasing: "ease-out"
	}, o || {});

	return this.each(function() {
		var
			container    = $(this),
			slider       = container.find(".slider"),
			sliderStyle  = slider.get(0).style,
			arrows       = container.find(".switch"),
			caption      = slider.find(".caption"),
			img          = slider.find("img"),
			imgLen       = img.length,
			imgWidth     = container.outerWidth(true),
			sliderWidth  = imgLen * imgWidth,
			controlPanel = null,
			current      = 0,
			offset       = null,
			busy         = false,
			timer        = null;

		sliderStyle["width"] = sliderWidth + "px";
		img.width( imgWidth );
		slider.show();

		$(window).on("resize", function() {
			if(transition) {
				sliderStyle[transition] = "none";
			}
			imgWidth     = container.width();
			sliderWidth  = imgLen * imgWidth;
			img.width( imgWidth );
			if(transition && transform) {
				sliderStyle["width"] = sliderWidth + "px";
				sliderStyle[transform] = "translateX("+ -(imgWidth*current) + "px)";
			} else {
				slider.css({
					width: sliderWidth + "px",
					"margin-left": -(imgWidth*current) + "px"
				});
			}
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
					links.push("<a class='"+act+"' data-id='"+i+"'></a>");
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

			if(transition && transform) {
				sliderStyle[transition] = transform + " " + o.speed + "ms " + o.cssEasing;
				sliderStyle[transform] = "translateX(" + offset + ")";
			}
			else {
				busy = true;
				slider.animate({"margin-left": offset}, o.speed, "linear", function() {
					busy = false;
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

		if(o.autoPlay) {
			auto();
			container.hover(function() {
				clearInterval(timer);
			}, function() {
				auto();
			});
		}

	});

}

})(jQuery);
