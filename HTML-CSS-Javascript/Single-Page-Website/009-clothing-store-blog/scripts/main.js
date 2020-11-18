"use strict";

let dropDown = document.querySelector(".btn-dropdown");
dropDown.onclick = function () {
    let dropDownNav = document.querySelector(".jeans");
    
    if (dropDownNav.style.display == "block") {
        dropDownNav.style.display = "none";
    } else {
        dropDownNav.style.display = "block";
    }
};


function showSideBar() {
    let sideBar = document.querySelector("body > .col-1");
    
    sideBar.classList.toggle("show-sidebar");
}

let btnShowSidebar = document.querySelector(".btn-show-sidebar");
btnShowSidebar.onclick = showSideBar;

let btnCloseSidebar = document.querySelector(".btn-exit-nav");
btnCloseSidebar.onclick = showSideBar;