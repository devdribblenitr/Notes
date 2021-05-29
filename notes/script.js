// navbar 
function openFunction(){
    document.getElementById("sidebar-wrapper").style.transform="translateX(0)";
    document.getElementById("toggler-icon").style.display="none";
    document.getElementById("closebtn").style.display="block";
}
function closeFunction(){
    document.getElementById("sidebar-wrapper").style.transform="translateX(-250px)";
    document.getElementById("closebtn").style.display="none";
    document.getElementById("toggler-icon").style.display="block";
}

//side bar

function opensideFunction(){
    document.getElementById("side2").style.display="none";
}


/*cards swiper js for latest notes and oters card*/
var mySwiper = new Swiper ('.swiper-separeator2', {
	loop: true,
	autoplay:{
		delay: 2000,
	},
	slidesPerView: 3,
	spaceBetween: 30,
	breakpoints: {
		1200: {
			slidesPerView: 3
    },
    768: {
			slidesPerView: 2
        },
        425: {
			slidesPerView: 1
		}
	}

});



/*cards swiper js for trade and oters card ends here*/
