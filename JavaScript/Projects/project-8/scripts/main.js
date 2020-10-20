'use strict';

window.addEventListener('load', function () {

    const canvas = document.getElementById('canvas');
    const c = canvas.getContext('2d');
    const canvasOffset = canvas.offsetTop;

    let width = canvas.scrollWidth;
    let height = canvas.scrollHeight;
    let pencilWidth = 1;
    let pencilColor = 'black';
    let prevPencilColor;

    canvas.width = width;
    canvas.height = height;


    function draw(event) {
        c.lineTo(event.clientX, event.clientY - canvasOffset);
        c.stroke();
    }

    canvas.addEventListener('mousedown', function(event) {
        c.beginPath();
        c.moveTo(event.clientX, event.clientY - canvasOffset);
        c.lineJoin = 'round';
        c.lineCap = 'round';
        c.strokeStyle = pencilColor;
        c.lineWidth = pencilWidth;

        this.addEventListener('mousemove', draw);

    });

    canvas.addEventListener('mouseup', function () {
        
        canvas.removeEventListener('mousemove', draw);

    });

    document.querySelector('.pencil-width').onchange = function () {
        if (this.value < 1)
            this.value = 1;
            
        pencilWidth = this.value;
    };

    for (let color of document.querySelectorAll('.color')) {
        color.onclick = function () {
            pencilColor = this.classList[1];
        };
    }

    document.querySelector('.fa-eraser').onclick = function () {
        prevPencilColor = pencilColor;
        pencilColor = 'white';
        canvas.style.cursor = 'url("./cursors/eraser.cur"), auto';
    };

    document.querySelector('.fa-pencil-alt').onclick = function () {
        pencilColor = prevPencilColor;
        canvas.style.cursor = 'url("./cursors/blue-pencil.cur"), auto';
    };
});