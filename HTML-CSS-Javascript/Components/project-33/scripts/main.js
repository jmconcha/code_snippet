'use strict';

window.addEventListener('load', () => {

    const slider = document.querySelector('.slider');
    const container = document.querySelector('.container');
    const img2 = document.querySelector('img.row-2');
    

    function startSlide(e) {
        let containerWidth = container.clientWidth;
        let offsetLeft = container.offsetLeft;
        let currentPos = e.clientX - offsetLeft;

        if (currentPos >= 0 && currentPos <= containerWidth) {
            slider.style.left = currentPos + 'px';
            img2.style.width = (currentPos * 100 / containerWidth) + '%';
        }
        else if (currentPos < 0) {
            slider.style.left = '0';
            img2.style.width = '0';
        }
        else if (currentPos > containerWidth) {
            slider.style.left = containerWidth + 'px';
            img2.style.width = '100%';
        }
    }

    function setSlide(e) {
        if (e.button != 0)
            return;

        window.addEventListener('mousemove', startSlide);
    }

    function removeSlide() {
        window.removeEventListener('mousemove', startSlide);
    }


    slider.addEventListener('mousedown', setSlide);
    window.addEventListener('mouseup', removeSlide);

});