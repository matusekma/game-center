var scl = 10;
var points = 0;
var canvasWidth = 600;
var canvasHeight = 600;
var snake;
var food;
var button;
var gameOver;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  frameRate(7);
  gameOver = false;
  snake = new Snake(30, 30, scl);
  food = new Food();
  food.generate();
  initRestartButton();
}

function draw() {
  background(0);
  if (!gameOver) {
    update();
  } else {
    fill(255);
    textAlign(CENTER, CENTER);
    text(
      "You collected " + points + " points!",
      0,
      canvasHeight / 2 - 30,
      canvasWidth,
      15
    );
  }
}

function update() {
  snake.update(food);
  food.draw();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    snake.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    snake.dir(-1, 0);
  }
}

function initRestartButton() {
  button = createButton("restart");
  button.position(
    canvasWidth / 2 - button.size().width / 2,
    canvasHeight / 2 - button.size().height / 2
  );
  button.style("background", "#000000");
  button.style("color", "#ff0000");
  button.style("border", "0px");
  button.mousePressed(newGame);
  button.hide();
}

function finishGame() {
  gameOver = true;
  button.show();
}

function newGame() {
  button.hide();
  snake = new Snake(30, 30, scl);
  food = new Food();
  food.generate();
  gameOver = false;
}
