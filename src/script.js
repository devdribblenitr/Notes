// navbar 
function openFunction(){
    document.getElementById("menu").style.transform="translateX(0)";
}
function closeFunction(){
    document.getElementById("menu").style.transform="translateX(-100%)";
}


//swiper carousel
// Params

var sliderSelector = '.swiperr',
    options = {
      init: false,
      loop: true,
      speed:800,
      slidesPerView: 1, // or 'auto'
      //spaceBetween: -10,
      centeredSlides : true,
      effect: 'coverflow', // 'cube', 'fade', 'coverflow',
      coverflowEffect: {
        rotate: 0, // Slide rotate in degrees
        stretch: 0, // Stretch space between slides (in px)
        depth: 0, // Depth offset in px (slides translate in Z axis)
        modifier: 0, // Effect multipler
        slideShadows : true, // Enables slides shadows
        //autoplay: 5000,
        speed: 800,
        spaceBetween: 0,
        autoplayDesableOnInteraction: false, 
        //mousewheelControl: true,
        
      },
      grabCursor: true,
      parallax: true,
      autoplay: 500,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      mousewheel: 
      {
        invert: true,
        releaseOnEdges: false,sensitivity: 0,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        1023: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      },
      // Events
      on: {
        imagesReady: function(){
          this.el.classList.remove('loading');
        }
      }
    };

    


    var mySwiper = new Swiper ('.swiperr', 
	{
    speed:1000,
		direction: 'horizontal',
		zoom: true,
		keyboard: 
		{
			enabled: true,
			onlyInViewport: false,
		},
		mousewheel: 
		{
			invert: true,
		},
    autoplay: 
    {
      delay: 2000,
    },
    loop: true,
	});









var mySwiper = new Swiper(sliderSelector, options);

// Initialize slider
mySwiper.init();



//swiper carousel ends

/*cards swiper js for trade and oters card*/
var mySwiper = new Swiper ('.swiper-separeator2', {
	loop: true,
	autoplay:{
		delay: 2000,
	},
	slidesPerView: 4,
	spaceBetween: 30,
	breakpoints: {
		1200: {
			slidesPerView: 3
    },
    768: {
      
			slidesPerView: 1
		}
	}

});



/*cards swiper js for trade and oters card ends here*/

