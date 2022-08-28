// GLOBAL VARIABLES //
let img;
let song;
let snake;
let scl;
let totalPoints;
let livesLeft;
let dead;
let paused;
let help;

// PRELOAD SONG //
function preload() {
  song = loadSound("SnakeTheme.mp3");
  img = loadImage("vapor.png");
}

// SETUP //
function setup() {
  createCanvas(564, 564);
  image(img, 0, 0);
  // create pause botton
  const pausedButton = createButton("pause");
  pausedButton.position(5, 5);
  pausedButton.style("font-weight", "bold");
  pausedButton.style("background-color", "transparent");
  pausedButton.style("color", "white");
  pausedButton.style("border", "solid");
  pausedButton.elt.addEventListener("click", function () {
    paused = true;
  });
  // create help botton
  const helpButton = createButton("help");
  helpButton.position(width - 50, 5)
  helpButton.style("font-weight", "bold");
  helpButton.style("background-color", "transparent");
  helpButton.style("color", "white");
  helpButton.style("border", "solid");
  helpButton.elt.addEventListener("click", function () {
    help = true;
  });
  // set up game defaults
  resetSnakeGame();
  frameRate(10);
}

function resetSnakeGame() {
  scl = 15;
  totalPoints = 0;
  livesLeft = 3;
  newSnake();
  song.stop();
  song.loop();
