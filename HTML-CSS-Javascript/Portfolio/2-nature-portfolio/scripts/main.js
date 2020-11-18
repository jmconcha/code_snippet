"use strict";

let showSideBarBtn = document.querySelector(".btn-show-sidebar");
showSideBarBtn.onclick = sideBar;

let closeSideBarBtn = document.querySelector(".btn-close-sidebar");
closeSideBarBtn.onclick = sideBar;


function sideBar() {
    let sideBar = document.querySelector(".sidebar");
    sideBar.classList.toggle("show-sidebar");
}