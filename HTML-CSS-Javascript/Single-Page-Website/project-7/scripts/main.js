"use strict";

let menuBtn = document.querySelectorAll(".btn-menu");

for (let i = 0; i < menuBtn.length; i++) {
    menuBtn[i].onclick = function () {
        let drinkMenu = document.getElementById("drink");
        let eatMenu = document.getElementById("eat");

        this.style.color = "#FFFFFF";
        this.style.backgroundColor = "#616161";

        if (this.textContent.toLowerCase() == "eat") {
            let btn = document.querySelector(".btn-drink")
            btn.style.color = "#000000";
            btn.style.backgroundColor = "#FFFFFF";

            drinkMenu.style.display = "none";
            eatMenu.style.display = "block";
        } else {
            let btn = document.querySelector(".btn-eat")
            btn.style.color = "#000000";
            btn.style.backgroundColor = "#FFFFFF";

            drinkMenu.style.display = "block";
            eatMenu.style.display = "none";  
        }
        
    };
}

menuBtn[0].click();