let hamburger = document.querySelector(".hamburger");

hamburger.onclick = function () {
    let links = document.querySelectorAll(".links");

    for (let i = 0; i < links.length; i++) {
        links[i].classList.toggle("show");
    }
};