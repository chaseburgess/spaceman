/*----- constants -----*/
const WORDS = ['GALAXY' , 'NEBULA' , 'COSMOS', 'MOON' ,];
const NUM_LOST = 6;

/*----- state variables -----*/
let secretWord; 
let wrongLetters;
let guess;
let winner; //null === game in play, 'W' === won, 'L' === lost,

/*----- cached elements  -----*/
const guessEl = document.getElementById('guess');
const remaingingEl = document.getElementById('num-remaining');
const imgEl = document.querySelector('img');

/*----- event listeners -----*/


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
    remaingingEl.innerHTML = `${NUM_LOST - wrongLetters.length} Guesses Remaining`;
    

};

function handleBtnClikc(evt) {
    const letter = evt.target.innerText;
    if (evt.target.tagName !== 'BUTTON' || guess.includes(letter) || wongGuesses.includes(letter) || winner) return;
    if (wordSelected.includes(letter)){
//correct guess
let newGuess = '';
const wordArr = [...wordSelected];
wordArr.forEach(function(char, charIdk) {
    if (char === letter) {
        newGuess += guess.charAt(charIdx);
    }
});
    guess = newGuess;    
} else {
    //wronf guess
    wrongGuesses.push(letter);
}
winner = getWinner();
render();
}
function getWinner() {

}