'use strict';
//buttons selectors
let diceImage = document.querySelector('img');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
//first player selectors
let currentFirstPlayer = document.querySelector('#current--0');
let scoreFirstPlayer = document.querySelector('#score--0');
let playerOneEl = document.querySelector('.player--0');

//second player selectors
let currentSecondPlayer = document.querySelector('#current--1');
let scoreSecondPlayer = document.querySelector('#score--1');
let playerTwoEl = document.querySelector('.player--1');

//game variables
let diceRandom;
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];

const reset = () => {
  diceImage.classList.add('hidden');
  scoreFirstPlayer.textContent = 0;
  scoreSecondPlayer.textContent = 0;
  playerOneEl.classList.add('player--active');
  playerTwoEl.classList.remove('player--active');
  playerOneEl.classList.remove('player--winner');
  playerTwoEl.classList.remove('player--winner');

  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
};

reset();
let checkWinner = () => {
  return scores[activePlayer] >= 100;
};
const winner = player => {
  if (checkWinner()) {
    player.classList.add('player--winner');
    diceImage.classList.add('hidden');
  }
};

const addCurrent = playerCurrent => {
  if (diceRandom === 1) {
    currentScore = 0;
    switchPlayer();
  } else {
    currentScore += diceRandom;
  }

  playerCurrent.textContent = currentScore;
};

const showImg = () => {
  diceImage.classList.remove('hidden');
  diceImage.src = `dice-${diceRandom}.png`;
};

const switchPlayer = () => {
  if (activePlayer === 0) {
    playerOneEl.classList.remove('player--active');
    playerTwoEl.classList.add('player--active');
    activePlayer = 1;
  } else {
    playerOneEl.classList.add('player--active');
    playerTwoEl.classList.remove('player--active');
    activePlayer = 0;
  }
};

const holdPalyer = (player, currentPlayer) => {
  scores[activePlayer] += currentScore;
  player.textContent = scores[activePlayer];
  currentScore = 0;
  currentPlayer.textContent = currentScore;
};

btnRoll.addEventListener('click', () => {
  if (checkWinner()) {
    return;
  }
  diceRandom = Math.trunc(Math.random() * 6 + 1);

  showImg();

  if (activePlayer == 0) {
    addCurrent(currentFirstPlayer);
  } else if (activePlayer == 1) {
    addCurrent(currentSecondPlayer);
  }
});

btnHold.addEventListener('click', () => {
  if (checkWinner()) {
    return;
  }

  if (activePlayer == 0) {
    holdPalyer(scoreFirstPlayer, currentFirstPlayer);
    winner(playerOneEl);
  } else {
    holdPalyer(scoreSecondPlayer, currentSecondPlayer);
    winner(playerTwoEl);
  }
  const isWinner = checkWinner();
  if (!isWinner) {
    switchPlayer();
  }
});

btnNew.addEventListener('click', reset);
