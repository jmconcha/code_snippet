'use strict';

window.addEventListener('load', function () {
    const pomodoroTimerContainer = document.getElementById('pomodoroTimer');
    const notificationContainer = document.querySelector('.notification');
    const timeContainer = document.querySelector('.time');
    const pauseAndResumeBtn = document.querySelector('.btn-pause');
    // time is in seconds
    const pomodoroTime = 2;//1499
    const shortBreakTime = 299;
    const longBreakTime = 899;
    let remainingTime = -1;
    let isPause = false;
    let currentSession;
    let timer;
    let timeoutBlink;

    function removeBlink() {
        clearTimeout(timeoutBlink);
        pomodoroTimerContainer.className =
            pomodoroTimerContainer.className.replace(' blink', '');

        notificationContainer.className =
            notificationContainer.className.replace(' blink-p', '');
    }

    function blink() {
        timeoutBlink = setTimeout(function () {
            pomodoroTimerContainer.className =
                pomodoroTimerContainer.className.replace(' blink', '');

            notificationContainer.className =
                notificationContainer.className.replace(' blink-p', '');
            clearTimeout(timeoutBlink);
        }, 60000);

        pomodoroTimerContainer.className += ' blink';
        notificationContainer.className += ' blink-p';
    }

    function quitCountdown() {
        pauseAndResumeBtn.style.visibility = 'hidden';
        clearInterval(timer);
        timeContainer.textContent = '00 : 00';
        currentSession = undefined;
        remainingTime = -1;

        if (isPause) {
            const btn = document.querySelector('.btn-resume');
            changeControlIcon(btn, 'resume', 'pause', 'fa-play', 'fa-pause');
        }

        isPause = false;
    }

    function resetPomodoros() {
        if (!currentSession)
            return;

        if (isPause) {
            remainingTime = currentSession === 'pomodoro' ? pomodoroTime :
                currentSession === 'short-break' ? shortBreakTime : longBreakTime;
            startTimer(remainingTime);
            return;
        }

        clearInterval(timer);

        if (currentSession === 'pomodoro')
            startTimer(pomodoroTime);
        else if (currentSession === 'short-break')
            startTimer(shortBreakTime);
        else
            startTimer(longBreakTime);
    }

    function changeControlIcon(btn, oldControl, newControl, oldIcon, newIcon) {
        btn.className = btn.className.replace(oldControl, newControl);
        btn.children[0].className = btn.children[0].className
            .replace(oldIcon, newIcon);
    }

    function resumeTimer(btn) {
        isPause = false;
        startTimer(remainingTime);
        changeControlIcon(btn, 'resume', 'pause', 'fa-play', 'fa-pause');
    }

    function pauseTimer(btn) {
        isPause = true;
        clearInterval(timer);
        changeControlIcon(btn, 'pause', 'resume', 'fa-pause', 'fa-play');
    }

    function startTimer(time) {
        let minutes;
        let seconds;
        let formattedTime;

        removeBlink();
        clearInterval(timer);
        currentSession = time === 2 ? 'pomodoro' : time === 299 ? 'short-break' : 'long-break';

        notificationContainer.style.visibility = 'hidden';
        pauseAndResumeBtn.style.visibility = 'visible';

        function timeMechanism() {
            minutes = parseInt(time / 60);
            seconds = time % 60;
            formattedTime = `${minutes < 10 ? '0' + minutes : minutes} : ` +
                `${seconds < 10 ? '0' + seconds : seconds}`;

            if (time >= 0) {
                timeContainer.textContent = formattedTime;

                if (!time) {
                    notificationContainer.style.visibility = 'visible';
                    pauseAndResumeBtn.style.visibility = 'hidden';

                    blink();
                }

                remainingTime = --time;
            }
            else {
                clearInterval(timer);
            }
        }

        time++;
        timeMechanism();

        if (!isPause) {
            timer = setInterval(function () {
                timeMechanism();
            }, 1000);
        }
    }

    function pomodoroSession() {
        switch (this.classList[1]) {
            case 'pomodoro':
                startTimer(pomodoroTime);
                break;
            case 'short-break':
                startTimer(shortBreakTime);
                break;
            case 'long-break':
                startTimer(longBreakTime);
                break;
            case 'quit-countdown':
                removeBlink();
                quitCountdown();
                break;
            case 'reset':
                removeBlink();
                resetPomodoros();
                break;
            case 'btn-pause':
                if (remainingTime > -1)
                    pauseTimer(this);
                break;
            case 'btn-resume':
                if (remainingTime > -1)
                    resumeTimer(this);
                break;
            default:
                console.log('Invalid Input');
        }
    }


    for (let btn of document.querySelectorAll('.btn')) {
        btn.onclick = pomodoroSession;
    }
});