var numberOfSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h2 = document.querySelector("h2");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

initialize();

function initialize() {
  setUpModeButtons();
  setUpSquares();
  reset();
}

function setUpModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].classList.remove("selected");
      }
      this.classList.add("selected");
      this.textContent === "Easy"
        ? (numberOfSquares = 3)
        : this.textContent === "Normal"
        ? (numberOfSquares = 6)
        : (numberOfSquares = 9);

      reset();
    });
  }
}

function setUpSquares() {
  for (var i = 0; i < squares.length; i++) {
    // Adding the click listener to the squares
    squares[i].addEventListener("click", function() {
      // Grab the color of the clicked square
      var clickedColor = this.style.backgroundColor;
      // Compare the color to pickedColor
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct";
        resetButton.textContent = "Play Again?";
        changeColor(clickedColor);
        h2.style.backgroundColor = clickedColor;
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

function reset() {
  colors = generateRandomColors(numberOfSquares);
  pickedColor = pickTheColor();
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = "";

  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  h2.style.backgroundColor = "#E57474";
}

resetButton.addEventListener("click", function() {
  reset();
});

colorDisplay.textContent = pickedColor;

for (var i = 0; i < squares.length; i++) {
  // Adding the initial colors to the squares
  squares[i].style.backgroundColor = colors[i];

  // Adding the click listener to the squares
  squares[i].addEventListener("click", function() {
    // Grab the color of the clicked square
    var clickedColor = this.style.backgroundColor;
    // Compare the color to pickedColor
    if (clickedColor === pickedColor) {
      messageDisplay.textContent = "Correct! You got it!";
      resetButton.textContent = "Play Again?";
      changeColor(clickedColor);
      h2.style.backgroundColor = clickedColor;
    } else {
      this.style.backgroundColor = "#232323";
      messageDisplay.textContent = "Nope! Try again!";
    }
  });
}

function pickTheColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function changeColor(color) {
  // Loop through all of the squares
  for (var i = 0; i < squares.length; i++) {
    // Change each color to match the selected color
    squares[i].style.backgroundColor = color;
  }
}

function generateRandomColors(num) {
  // Make an array.
  var arr = [];
  // Add num random colors to the array.
  for (var i = 0; i < num; i++) {
    // Get a random color and push it into the array.
    arr.push(randomColor());
  }
  // Return that array.
  return arr;
}

function randomColor() {
  // Pick a Red value from 0-255
  var r = Math.floor(Math.random() * 256);
  // Pick a Green value from 0-255
  var g = Math.floor(Math.random() * 256);
  // Pick a Blue value from 0-255
  var b = Math.floor(Math.random() * 256);

  // Return the new RGB string.
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
