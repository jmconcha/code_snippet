"use strict";

let tablinks = document.querySelectorAll(".tablinks");

for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].onclick = function () {
        let backgroundColors = {
            "Home": "#FF0000",
            "News": "#008000",
            "Contact": "#0000FF",
            "About": "#FFA500"
        };
        //reset styles
        let tabs = document.querySelectorAll(".tab-content");

        for (let j = 0; j < tablinks.length; j++) {
            tabs[j].style.display = "none";
            tablinks[j].style.backgroundColor = "";
        }

        //end of resetting styles

        document.getElementById(this.textContent).style.display = "block";
        this.style.backgroundColor = backgroundColors[this.textContent];
    };
}

document.getElementById("defaultTab").click();