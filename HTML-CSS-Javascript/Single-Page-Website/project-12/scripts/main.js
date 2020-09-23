"use strict";

let openNavBtn = document.querySelector(".btn-open-nav");
openNavBtn.onclick = mainNav;

let closeNavBtn = document.querySelector(".btn-close-nav");
closeNavBtn.onclick = mainNav;

//show and hide .main-nav
function mainNav() {
    let fullpageNavbar = document.querySelector(".fullpage-navbar");
    fullpageNavbar.classList.toggle("show-fullpage-navbar");
}


let gridPaddingBtn = document.querySelector(".btn-grid-padding");
gridPaddingBtn.onclick = gridPadding;

function gridPadding() {
    let fullpageNavbar = document.querySelector(".photolio");
    fullpageNavbar.classList.toggle("photolio-padding");
}