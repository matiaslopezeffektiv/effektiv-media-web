/***************************************************
==================== JS INDEX ======================
****************************************************

01. PreLoader Js
02. Mobile Menu Js
03. Common Js
04. Nice Select Js
05. MagnificPopup Image View
06. MagnificPopup Video View
07. Counter Js
08. Back-to-Top
09. Smooth Scroll Js
10. Sticky Header Js
11. Open Handlers
12. Close Handlers
13. Overlay Not Working Js
14. Search Border Style
15. Scroll Wrapper
16. Button Hover Animation
17. Button Move Animation
18. Pricing
19. Fade Class Active
20. Progress Area
21. Character Animation
22. Si-Text Reveal Animation
23. Service Hover Animation Js
24. text animation

/***************************************************
==================== JS INDEX ======================
****************************************************/

(function ($) {
	"use strict";

	var windowOn = $(window);
	
	// 01. PreLoader Js //
	$(window).on('load', function () {
		$("#preloader").fadeOut(500);
	});
	$(window).on('load', function () {
		$("#loading").fadeOut(500);
	});


    // 02. mobile menu Js //
	let siMenuWrap = $('.si-mobile-menu-active > ul').clone();
	let siSideMenu = $('.si-offcanvas-menu nav');
	siSideMenu.append(siMenuWrap);
	if ($(siSideMenu).find('.submenu, .mega-menu').length != 0) {
	   $(siSideMenu).find('.submenu, .mega-menu').parent().append
	   ('<button class="si-menu-close"><i class="fa-solid fa-plus"></i></button>');
	}
	let sideMenuList = $('.si-offcanvas-menu nav > ul > li button.si-menu-close, .si-offcanvas-menu nav > ul li.has-dropdown > a, .si-offcanvas-menu nav > ul li.has-dropdown > ul > li.menu-item-has-children > a');
	$(sideMenuList).on('click', function (e) {
		e.preventDefault();
		$(this).parent().toggleClass('active');
		$(this).siblings('.submenu, .mega-menu').slideToggle();
	});


	// 03. Common Js //
	$("[data-bg-color]").each(function () {
		$(this).css("background-color", $(this).attr("data-bg-color"));
	});

	$("[data-background").each(function () {
		$(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
	});

	$("[data-width]").each(function () {
		$(this).css("width", $(this).attr("data-width"));
	});

	$("[data-text-color]").each(function () {
		$(this).css("color", $(this).attr("data-text-color"));
	});

	// 04. Nice Select Js //
	$('.si-select select').niceSelect();

	// 05. magnificPopup img view //
	$('.popup-image').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});

	// 06. magnificPopup video view //
	$(".popup-video").magnificPopup({
		type: "iframe",
	});

	// 07. Counter Js //
	new PureCounter();
	new PureCounter({
		filesizing: true,
		selector: ".filesizecount",
		pulse: 2,
	});

	// 08. back-to-top //
	function back_to_top() {
		
		let btn = $('#back_to_top');
		let btn_wrapper = $('.back-to-top-wrapper');

		$(window).on('scroll',function () {
			if ($(window).scrollTop() > 300) {
				btn_wrapper.addClass('back-to-top-btn-show');
			} else {
				btn_wrapper.removeClass('back-to-top-btn-show');
			}
		});

		$(btn).on('click', function (e) {
			e.preventDefault();
			$('html, body').animate({ scrollTop: 0 }, '300');
		});
	}
	back_to_top();
	
	// 09. Smooth Scroll Js //
	function smoothSctoll() {
		$('.smooth a').on('click', function (event) {
			let target = $(this.getAttribute('href'));
			if (target.length) {
				event.preventDefault();
				$('html, body').stop().animate({
					scrollTop: target.offset().top - 60
				}, 1500);
			}
		});
	}
	smoothSctoll();

	// 10. Sticky Header Js //
	$(window).on('scroll', function () {
		let scroll = $(window).scrollTop();
		if (scroll < 20) {
			$("#header-sticky").removeClass("header-sticky");
		} else {
			$("#header-sticky").addClass("header-sticky");
		}
	});
	
	// 10. Sticky Header Js //
	$(window).on('scroll', function () {
		let scroll = $(window).scrollTop();
		if (scroll < 20) {
			$("#header-2-sticky").removeClass("header-2-sticky");
		} else {
			$("#header-2-sticky").addClass("header-2-sticky");
		}
	});
	
	// 10. Sticky Header Js //
	$(window).on('scroll', function () {
		let scroll = $(window).scrollTop();
		if (scroll < 20) {
			$("#header-sticky-black").removeClass("header-sticky-black");
		} else {
			$("#header-sticky-black").addClass("header-sticky-black");
		}
	});

	// 11. Open Handlers //
	$(".si-offcanvas-open-btn").on("click", function () {
		$(".si-offcanvas-area, .si-offcanvas-2-area, .body-overlay").addClass("opened");
	});
	
	$(".si-search-open-btn").on("click", function () {
		$(".si-search-area, .body-overlay").addClass("opened");
	});
	
	$(".cartmini-open-btn").on("click", function () {
		$(".cartmini__area").addClass("cartmini-opened");
		$(".body-overlay").addClass("opened");
	});
  
	// 12. Close Handlers //
	$(".si-offcanvas-close-btn, .si-offcanvas-2-close-btn, .si-search-close-btn, .cartmini-close-btn, .body-overlay").on("click", function () {
		$(".si-offcanvas-area, .si-offcanvas-2-area, .si-search-area, .cartmini__area").removeClass("opened cartmini-opened");
		$(".body-overlay").removeClass("opened");
	});

	// 13. overlay not working js //
	$('.si-offcanvas-open-btn').on('click', function () {
		const hasOffcanvas2 = $('.si-offcanvas-2-area').length;
		$('.body-overlay').toggleClass('opened', !hasOffcanvas2);
	});

	// 14. search border style //
	if ($('.search-input').length > 0) {
		const tpInput = document.querySelector('.search-input');
		const searchWrapper = document.querySelector('.search');
	
		tpInput.addEventListener('focus', () => {
		searchWrapper.classList.add('focused');
		});
		tpInput.addEventListener('blur', () => {
			searchWrapper.classList.remove('focused');
		});
	}

	// 15. scroll wrapper //
	gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
	if($('#smooth-wrapper').length && $('#smooth-content').length){
		ScrollSmoother.create({
			smooth: 1.35,
			effects: false,
			smoothTouch: .1,
			ignoreMobileResize: true
		})
	}

	// 16. button hover animation //
	$('.si-circle-btn').on('mouseenter', function (e) {
		var x = e.pageX - $(this).offset().left;
		var y = e.pageY - $(this).offset().top;

		$(this).find('.si-circle-btn-dot').css({
			top: y,
			left: x
		});
	});

  	// 17. Button Move Animation //
	const all_btn = gsap.utils.toArray(".si-circle-btn-wrap");
	const all_btn_circle = gsap.utils.toArray(".btn-item");

	if (all_btn.length && all_btn_circle.length) {
		all_btn.forEach((btn, i) => {
			const circle = all_btn_circle[i];

			// Mouse move = parallax effect
			$(btn).on("mousemove", function (e) {
			const $this = $(this);
			const relX = e.pageX - $this.offset().left;
			const relY = e.pageY - $this.offset().top;
				gsap.to(circle, {
					duration: 0.5,
					x: ((relX - $this.width() / 2) / $this.width()) * 80,
					y: ((relY - $this.height() / 2) / $this.height()) * 80,
					ease: "power2.out",
				});
			});
			// Mouse leave = reset effect
			$(btn).on("mouseleave", function () {
				gsap.to(circle, {
					duration: 0.5,
					x: 0,
					y: 0,
					ease: "power2.out",
				});
			});
		});
	}

	// 18. Pricing //
    $(".tab-annual-price").hide();
    $(".monthly_tab_title").addClass("active");

    // Monthly button click
    $(".monthly_tab_title").on("click", function() {
        $(".monthly_tab_title").addClass("active");
        $(".annual_tab_title").removeClass("active");

        $(".tab-annual-price").hide();
        $(".tab-monthly-price").show();
        $(".pricing-tab").removeClass("seleceted");
    });

    // Yearly button click
    $(".annual_tab_title").on("click", function() {
        $(".annual_tab_title").addClass("active");
        $(".monthly_tab_title").removeClass("active");

        $(".tab-monthly-price").hide();
        $(".tab-annual-price").show();
        $(".pricing-tab").addClass("seleceted");
    });

	// 19. fade-class-active //
	if ($(".si_fade_anim").length > 0) {
		gsap.utils.toArray(".si_fade_anim").forEach((item) => {
			let tp_fade_offset = item.getAttribute("data-fade-offset") || 40,
				tp_duration_value = item.getAttribute("data-duration") || 0.75,
				tp_fade_direction = item.getAttribute("data-fade-from") || "bottom",
				tp_onscroll_value = item.getAttribute("data-on-scroll") || 1,
				tp_delay_value = item.getAttribute("data-delay") || 0.15,
				tp_ease_value = item.getAttribute("data-ease") || "power2.out",
				tp_anim_setting = {
					opacity: 0,
					ease: tp_ease_value,
					duration: tp_duration_value,
					delay: tp_delay_value,
					x: (tp_fade_direction == "left" ? -tp_fade_offset : (tp_fade_direction == "right" ? tp_fade_offset : 0)),
					y: (tp_fade_direction == "top" ? -tp_fade_offset : (tp_fade_direction == "bottom" ? tp_fade_offset : 0)),
			    };
			if (tp_onscroll_value == 1) {
				tp_anim_setting.scrollTrigger = {
					trigger: item,
					start: 'top 85%',
				};
			}
			gsap.from(item, tp_anim_setting);
		});
	}

	// 20. Progress-Area //
	let progressBars = $(".progress-area");
	let observer = new IntersectionObserver(function (progressBars) {
		progressBars.forEach(function (entry, index) {
			if (entry.isIntersecting) {
				let width = $(entry.target)
					.find(".progress-bar")
					.attr("aria-valuenow");
				let count = 0;
				let time = 1000 / width;
				let progressValue = $(entry.target).find(".progress-value");
				setInterval(() => {
					if (count == width) {
						clearInterval();
					} else {
						count += 1;
						$(progressValue).text(count + "%");
					}
				}, time);
				$(entry.target)
					.find(".progress-bar")
					.css({ width: width + "%", transition: "width 1s linear" });
			} else {
				$(entry.target)
					.find(".progress-bar")
					.css({ width: "0%", transition: "width 1s linear" });
			}
		});
	});
	progressBars.each(function () {
		observer.observe(this);
	});
	$(window).on("unload", function () {
		observer.disconnect();
	});

	// 21. carachter Animation //
	if ($('.si-char-animation').length > 0) {
		let char_come = gsap.utils.toArray(".si-char-animation");
		char_come.forEach(splitTextLine => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: splitTextLine,
					start: 'top 90%',
					end: 'bottom 60%',
					scrub: false,
					markers: false,
					toggleActions: 'play none none none'
				}
			});
			const itemSplitted = new SplitText(splitTextLine, { type: "chars, words" });
			gsap.set(splitTextLine, { perspective: 300 });
			itemSplitted.split({ type: "chars, words" })
			tl.from(itemSplitted.chars,
				{
					duration: 1,
					delay: 0.5,
					x: 100,
					autoAlpha: 0,
					stagger: 0.05
				});
		});
	}

	// 22. si-text-revel-anim //
	const si_anim_reveal = document.querySelectorAll(".si-text-revel-anim");
	si_anim_reveal.forEach(areveal => {
		const getAttributeValue = (attr, defaultValue) => areveal.getAttribute(attr) || defaultValue;
		const duration_value = parseFloat(getAttributeValue("data-duration", 1));
		const onscroll_value = parseInt(getAttributeValue("data-on-scroll", 1));
		const stagger_value = parseFloat(getAttributeValue("data-stagger", 0.02));
		const data_delay = parseFloat(getAttributeValue("data-delay", 0.05));
		const ease_value = getAttributeValue("data-ease", "circ.out");

		areveal.split = new SplitText(areveal, { type: "lines,words,chars", linesClass: "si-revel-line" });
		const animationProps = {
			duration: duration_value,
			delay: data_delay,
			ease: ease_value,
			y: 80,
			stagger: stagger_value,
			opacity: 0,
		};

		if (onscroll_value === 1) {
			areveal.anim = gsap.from(areveal.split.chars, {
				scrollTrigger: {
					trigger: areveal,
					start: 'top 85%',
				},
				...animationProps,
			});
		} else {
			areveal.anim = gsap.from(areveal.split.chars, animationProps);
		}
	});

    // 23. Service Hover Animation Js
    $('.si-service-list-wrap .si-service-list-item').on("mouseenter", function () {
        $('#si-service-thumb').removeClass().addClass($(this).attr('rel'));
        $(this).addClass('active').siblings().removeClass('active');
    });

	// 24. text animation //
	const tm = gsap.matchMedia();
	tm.add("(min-width: 991px)", () => {
		let tl_team = gsap.timeline();
		let panels = document.querySelectorAll('.si-project-2-area')
		panels.forEach((section, index) => {
			tl_team.to(section, {
				scrollTrigger: {
					trigger: '.si-project-2-area',
					pin: '.si-project-2-title-box',
					scrub: 1,
					start: 'top 17%',
					end: "bottom 90%",
					endTrigger: '.si-project-2-area',
					pinSpacing: false,
					markers: false,
				},
			})
		})
	});


})(jQuery);