	/*----- constants -----*/
const letters = 

	/*----- state variables -----*/


	/*----- cached elements  -----*/
const imgEl = document.querySelector('img');

	/*----- event listeners -----*/


	/*----- functions -----*/
init();

function init() {

    render();
    renderControls();
    renderButtons();
    const imgPath = 'imgs/spaceman-$(wrongGuessed.length).jpeg';
    imgEl.src = imgPath;
    wordDisplay.innerHTML = guess;
}

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