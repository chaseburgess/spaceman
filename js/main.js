/*----- constants -----*/
const WORDS = ['GALAXY' , 'NEBULA' , 'COSMOS', 'MOON'];
const NUM_LOST = 6;

/*----- state variables -----*/
let secretWord; 
let wrongLetters;
let guess;
let winner; //null === game in play, 'W' === won, 'L' === lost,

/*----- cached elements  -----*/
const guessEl = document.getElementById('guess');
const messageEl = document.getElementById('message');
const imgEl = document.querySelector('img');

/*----- event listeners -----*/
document.getElementById('letters').addEventListener('click', handleLetterClick);

/*----- functions -----*/
init();

function init() {
    secretWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    wrongLetters = [];
    guess = '_'.repeat(secretWord.length);
    winner = null;
    render();
}

function render() {
    guessEl.innerHTML = guess;
    imgEl.src = `imgs/spaceman-${wrongLetters.length}.jpg`;
    if (winner === 'W') {
        messageEl.innerHTML = 'Congrats! The Force was with you!';
    } else if (winner === 'L') {
        messageEl.innerHTML = 'Welcome to the Dark Side!';
    } else {
        messageEl.innerHTML = `${NUM_LOST - wrongLetters.length} Guesses Remaining`;
    }
};

function handleLetterClick(evt) {
    const letter = evt.target.innerText;
    if (evt.target.tagName !== 'BUTTON' || guess.includes(letter) || wrongLetters.includes(letter) || winner) return;
    if (secretWord.includes(letter)) {
        let newGuess = '';
        [...secretWord].forEach(function(char, charIdx) {
            newGuess += char === letter ? letter : guess.charAt(charIdx);
        });
        guess = newGuess;    
    } else {
        //wrong guess
        wrongLetters.push(letter);
    }
    winner = getWinner();
    render();
}

function getWinner() {
    if (guess === secretWord) return 'W';
    if (wrongLetters.length === NUM_LOST) return 'L';
    return null;
}