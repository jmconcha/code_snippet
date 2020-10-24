'use strict';

window.addEventListener('load', function () {

    const hoursContainer = document.querySelector('.hours');
    const minutesContainer = document.querySelector('.minutes');
    const secondsContainer = document.querySelector('.seconds');
    const modal = document.querySelector('.modal');
    const startBtn = document.querySelector('.btn-start')
    const stopBtn = document.querySelector('.btn-stop');

    let hours = 0, minutes = 0, seconds = 0;
    let timer;

    function startTimer() {
        disableTimeField(true);
        stopBtn.style.display = 'block';

        timer = setInterval(() => {
            if (!hours && !minutes && !seconds) {
                stopTimer(0);
                return;
            }

            if (seconds > 0) {
                seconds--;
                secondsContainer.value = seconds < 10 ? '0' + seconds : seconds;
            } else if (minutes > 0) {
                minutes--;
                seconds = 59;

                minutesContainer.value = minutes < 10 ? '0' + minutes : minutes;
                secondsContainer.value = seconds < 10 ? '0' + seconds : seconds;
            } else if (hours > 0) {
                hours--
                minutes = 59;
                seconds = 59;

                secondsContainer.value = seconds < 10 ? '0' + seconds : seconds;
                minutesContainer.value = minutes < 10 ? '0' + minutes : minutes;
                hoursContainer.value = hours < 10 ? '0' + hours : hours;
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(timer);
    }

    function stopTimer(status) {
        if (status == 0)
            alertUser('success', 'Time is up!');

        clearInterval(timer);
    }

    function alertUser(alertType, msg) {
        modal.firstElementChild.firstElementChild.textContent = msg;
        modal.firstElementChild.className = alertType;
        modal.style.display = 'flex';
    }

    function isTimeValid(h, m, s) {
        if (!h && !m && !s)
            return false;

        if (h < 0 || h > 24) {
            alertUser('warning', 'Hours should be between 1 and 24.');
            return false;
        }

        if (m < 0 || m > 60) {
            alertUser('warning', 'Minutes should be between 1 and 60.');
            return false;
        }

        if (s < 0 || s > 60) {
            alertUser('warning', 'Seconds should be between 1 and 60.');
            return false;
        }

        return true;
    }

    function disableTimeField(disable) {
        hoursContainer.disabled = disable;
        minutesContainer.disabled = disable;
        secondsContainer.disabled = disable;
    }

    startBtn.onclick = function () {
        if (this.textContent === 'Start') {
            hours = parseInt(hoursContainer.value);
            minutes = parseInt(minutesContainer.value);
            seconds = parseInt(secondsContainer.value);

            if (isTimeValid(hours, minutes, seconds)) {
                startTimer();
                this.textContent = 'Pause';
            }
        } else if (this.textContent === 'Pause') {
            pauseTimer();
            this.textContent = 'Start';
        }
    };

    stopBtn.onclick = function () {
        stopTimer(1);


        hoursContainer.value = '00';
        minutesContainer.value = '00';
        secondsContainer.value = '00';

        this.style.display = 'none';
        startBtn.textContent = 'Start';

        disableTimeField(false);
    };

    document.querySelector('.btn-close-message').onclick = function () {
        modal.style.display = 'none';
    };

});