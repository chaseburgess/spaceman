/*----- constants -----*/
const WORDS = ['GALAXY' , 'NEBULA' , 'COSMOS', 'MOON', 'SPACESHIP', 'ALIENS', 'PLANET', 'ORBITS', 'STAR', 'METEOR', 'SATURN', 'URANUS', 'STARRY'];
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
const playAgainBtn = document.getElementById('Play-Again');
const letterBtns = document.querySelectorAll('#letters > button');
const lostWord = document.getElementById('word');

/*----- event listeners -----*/
document.getElementById('letters').addEventListener('click', handleLetterClick);
playAgainBtn.addEventListener('click', init);

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
    renderButtons();
    renderMessage();
    guessEl.innerHTML = guess;
    imgEl.src = `imgs/spaceman-${wrongLetters.length}.png`;
};

function renderButtons() {
    playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
    letterBtns.forEach(function(btn) {
        const letter = btn.innerHTML;
        const hideBtn = wrongLetters.includes(letter) || guess.includes(letter) || winner;
        btn.style.visibility = hideBtn ? 'hidden' : 'visible'; 
    });
}

function renderMessage() {
    if (winner === 'W') {
        messageEl.innerHTML = 'Congrats, YOU WON! The Force is strong with this one!';
    } else if (winner === 'L') {
        messageEl.innerHTML = 'YOU LOST! Welcome to the Dark Side!';
        lostWord.innerHTML = `The answer was ${secretWord}!`;
    } else {
        messageEl.innerHTML = `${NUM_LOST - wrongLetters.length} Guesses Remaining`;
        lostWord.innerHTML = '';
    }
}

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