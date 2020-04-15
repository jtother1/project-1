//created words for game
const words = ['JAZZ', 'PEANUT', 'TRANSYLVANIA', 'AMPHIBIAN', 'TRAIL', 'BICYCLE', 'FREEDOM', 'FREEZE','GUACAMOLE', 'INTERNET', 'ROCKET'];
//making them show up on random mode
let randomWord
// console.log(randomWord);


let correctLetters = [];
let wrongLetters = [];
let displayCharacters = [];

function updateDisplayCharacters() {
    displayCharacters = [];
    for (let i = 0; i < randomWord.length; i++) {
        //if we guessed the correct letter put in the letter if not an underscore
        if (correctLetters.includes(randomWord[i])) {
            displayCharacters.push(randomWord[i]);


        } else {

            displayCharacters.push('_');
        }
    }
}



function displayBoard() {
    wordboard.innerHTML = '';
    for (let i = 0; i < displayCharacters.length; i++) {
        //span makes empty underscore for every letter to be guessed
        wordboard.innerHTML = wordboard.innerHTML + '<span>' + displayCharacters[i] + '</span>';
    }
}


function changeButtonColor(isCorrect, letter) {
    let selectedButton
    for (i = 0; i < buttons.length; i++) {
        const currentButton = buttons[i];
        if (currentButton.textContent === letter) {
            selectedButton = currentButton;
        }
    }
    selectedButton.disabled = true;
    if (isCorrect) {
        selectedButton.style.color = 'green';
    } else {
        selectedButton.style.color = 'red';
    }
}

function reset() {
    const random = Math.floor(Math.random() * words.length);
    randomWord = words[random]
    correctLetters = [];
    wrongLetters = [];
    updateDisplayCharacters();
    displayBoard();
    alertPopUp.classList.add('alert-hidden');
    //  change image back to 0
    updateImage();

    // reset all the buttons
    resetButtons();
}

function resetButtons() {
    // buttons
    for (let i = 0; i < buttons.length; i++) {
        const currentButton = buttons[i] // the current button we are on in the loop
        // change disabled to false
        currentButton.disabled = false

        // set the color to black
        currentButton.style.color = 'black';
    }
}



const alertPopUp = document.querySelector('.alert');
const alertMessage = document.querySelector('.alert-message');
//function for win or lose alerts
function checkWinOrLose() {
    if (displayCharacters.includes('_') === false) {
        alertPopUp.classList.toggle('alert-hidden');
        alertMessage.textContent = 'You won!';
    }
    if (wrongLetters.length >= 9) {
        alertPopUp.classList.toggle('alert-hidden');
        alertMessage.textContent = 'You lose!';
    }
}
//hangman images get updated to show each time a wrong button clicked
const hangmanImage = document.querySelector('#hangman-image');

function updateImage() {
    hangmanImage.src = `/images/hangman${wrongLetters.length}.png`;
}
//added funtion to restart game button
function refreshPage() {
    window.location.reload();
}
//button click 
const buttons = document.querySelectorAll('.letter-btn');
//using for each to create the click function
buttons.forEach(btn => btn.addEventListener('click', handleButtonClick))
//giving a if statement for when buttons are clicked correct and wrong letters appear
function handleButtonClick() {

    const letter = this.textContent;

    if (randomWord.includes(letter)) {
        //correct guess
        correctLetters.push(letter);
        changeButtonColor(true, letter);

    } else {
        wrongLetters.push(letter);
        changeButtonColor(false, letter);
        //wrong guess
    }
    //calling all functions made 
    updateDisplayCharacters();
    displayBoard();
    updateImage();
    checkWinOrLose();




}
reset();