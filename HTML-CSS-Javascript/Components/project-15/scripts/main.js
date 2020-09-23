"use strict";

let tablinks = document.querySelectorAll(".tablinks");

for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].onclick = function () {
        let cityBackgroundColor = {
            "London": "#FF0000",
            "Paris": "#008000",
            "Tokyo": "#0000FF",
            "Oslo": "#FFA500"
        };

        //reset styles
        let tabContents = document.querySelectorAll(".tab-content");
            
        for (let i = 0; i < tabContents.length; i++) {
            tabContents[i].style.display = "none";
            tablinks[i].style.backgroundColor = "";
        }
        
        //end of resetting styles
        
        let tabName = this.textContent;
        document.querySelector('.tab-content-container').style.backgroundColor = cityBackgroundColor[tabName];
        this.style.backgroundColor = cityBackgroundColor[tabName];
        document.getElementById(tabName).style.display = "block";

    };
}

document.getElementById("defaultTab").click();