"use strict";

let headers = document.querySelectorAll('.tablinks');

for (let i = 0; i < headers.length; i++) {
    headers[i].onclick = function (e) {
        resetTabContent();
        let tabContent = document.getElementById(this.textContent);
        this.className += ' active';
        tabContent.style.display = 'block';
    };
}

//reset tab-header and tab-content style values
function resetTabContent() {
    let tabsContent = document.querySelectorAll('.tab-content');
    for (let i = 0; i < tabsContent.length; i++) {
        headers[i].className = headers[i].className.replace(' active', '');
        tabsContent[i].style.display = 'none';
    }
}

function closeTab(tabName) {
    document.getElementById(tabName).style.display = "none";
}

document.getElementById("defaultTab").click();