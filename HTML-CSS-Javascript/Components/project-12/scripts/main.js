let accordRow = document.querySelectorAll(".row");

for (let i = 0; i < accordRow.length; i++) {
    accordRow[i].onclick = function (e) {
        e.stopPropagation();
        this.classList.toggle("show");
        this.firstElementChild.classList.toggle("hide-icon");
    };
}