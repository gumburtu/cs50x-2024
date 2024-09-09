let randomNumber;
let guessCount;
let guesses = [];
let maxGuesses = 10;
let minRange = 1;
let maxRange = 1000;

const guessField = document.querySelector('.guessField');
const guessSubmit = document.querySelector('.guessSubmit');
const remainingGuessesDisplay = document.getElementById('remainingGuesses');
const guessesDisplay = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const newGameButton = document.querySelector('.new-game');
const difficultyRadios = document.querySelectorAll('input[name="difficulty"]');

newGameButton.addEventListener('click', startNewGame);
guessSubmit.addEventListener('click', checkGuess);

document.querySelector('.form').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Formun varsayılan submit davranışını engeller
        guessSubmit.click(); // Submit butonunu programlı olarak tıklar
    }
});

function startNewGame() {
    guesses = [];
    guessCount = 0;
    lastResult.textContent = '';
    lowOrHi.textContent = '';
    guessesDisplay.textContent = '';
    remainingGuessesDisplay.textContent = `Remaining Guesses: ${maxGuesses}`;
    guessField.value = '';
    guessField.disabled = false;
    guessSubmit.disabled = false;

    const selectedDifficulty = document.querySelector('input[name="difficulty"]:checked').value;
    setDifficulty(selectedDifficulty);

    randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    console.log('Random number:', randomNumber); // Debugging
}

function setDifficulty(difficulty) {
    switch (difficulty) {
        case 'easy':
            maxGuesses = 3;
            minRange = 1;
            maxRange = 10;
            break;
        case 'medium':
            maxGuesses = 5;
            minRange = 1;
            maxRange = 100;
            break;
        case 'hard':
            maxGuesses = 10;
            minRange = 1;
            maxRange = 1000;
            break;
    }
    guessField.min = minRange;
    guessField.max = maxRange;
    remainingGuessesDisplay.textContent = `Remaining Guesses: ${maxGuesses}`;
}

function checkGuess() {
    const userGuess = Number(guessField.value);

    if (userGuess < minRange || userGuess > maxRange) {
        lastResult.textContent = `Please enter a number between ${minRange} and ${maxRange}.`;
        lastResult.style.color = 'red';
        return;
    }

    if (guesses.includes(userGuess)) {
        lastResult.textContent = 'You have already guessed that number!';
        lastResult.style.color = 'red';
        return;
    }

    guesses.push(userGuess);
    guessCount++;
    remainingGuessesDisplay.textContent = `Remaining Guesses: ${maxGuesses - guessCount}`;

    if (userGuess === randomNumber) {
        lastResult.innerHTML = 'Congratulations!<br>You guessed it right!';
        lastResult.style.color = 'green';
        setGameOver();
        // fireworkEffect(); // Uncomment if you want fireworks
    } else if (guessCount === maxGuesses) {
        lastResult.innerHTML = `Game Over!<br>The correct number was ${randomNumber}.`;
        lastResult.style.color = 'red';
        setGameOver();
    } else {
        lastResult.textContent = 'Wrong!';
        lastResult.style.color = 'orange';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Too low!';
        } else {
            lowOrHi.textContent = 'Too high!';
        }
    }
    
    // Clear the input field after submission
    guessField.value = '';
    guessField.focus(); // Focus on the input field for the next guess
}

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    newGameButton.style.display = 'block';
    // Optional: Add green shadow around the game screen if you have a specific CSS class for it
}

startNewGame();
