var canvasWidth = 620;
var canvasHeight = 620;
var number = 10;
var toWin = 5; //a győzelemhez szükséges elemek száma
var frameWidth = 2;
var fieldWidth = (canvasWidth - 2 * number * frameWidth - frameWidth) / number;

var table;
var onTurn;
var over;

var oImage;
var xImage;

function initGame(){
  table = [];
  onTurn = "X";
  over = false;

  table = new Array(number);
  for (var i = 0; i < number; ++i) {
    table[i] = new Array(number);
    for (var j = 0; j < number; ++j) {
      var xpos = frameWidth + (canvasWidth * j) / number;
      var ypos = frameWidth + (canvasHeight * i) / number;
      table[i][j] = new Field(xpos, ypos, fieldWidth);
    }
  }
}
function preload(){
  oImage = loadImage("owins.png");
  xImage = loadImage("xwins.png");
}
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  initGame();
}

function draw() {
  background(0);
  strokeWeight(frameWidth);

  for (var i = 0; i < number; ++i) {
    for (var j = 0; j < number; ++j) {
      table[i][j].display();
    }
  }

  if(over){
    winnerWindow(onTurn);
  }
}

function winnerWindow(onTurn){
  var zoom = 2/3;
  var imageHeight = 265 * zoom;
  var imageWidth = 577 * zoom;
  tint(255, 235); //átlátszóság
  if(onTurn == "O"){
    image(oImage, (canvasWidth-imageWidth)/2, (canvasHeight-imageHeight)/2 , imageWidth, imageHeight);
  }
  else{
    image(xImage, (canvasWidth-imageWidth)/2, (canvasHeight-imageHeight)/2 , imageWidth, imageHeight);
  }
 
}

function keyTyped() {
  if (key === 'r' || key === 'R') {
    initGame();
  } 
  //to prevent any default behavior
  return false;
}

function mousePressed() {
  if(over) return;
  if (mouseButton === LEFT) {
    if (onTurn == "X") {
      if(placeSign(mouseX, mouseY) && !over)
        onTurn = "O";                   //ha sikeres lerakás, akkor a másik jön
    } else {
      if(placeSign(mouseX, mouseY) && !over)
        onTurn = "X";
    }
  }
}

function placeSign(x, y) {
  for (var i = 0; i < number; ++i) {
    for (var j = 0; j < number; ++j) {
      if (table[i][j].inside(x, y) && table[i][j].status == "empty") {
        table[i][j].place(onTurn);
        if(checkIfWinner(i, j, onTurn)){
          over = true;
        }
        return true;
      }
    }
  }
  return false;
}

function checkIfWinner(i, j, sign) {
  //vízszintesen
  var db = 1;
  var col = j - 1;
  while (col >= 0) {
    if (table[i][col].status == sign) ++db;
    else break;
    col--;
  }

  col = j + 1;
  while (col < number) {
    if (table[i][col].status == sign) ++db;
    else break;
    col++;
  }
 
  if (db == toWin) return true;
  
  //függőlegesen
  db = 1;
  var row = i - 1;
  while (row >= 0) {
    if (table[row][j].status == sign) ++db;
    else break;
    row--;
  }
  row = i + 1;
  while (row < number) {
    if (table[row][j].status == sign) ++db;
    else break;
    row++;
  }

  if (db == toWin) return true;

  //lefelé átlósan
  db = 1;
  row = i - 1;
  col = j - 1;
  while (row >= 0 && col > 0) {
    if (table[row][col].status == sign) ++db;
    else break;
    row--;
    col--;
  }
  row = i + 1;
  col = j + 1;
  while (row < number && col < number) {
    if (table[row][col].status == sign) ++db;
    else break;
    row++;
    col++;
  }

  if (db == toWin) return true;
  

  //felfelé átlósan
  db = 1;
  row = i + 1;
  col = j - 1;
  while (row < number && col >= 0) {
    if (table[row][col].status == sign) ++db;
    else break;
    row++;
    col--;
  }
  row = i - 1;
  col = j + 1;
  while (row >= 0 && col < number) {
    if (table[row][col].status == sign) ++db;
    else break;
    row--;
    col++;
  }

  if (db == toWin) return true;

  return false;
}
