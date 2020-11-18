'use strict';

window.addEventListener('load', function () {
    const timeContainer = document.querySelector('.time');
    let timeFormat = 'Standard Time';

    function startClock() {
        const date = new Date();
        let time;

        if (timeFormat === 'Standard Time') {
            time = date.toLocaleTimeString();
        } else { // Military Time
            time = formatTime(date.getHours(), date.getMinutes(), date.getSeconds());
        }

        timeContainer.textContent = time;
    }

    function formatTime(hours, minutes, seconds) {
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return `${hours}:${minutes}:${seconds}`;
    }

    for (let btn of document.querySelectorAll('.btn')) {
        btn.onclick = function () {
            timeFormat = this.textContent;
            startClock();
        };
    }


    setInterval(function () {
        startClock();
    }, 1000);

    startClock();
});