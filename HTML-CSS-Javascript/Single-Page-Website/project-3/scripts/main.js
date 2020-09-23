"use strict";

let barNav = document.querySelector(".fa-bars");
barNav.onclick = function () {
    let mainNav = document.querySelector(".main-nav");
    mainNav.classList.toggle("show-nav");
};


window.onscroll = function () {
    let mainNav = document.querySelector(".main-nav");
    if (document.documentElement.scrollTop > 100) {
        mainNav.classList.add("slide-down");
    } else {
        mainNav.className = mainNav.className.replace(" slide-down", "");
    }
};


let galleryImages = document.querySelectorAll(".image-gallery img");

for (let i = 0; i < galleryImages.length; i++) {
    galleryImages[i].onclick = function () {
        let image = document.querySelector(".image");
        image.src = this.src;

        let imageTitle = document.querySelector(".image-title");
        imageTitle.textContent = this.alt;

        let imageGallery = document.querySelector(".image-preview");
        imageGallery.style.display = "flex";

        imageGallery.onclick = function () {
            this.style.display = "none";
        };
    };
}