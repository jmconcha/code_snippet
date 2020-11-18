"use strict";

let showNavBtn = document.querySelector(".fa-bars");

showNavBtn.onclick = function () {
    let mainNav = document.querySelector(".main-nav");
    mainNav.classList.toggle("show-nav");
};

// stores the number of current visible .hero in .hero-image
let heroImageNumber = 2;
// .hero-image slideshow
let heroImageSlideShow = setInterval(
    function () {
        if (heroImageNumber > 3) {
            heroImageNumber = 1;
        }
        for (let i = 1; i < 4; i++) {
            document.querySelector(".hero-image .row-" + i).style.display = "none";
        }
        document.querySelector(".hero-image .row-" + heroImageNumber).style.display = "block";
        heroImageNumber++;
    }, 3000);

// clear interval, stops heroImageSlideShow
// for development purposes    
// clearInterval(heroImageSlideShow);