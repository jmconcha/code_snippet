"use strict";

let openNavBtn = document.querySelector(".btn-open-nav");
openNavBtn.onclick = function () {
    let mainNav = document.querySelector(".main-nav");
    mainNav.classList.add("show-nav");
};

let closeNavBtn = document.querySelector(".btn-close-nav");
closeNavBtn.onclick = function () {
    let mainNav = document.querySelector(".main-nav");
    mainNav.className = mainNav.className.replace(" show-nav", "");
};



// "use strict";

// let openNavBtn = document.querySelector(".btn-open-nav");
// openNavBtn.onclick = function () {
//     let mainNav = document.querySelector(".main-nav");
//     mainNav.classList.add("show-nav");
// };

// let closeNavBtn = document.querySelector(".btn-open-nav");
// closeNavBtn.onclick = function () {
//     let mainNav = document.querySelector(".main-nav");
//     mainNav.className = mainNav.className.replace(" show-nav");
// };