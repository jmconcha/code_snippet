"use strict";

let menuBar = document.querySelector(".menu-bar");

menuBar.onclick = function () {
    this.classList.toggle("close-icon");
};