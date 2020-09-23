"use strict";

let lastFadeEffect;

function closeSideNav() {
    let sideNav = document.getElementById("sideNav");

    if (lastFadeEffect === "pushOffCanvas") {
        let col2 = document.querySelector(".col-2");
        col2.style.marginLeft = "0";
    } else if (lastFadeEffect === "pushWOOpacity") {
        let col2 = document.querySelector(".col-2");
        col2.style.marginLeft = "0";
        let col2Overlay = document.querySelector(".col-2-overlay");
        col2Overlay.className = "col-2-overlay";
    }

    sideNav.style.width = "0";
}

function sideNav(fadeEffect) {
    let sideNav = document.getElementById("sideNav");
    
    if (lastFadeEffect !== undefined) {
        sideNav.className = "sidenav-overlay col-1";
        
        if (sideNav.attributes.style !== undefined) {
            sideNav.attributes.removeNamedItem("style");
        }

        lastFadeEffect = undefined;
    }

    let col2 = document.querySelector(".col-2");
    switch (fadeEffect) {
        case "overlay": sideNav.classList.add("overlay");
            lastFadeEffect = "overlay";
            break;
        case "overlayWOAnimation": sideNav.classList.add("overlayWOAnimation");
            lastFadeEffect = "overlayWOAnimation";
            break;
        case "pushOffCanvas": sideNav.classList.add("pushOffCanvas");
            col2.style.marginLeft = "235px";
            lastFadeEffect = "pushOffCanvas";
            break;
        case "pushWOOpacity": sideNav.classList.add("pushWOOpacity");
            col2.style.marginLeft = "235px";
            let col2Overlay = document.querySelector(".col-2-overlay");
            col2Overlay.classList.add("blur");
            lastFadeEffect = "pushWOOpacity";
            break;
        case "fullWidth": sideNav.classList.add("fullWidth");
            lastFadeEffect = "fullWidth";
    }
}