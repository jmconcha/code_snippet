'use strict';

window.addEventListener('load', function () {
    // cards container "<div class="cards"></div>"
    const cardsContainer = document.querySelector('.cards');
    // represent the value of each card
    const cardsValues = [];
    // cards "<div class="card"></div>" element
    let cards;
    // cards quantity
    let cardsQuan = 0;
    // remaining cards
    let remainingCards;
    // stored the id of previous open card
    let previousCardId = NaN;
    // stored the id of current open card
    let currentCardId = NaN;
    // true if card open otherwise
    // false
    let isOpenCard = false;

    function getRandInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // check previous open card and current open card
    // remove if the same
    function checkCard() {
        if (previousCardId === currentCardId)
            return;

        if (cardsValues[previousCardId] === cardsValues[currentCardId]) {
            this.className += ' hide';
            cards[previousCardId].className += ' hide';

            remainingCards -= 2;
            if (!remainingCards) {
                const notification = document.querySelector('.modal');
                notification.style.display = 'flex';
            }
        }
    }

    // remove number on current card
    function removeCardNumber() {
        if (isOpenCard)
            cards[currentCardId].textContent = '';
    }

    // put number on current card
    function putCardNumber(event) {
        previousCardId = currentCardId;
        currentCardId = this.id;

        if (event.which === 1)
            this.textContent = cardsValues[this.id];
    }

    // initial setup for card game
    // get rand int number between 1 to (cardQuan / 2)
    // then put it at random indices
    function cardGameInitializer() {
        // stores random int
        let randInt;
        // set default to 0 of cardsValues
        // with the length of (cardsQuan)
        for (let i = 0; i < cardsQuan; i++) {
            cardsValues.push(0);
        }

        // input random int to cardsValues at
        // random indices
        while (cardsValues.includes(0)) {
            // get random int
            randInt = getRandInt(1, cardsQuan / 2);

            if (!cardsValues.includes(randInt)) {
                let index;

                for (let i = 0; i < 2; i++) {
                    do {
                        index = getRandInt(0, cardsQuan - 1);
                    } while (cardsValues[index]);

                    cardsValues[index] = randInt;
                }
            }
        }
    }

    // generate cards
    // creates '<div id="(0 to cardsQuan -1)" class="card"></div>'
    function generateCards() {
        for (let i = 0, card; i < cardsQuan; i++) {
            card = document.createElement('div');
            card.setAttribute('id', i);
            card.setAttribute('class', 'card');

            // add onclick event to all card div element
            // "<div class="card"></div>" element
            card.onmousedown = putCardNumber;
            card.onclick = checkCard;
            card.onmouseup = removeCardNumber;

            // add it to cards container
            cardsContainer.appendChild(card);
        }
    }

    document.body.addEventListener('mouseup', removeCardNumber);

    document.getElementById('cardsForm').onsubmit = function (event) {
        event.preventDefault();

        this.style.display = 'none';
        cardsQuan = Number(this.elements[0].value);
        cardsQuan = cardsQuan % 2 ? cardsQuan - 1 : cardsQuan;

        // remaining cards
        remainingCards = cardsQuan;

        // generate cards
        // creates '<div id="(0 to cardsQuan -1)" class="card"></div>'
        generateCards();

        // cards "<div class="card"></div>" element
        cards = document.querySelectorAll('.card');

        cardGameInitializer();
        cardsContainer.style.display = 'grid';
    };
});