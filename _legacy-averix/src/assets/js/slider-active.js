(function ($) {
	"use strict";

	// Marquee Active

	var si_marquee_slide = new Swiper(".si-marquee-active", {
		loop: true,
		freemode: true,
		slidesPerView: 'auto',
		spaceBetween: 165,
		centeredSlides: true,
		allowTouchMove: false,
		speed: 5000,
		autoplay: {
		  delay: 1,
		  disableOnInteraction: true,
		},
	});

	// Project

	var swiper = new Swiper(".si-project", {
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,
		navigation: {
		prevEl: ".si-button-prev",
		nextEl: ".si-button-next",
		},
		breakpoints: {
		1920: {
			slidesPerView: 2,
			},
		1400: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 1,
		},
		0: {
			slidesPerView: 1,
		},
		},
	});

	
    // Testimonial active

	var swiper = new Swiper(".card-testimonial", {
		slidesPerView: 1,
		loop: false,
		spaceBetween: 30,
		scrollbar: {
			el: ".si-swiper-scrollbar",
		},
		breakpoints: {
		1920: {
			slidesPerView: 1,
			},
		1400: {
			slidesPerView: 1,
		},	  
		992: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 1,
		},
		0: {
			slidesPerView: 1,
		},
		},
	});

    var swiper = new Swiper(".swiper-testimonial-3", {
      spaceBetween: 30,
	  loop: true,
      navigation: {
        nextEl: ".si-button-next",
        prevEl: ".si-button-prev",
      },
	  breakpoints: {
		1920: {
			slidesPerView: 2,
			},
		1400: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 1,
		},
		0: {
			slidesPerView: 1,
		},
		},
    });

	// testimonial-active
	
    document.addEventListener('DOMContentLoaded', function () {

	// Step 1: Thumb Swiper
	var thumbSwiper = new Swiper(".si-testimonial-bottom-thumb-active", {
		direction: 'vertical',
		spaceBetween: 30,
		centeredSlides: true,
		slidesPerView: 3,
		loop: true,
		breakpoints: {
			1400: { slidesPerView: 3 },
			1200: { slidesPerView: 3 },
			992:  { slidesPerView: 3 },
			768:  { slidesPerView: 3 },
			576:  { slidesPerView: 3 },
			0:    { slidesPerView: 2 },
		},
	});

	// Step 2: Main Content Swiper
	var mainSwiper = new Swiper(".si-testimonial-content-active", {
		spaceBetween: 24,
		slidesPerView: 1,
		loop: true,
		loopedSlides: 4,
		autoplay: {
			delay: 6000,
			disableOnInteraction: false,
		},
	});

	// Step 3: author Swiper
	var authorSwiper = new Swiper(".si-testimonial-bottom-author-active", {
		spaceBetween: 24,
		slidesPerView: 1,
		loop: true,
		loopedSlides: 4,
		autoplay: {
			delay: 6000,
			disableOnInteraction: false,
		},
	});

		mainSwiper.on('slideChange', function () {
		thumbSwiper.slideToLoop(mainSwiper.realIndex);
		authorSwiper.slideToLoop(mainSwiper.realIndex);
	});

		thumbSwiper.on('click', function () {
		var realIndex = thumbSwiper.slides[thumbSwiper.clickedIndex]
				?.getAttribute('data-swiper-slide-index');
			if (realIndex !== undefined) {
				mainSwiper.slideToLoop(parseInt(realIndex));
				authorSwiper.slideToLoop(parseInt(realIndex));
			}
		});

		authorSwiper.on('click', function () {
			var realIndex = authorSwiper.slides[authorSwiper.clickedIndex]
					?.getAttribute('data-swiper-slide-index');
			if (realIndex !== undefined) {
				mainSwiper.slideToLoop(parseInt(realIndex));
				thumbSwiper.slideToLoop(parseInt(realIndex));
			}
		});

		var nextBtn = document.querySelector(".si-testimonial-next");
		if (nextBtn) {
			nextBtn.addEventListener('click', function () {
				mainSwiper.slideNext();
			});
		}
	});

	// 13. interactive gallery imgae change js
    $('.interactive-gallery-list-wrap .interactive-gallery-list-item').on("mouseenter", function () {
        $('#interactive-gallery-thumb').removeClass().addClass($(this).attr('rel'));
        $(this).addClass('active').siblings().removeClass('active');
    });55

})(jQuery);