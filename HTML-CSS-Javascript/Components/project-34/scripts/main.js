'use strict';

window.addEventListener('load', function () {
    const words = [
        'hat',
        'river',
        'lucky',
        'statue',
        'generate',
        'stubborn',
        'cocktail',
        'runaway',
        'joke',
        'developer',
        'establishment',
        'hero',
        'javascript',
        'nutrition',
        'revolver',
        'echo',
        'siblings',
        'investigate',
        'horrendous',
        'symptom',
        'laughter',
        'magic',
        'master',
        'space',
        'definition'
    ];

    // currentWord holds the word that user need to type correctly
    // didWordCheck hold true if the "correct" word displayed on the page
    // else false
    let timer, score, timeLeft, currentWord, didWordCheck,
        gameStarted = false, time = 3;

    const wordField = document.querySelector('.word');
    const scoreField = document.querySelector('.score');
    const timeField = document.querySelector('.time-left');
    const gameStatus = document.querySelector('.game-status');
    const wordInputField = document.getElementById('wordInputField');


    function gameInitializer() {
        score = 0;
        timeLeft = time;
        currentWord = getWord();
        didWordCheck = false;
        wordField.textContent = currentWord;
        gameStatus.textContent = '';
        timeField.textContent = timeLeft;
        scoreField.textContent = 0;

        document.getElementById('wordInputField').value = '';
        wordInputField.addEventListener('input', validateUserInput);
    }

    function updateGameStatus(status) {
        if (status === 'correct') {
            gameStatus.setAttribute('style', 'color: #4ACF50;');
            gameStatus.textContent = 'Correct!';
        }
        else if (status === 'over') {
            gameStatus.setAttribute('style', 'color: red;');
            gameStatus.textContent = 'Game Over!';
        }
    }

    function startTimer() {
        timer = setInterval(function () {
            timeLeft--;
            timeField.textContent = timeLeft;

            if (!timeLeft) {
                clearInterval(timer);
                gameStarted = false;
                updateGameStatus('over');
                wordInputField.removeEventListener('input', validateUserInput);
                document.querySelector('.btn').textContent = 'Start';
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timer);

        startTimer();
    }

    // return any word from words array
    function getWord() {
        return words[Math.floor(Math.random() * words.length)];
    }

    // change word on h2 element with class word (<h2 class="word">word</h2>)
    // with a new word if the user type the previous word correctly
    function changeWord() {
        let word = getWord();

        currentWord = word;
        wordField.textContent = currentWord;
    }

    function validateUserInput() {
        // check if "correct" word displayed on the page
        // then remove it
        if (didWordCheck) {
            gameStatus.textContent = '';
        }

        if (this.value === currentWord && gameStarted) {

            //display "correct" word on the page
            updateGameStatus('correct');
            // set to true because "correct" word is displayed on the page
            didWordCheck = true;

            this.value = '';
            score++;
            timeLeft = time;
            timeField.textContent = timeLeft;
            resetTimer();
            scoreField.textContent = score;
            changeWord();
        }
    }

    function startGame() {
        gameStarted = true;
        startTimer();
    }

    document.querySelector('.btn').onclick = function () {
        if (this.textContent === 'Start') {
            this.textContent = 'Pause';
            document.getElementById('wordInputField').focus();

            gameInitializer();
            startGame();
        }
        else if (this.textContent === 'Pause') {
            this.textContent = 'Resume';
            clearInterval(timer);
            wordInputField.disabled = true;
        }
        else if (this.textContent === 'Resume') {
            this.textContent = 'Pause';
            wordInputField.disabled = false;
            wordInputField.focus();
            startTimer();
        }
    };
});

