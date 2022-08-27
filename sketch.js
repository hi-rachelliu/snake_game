// GLOBAL VARIABLES //
var snake;
var scl;
var totalPoints;
var livesLeft;
var dead;
var wallDeath;
var snakeColor;
var paused;
var img;

// PRELOAD SONG //
function preload() {
  song = loadSound("SnakeTheme.mp3");
  img = loadImage("vapor.png");
}

// SETUP //
function setup() {
  createCanvas(600, 600);
  image(img, 0, 0);
  resetSnakeGame();
  frameRate(10);
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
}

function resetSnakeGame() {
  scl = 15;
  totalPoints = 0;
  livesLeft = 3;
  snakeColor = "white";
  newSnake();
  song.stop();
  song.loop();
}

function newSnake() {
  dead = false;
  paused = false;
  snake = new Snake();
  pickLocation();
}

function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
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
  drawGameScreen();
  livesLeft = constrain(livesLeft, 0, 3);

  // if snake is not dead and game is not paused, draw snake & food
  if ((dead == false) & (paused == false)) {
    snake.update();
    snake.show();
    snake.die();
    drawFood();
  }

  // if snake is dead, draw death and game over screens
  if (dead == true) {
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
  // draw background and border
  image(img, 0, 0);
  noFill();
  rect(0, 0, width, height);

  // draw game stats
  fill("white");
  textStyle(BOLD);
  noStroke();
  text(
    `total points: ${totalPoints}\nlives left: ${livesLeft}`,
    width - 90,
    20
  );
}

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
    `Oooooh, you're in snakey land purgatory.\nYou have ${totalPoints} points. \nPress Enter to continue your game.`,
    width / 2,
    height / 2
  );

  if (keyIsPressed & (keyCode == ENTER)) {
    song.play();
    paused = false;
  }
}

function drawDeathScreen() {
  song.stop();
  fill(0);
  rect(0, 0, width, height);
  fill("white");
  textAlign(CENTER);
  text(
    `Uh oh! You died. \nNumber of lives left: ${livesLeft}. \nPress Enter to restart.`,
    width / 2,
    height / 2
  );

  if (keyIsPressed & (keyCode == ENTER)) {
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
    `Game over.\nYou earned ${totalPoints} points in total this game!\nPress Enter to start a new game.`,
    width / 2,
    height / 2
  );

  if (keyIsPressed & (keyCode == ENTER)) {
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
