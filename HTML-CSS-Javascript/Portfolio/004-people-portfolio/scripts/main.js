"use strict";

function showHideSideNav() {
    document.querySelector(".col-1").classList.toggle("show-col-1");
}


function imagePreview() {
    this.classList.toggle("image-preview");
};

let images = document.querySelectorAll("#portfolio .photo-card");

for (let image of images) {
    image.onclick = imagePreview;
}