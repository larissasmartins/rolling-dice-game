'use strict';

// Selecting elements
const scoreElementO = document.getElementById('score--0');
const scoreElement1 = document.getElementById('score--1');

const currentElement0 = document.getElementById('current--0');
const currentElement1 = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const playerElement0 = document.querySelector('.player--0');
const playerElement1 = document.querySelector('.player--1');

// Starting conditions
let scores, currentScore, activePlayer, playing;

const initGame = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    scoreElementO.textContent = 0;
    scoreElement1.textContent = 0;
    currentElement0.textContent = 0;
    currentElement1.textContent = 0;
    diceElement.classList.add('hidden');
    playerElement0.classList.add('player--active');
    playerElement1.classList.remove('player--active');
    playing = true;

    playerElement0.classList.remove('player--winner');
    playerElement1.classList.remove('player--winner');

    document.getElementById(`current--${activePlayer}`).textContent = 0;
    scores[activePlayer] = 0;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
};

initGame();

const switchPlayer = function () {
    // set current score to 0
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;

    // switch player        
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerElement0.classList.toggle('player--active');
    playerElement1.classList.toggle('player--active');
};

// Rolling dice button functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        const diceValue = Math.trunc(Math.random() * 6 + 1);

        diceElement.classList.remove('hidden');
        diceElement.src = `assets/dice-${diceValue}.png`;

        if (diceValue !== 1) {
            // add dice to current score
            currentScore += diceValue;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // add current score to current player
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // check if there's a winner 
        if (scores[activePlayer] >= 20) {
            playing = false;
            const winner = document.querySelector(`.player--${activePlayer}`);
            winner.classList.add('player--winner');
            winner.classList.remove('player--active');
            diceElement.classList.add('hidden');
            currentScore = 0;
        } else {
            switchPlayer();
        }
    }
});

// Set function to the New Game button
btnNew.addEventListener('click', initGame);