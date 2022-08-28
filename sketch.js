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
}

function newSnake() {
  dead = false;
  paused = false;
  help = false;
  snake = new Snake();
  pickLocation();
}

function pickLocation() {
  const cols = floor(width / scl);
  const rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(3, rows)));
  food.mult(scl);
  for (let i = 0; i < snake.tail.length; i++) {
    if (food.equals(snake.tail[i])) {
      food = createVector(floor(random(cols)), floor(random(1.5, rows)));
      food.mult(scl);
    }
  }
}

function draw() {
  // if snake is not dead and game is not paused, draw snake & food
  if (dead == false && paused == false && help == false) {
    drawGameScreen();
    drawFood();
    livesLeft = constrain(livesLeft, 0, 3);

    snake.update();
    snake.show();
    snake.die();
  }

  // if snake is dead, draw death and game over screens
  else if (help == true) {
    drawHelpScreen();
  } else if (dead == true) {
    if (livesLeft > 0) {
      drawDeathScreen();
    } else if (livesLeft <= 0) {
      drawGameOverScreen();
    }
    // if game is paused, draw pause screen
  } else if (paused == true) {
    drawPauseScreen();
  } 
}

function drawGameScreen() {
  // draw background
  image(img, 0, 0);

  // draw game stats
  fill("white");
  textStyle(BOLD);
  noStroke();
  textAlign(CENTER);
  text(
    `total points: ${totalPoints}\nlives left: ${livesLeft}`,
    width/2,
    20
  );
}
//broken here!! it keeps moving to the right after the ENTER

function drawFood() {
  // update food location
  if (snake.eat(food)) {
    pickLocation();
    totalPoints += 1;
  }

  // draw food
  fill(240, 103, 12);
  noStroke();
  rect(food.x, food.y, scl, scl);
}

function drawPauseScreen() {
  song.pause();
  fill(0);
  rect(0, 0, width, height);
  fill("white");
  textAlign(CENTER);
  text(
    `Oooooh, you're in snakey purgatory.\n\nYou have ${totalPoints} points. \n\nPress Enter to continue your game.`,
    width / 2 ,
    height / 2 - 30
  );

  if (keyIsPressed && keyCode == ENTER) {
    song.play();
    paused = false;
  }
}

function drawHelpScreen(){
  song.pause();
  fill(0)
  rect(0, 0, width, height);
  fill("white");
  textAlign(CENTER)
  text("You're a white snake with 3 lives!\n\nUse the arrow keys on your keyboard to move around.\n\nEat the orange tiles to gain points and grow! \n\nAvoid bumping into walls or yourself, which makes you lose 1 life.\n\n\n Press Enter to continue playing!", 
       width / 2,
      height / 2 - 30);
  
  if (keyIsPressed && keyCode == ENTER) {
    song.play();
    help = false;
  }
  
}

function drawDeathScreen() {
  song.stop();
  fill(0);
  rect(0, 0, width, height);
  fill("white");
  textAlign(CENTER);
  text(
    `Uh oh! You died. \n\nNumber of lives left: ${livesLeft}. \n\nPress Enter to restart.`,
    width / 2,
    height / 2 - 30
  );

  if (keyIsPressed && keyCode == ENTER) {
    newSnake();
    song.loop();
  }
}

function drawGameOverScreen() {
  song.stop();
  fill(0);
  rect(0, 0, width, height);
  fill("white");
  textAlign(CENTER);
  text(
    `Game over.\n\nYou earned ${totalPoints} points in total this game!\n\nPress Enter to start a new game.`,
    width / 2,
    height / 2
  );

  if (keyIsPressed && keyCode == ENTER) {
    resetSnakeGame();
    newSnake();
    song.loop();
  }
}

function keyPressed() {
  if (keyCode == LEFT_ARROW && snake.currDir() != "(1, 0)") {
    snake.dir(-1, 0);
  } else if (keyCode == RIGHT_ARROW && snake.currDir() != "(-1, 0)") {
    snake.dir(1, 0);
  } else if (keyCode == UP_ARROW && snake.currDir() != "(0, 1)") {
    snake.dir(0, -1);
  } else if (keyCode == DOWN_ARROW && snake.currDir() != "(0, -1)") {
    snake.dir(0, 1);
  }
}

/*
MASTER CHECKLIST
- restyle buttons using CSS
- "pause then help" function bugging - when user presses help  button, the other current button (help) needs to toggle off on its own
*/
