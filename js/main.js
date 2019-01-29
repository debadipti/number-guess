// DOM variables
const form = document.getElementById("form");
const inputField = document.getElementById("input");
const button = document.querySelector("button");
const guessCount = document.getElementById("guess-count");
const guesses = document.getElementById("guesses");
const guessHint = document.getElementById("guess-hint");
const alertMessage = document.getElementById("alert");
const suggestion = document.getElementById("suggestion");
const hint = document.getElementById("hint");
const startField = document.getElementById("start-field");
const startButton = document.getElementById("start-game");
const gameRule = document.getElementById("game-rule");

// generate a random number between 1-50
let numberGuessed = Math.floor(Math.random() * 50) + 1;

// player's turn
let userTurn = 0;

// focus input field
inputField.focus();

// turn off the autocompletion
inputField.autocomplete = "off";

// event listener
form.addEventListener("submit", userSubmit);

// userInput function
function userSubmit(e) {
  // prevent default submit event
  e.preventDefault();

  // get the number value of the input field
  let inputValue = Number(inputField.value);

  if (inputValue) {
    // increment userTurn by 1
    userTurn++;

    // change the inner HTML
    guessCount.innerHTML = userTurn;

    // show the guesses
    guesses.style.display = "block";

    // create guess span
    const guessSpan = document.createElement("span");

    // guessSpan classes
    guessSpan.classList = "bg-info rounded-pill p-2 text-white mr-1";

    // add the user input to the guessSpan
    guessSpan.appendChild(document.createTextNode(inputValue));

    // add to guesses block
    guesses.appendChild(guessSpan);

    // clear the input field
    form.reset();
  } else {
    alert("Please guess a number between 1 - 50");
    // focus input field
    inputField.focus();
  }

  // compare the input value with the numberGuessed
  if (numberGuessed === inputValue) {
    // display the guessHint
    guessHint.style.display = "block";

    // add green background
    if (alertMessage.classList.contains("bg-danger")) {
      alertMessage.classList.remove("bg-danger");
      alertMessage.classList.add("bg-success");
    } else {
      alertMessage.classList.add("bg-success");
    }

    // success message
    alertMessage.innerHTML = "Congratulations! You got it right!";

    // disable the input field and the button
    inputField.disabled = true;
    button.disabled = true;

    // hide/show the hint message
    if ((suggestion.style.display = "block")) {
      suggestion.style.display = "none";
    }

    // display the start game button
    startField.style.display = "block";
  } else {
    // display the guessHint
    guessHint.style.display = "block";
    // display the suggestion
    suggestion.style.display = "block";

    // add green background
    if (alertMessage.classList.contains("bg-success")) {
      alertMessage.classList.remove("bg-success");
      alertMessage.classList.add("bg-danger");
    } else {
      alertMessage.classList.add("bg-danger");
    }

    // compare and give low/high hint
    if (numberGuessed > inputValue && numberGuessed - inputValue <= 10) {
      hint.innerHTML = "low";
    } else if (numberGuessed > inputValue && numberGuessed - inputValue > 10) {
      hint.innerHTML = "too low";
    } else if (numberGuessed < inputValue && inputValue - numberGuessed <= 10) {
      hint.innerHTML = "high";
    } else if (numberGuessed < inputValue && inputValue - numberGuessed > 10) {
      hint.innerHTML = "too high";
    }

    // success message
    alertMessage.innerHTML = "Wrong! Try again!";
  }

  // check the userTurn limit
  if (userTurn === 10) {
    if (numberGuessed !== inputValue) {
      // disable the input field and the button
      inputField.disabled = true;
      button.disabled = true;

      // success message
      alertMessage.innerHTML = "Game Over! Try Again!";

      // display the start game button
      startField.style.display = "block";
    }
  }
}

// eventlistener for the start button
startButton.addEventListener("click", startGame);

function startGame() {
  // display the form
  form.style.display = "block";
  gameRule.style.display = "none";

  // set the userTurn to zero
  userTurn = 0;

  // disable the input field and the button
  inputField.disabled = false;
  button.disabled = false;

  // hide the other fields
  guesses.style.display = "none";
  guessHint.style.display = "none";
  startField.style.display = "none";

  // get the old spans
  const spanChildNode = document.getElementsByClassName("rounded-pill");

  // convert node to array
  const spanChildArr = Array.from(spanChildNode);
  // remove each child
  spanChildArr.forEach(i => {
    i.remove();
  });

  // generate random number
  numberGuessed = Math.floor(Math.random() * 50) + 1;
}
