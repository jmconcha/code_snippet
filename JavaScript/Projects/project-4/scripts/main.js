'use strict';

window.addEventListener('load', function () {
    const hoursContainer = document.querySelector('.hours');
    const minutesContainer = document.querySelector('.minutes');
    const secondsContainer = document.querySelector('.seconds');
    const meridianCotainer = document.querySelector('.meridian');
    let timeFormat = 'Standard Time';

    function startClock() {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        if (timeFormat === 'Standard Time') {
            if (hours > 11)
                meridianCotainer.textContent = 'PM';
            else
                meridianCotainer.textContent = 'AM';
                
            hours = hours > 12 ? hours - 12: hours;
            hours = hours < 10 ? '0' + hours : hours;

            meridianCotainer.style.display = 'block';
        } else {
            hours = hours < 10 ? '0' + hours: hours;
            meridianCotainer.style.display = 'none';
        }


        minutes = minutes < 10 ? '0' + minutes: minutes;
        seconds = seconds < 10 ? '0' + seconds: seconds;

        hoursContainer.textContent = hours;
        minutesContainer.textContent = minutes;
        secondsContainer.textContent = seconds;
    }

    for (let btn of document.querySelectorAll('.btn')) {
        btn.onclick = function () {
            timeFormat = this.textContent;
            startClock();
        };
    }


    const clockMechanism = setInterval(function () {
        startClock();
    }, 1000);

    startClock();
});