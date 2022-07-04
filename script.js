'use strict';

// Get selector
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let score, currentScore, playing;
let activePlayer = 0;

// Start condition functionality
const newGame = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');

  score = [0, 0];
  currentScore = 0;
  playing = true;
};

//Start new game
newGame();

//Switch player
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
};

// Roll dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Roll dice, generating a new random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2.Show dice
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`;
    //3.Chek dice for 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

//Hold functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    //Add score to the active player
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //Check if score >= 100 point player win else switch player
    if (score[activePlayer] < 50) {
      switchPlayer();
    } else {
      playing = false;
      document.getElementById(`score--${activePlayer}`).textContent = 'WIN';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    }
  }
});

//New game functionality
btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  if (score[activePlayer] <= 10) switchPlayer();
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  newGame();
});
