'use strict';

window.addEventListener('load', () => {
    const imageEl = document.querySelector('.slideshow img');
    const imgsPreview = document.querySelectorAll('.image-preview img');
    const imageCount = document.querySelector('.image-count span');
    const title = document.querySelector('.title');
    const imageList = [];

    let currentImage = 0;


    function changeImage() {
        let text = this.textContent;

        if (text) {
            let imgQ = imageList.length - 1;

            if (text === '❮') {
                currentImage--;
                currentImage = currentImage == -1 ? imgQ : currentImage;
            }
            else {
                currentImage++;
                currentImage = currentImage > imgQ ? 0 : currentImage;
            }
        }
        else {
            currentImage = getImageOrder(this.src);
        }

        imageEl.src = './images/' + imageList[currentImage] + '_wide.jpg';

        title.textContent = imgsPreview[currentImage].alt;
        imageCount.textContent = currentImage + 1;
        // remove class="active" of previous active img
        document.querySelector('.active').removeAttribute('class');
        // set class="active"
        imgsPreview[currentImage].setAttribute('class', 'active');
    }

    function createImageList(imgSrc) {
        imageList.push(imgSrc.substring(imgSrc.lastIndexOf('/') + 1,
            imgSrc.lastIndexOf('.')));
    }

    function getImageOrder(imgSrc) {
        let imgName = imgSrc;

        imgName = imgName.substring(imgName.lastIndexOf('/') + 1,
            imgName.lastIndexOf('.'));

        return imageList.indexOf(imgName);
    }


    for (let control of document.querySelectorAll('.control')) {
        control.onclick = changeImage;
    }

    for (let imgPreview of imgsPreview) {
        createImageList(imgPreview.src);
        imgPreview.onclick = changeImage;
    }
})