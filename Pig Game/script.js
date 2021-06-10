'use strict';

// variable assignment
let rollBtn = document.querySelector('.btn--roll');
let holdBtn = document.querySelector('.btn--hold');
let newGame = document.querySelector('.btn--new');
let score1El = document.querySelector('#current--0');
let score2El = document.querySelector('#current--1');
let scoreTotal0 = document.querySelector('#score--0');
let scoreTotal1 = document.querySelector('#score--1');
let dice = document.querySelector('.dice');

const winCondition = 28;
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let activePlayer = 0;
let playing, roll, scores;

function resetValues() {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--winner`);
  score1El.textContent = 0;
  score2El.textContent = 0;
  scoreTotal0.textContent = 0;
  scoreTotal1.textContent = 0;
  dice.classList.add('hidden');
  scores = [0, 0];
  activePlayer = 0;
  playing = true;
  roll = Math.floor(Math.random(1) * 6 + 1);
}
//this function will control player turns
function toggler() {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  activePlayer = activePlayer > 0 ? (activePlayer = 0) : (activePlayer = 1);
}

resetValues();

//event handlers

//this eventListner will handle dice rolls/1 rolls/show dice
rollBtn.addEventListener('click', function () {
  if (playing) {
    roll = Math.floor(Math.random(1) * 6 + 1);
    dice.classList.remove('hidden');
    dice.src = `dice-${roll}.png`;

    if (roll === 1) {
      scores[activePlayer] = 0;
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      toggler();
    } else {
      scores[activePlayer] += roll;
      document.querySelector(`#current--${activePlayer}`).textContent =
        scores[activePlayer];
    }
  } else {
    console.log(`Game over man`);
    alert(`please start a new game`);
  }
});

// this eventlistener will check win condition/update player score/change player turn
holdBtn.addEventListener('click', function () {
  let combineScores;
  if (playing) {
    combineScores = scores[activePlayer] + Number(scoreTotal1.textContent);
    document.querySelector(
      `#score--${activePlayer}`
    ).textContent = combineScores;
    scores[activePlayer] = 0;
    document.querySelector(`#current--${activePlayer}`).textContent =
      scores[activePlayer];
    console.log(scores[activePlayer]);
    if (
      document.querySelector(`#score--${activePlayer}`).textContent >=
      winCondition
    ) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      alert(`You win player ${activePlayer + 1}!`);
      return console.log(`this is a test`);
    }
    toggler();
  } else {
    console.log(`Game over man`);
    alert(`please start a new game`);
  }
});

// this will reset the game
newGame.addEventListener('click', resetValues);
