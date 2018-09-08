var canvasWidth = 1000;
var canvasHeight = 500;
var cubeSize = 40;
var dragForce = 0.05;
var stars = [];
var speed = 5;
var numStars = 40;
var groundPos = (canvasHeight * 3) / 4;

var over = false;
var overImg;
var restartImg;

var cube;
var flag;
var obs;

function preload() {
    overImg = loadImage("gamover.png");
    restartImg = loadImage("restart.png");
}
function setup() {
    createCanvas(canvasWidth, canvasHeight);
    init();
}

function draw() {
    cube.update();

    if(obs.length != 0)
        over = checkCollision();

    if (over) {
        gameOver();
    } else {
        gameRunning();
    }


}

function init(){
    generateSky();
    obs = [];
    flag = new Flag();
    cube = new Cube(
        (canvasWidth * 1) / 8,
        groundPos - cubeSize,
        cubeSize,
        color(255, 204, 0)
    );
    obs.push(new Obstacle());

}

function generateSky() {
    for (var i = 0; i < numStars; ++i) {
        stars.push({
            x: random(canvasWidth),
            y: random(groundPos - 30)
        });
    }
}

function gameOver() {
    obs = [];
    background(0);
    image(overImg, 0, 0, canvasWidth, canvasHeight);
    image(restartImg, canvasWidth/2-35, canvasHeight-120, 70, 70);
}

function gameRunning() {
    background(0);
    noStroke();
    drawStars();
    fill(50);
    rect(0, groundPos, canvasWidth, groundPos);


    flag.display();
    cube.display();



    if ((obs.length <= 3 && obs.length > 0 && obs[obs.length-1].x < canvasWidth - cubeSize*3) || obs.length == 0){
        if(random() < 0.02) obs.push(new Obstacle());
    }

    if(obs.length > 0 && obs[0].out){
        obs.shift();
    }  //ha már nincs a képernyőn


    for(var i = 0; i < obs.length; ++i){
        obs[i].display();
    }


}

function checkCollision() {
    var x = cube.x;
    var y = cube.y;
    var s = cube.size;
    for(var i = 0; i<obs.length; ++i){
        if(obs[i].isPointInside(x, y) ||
            obs[i].isPointInside(x + s, y) ||
            obs[i].isPointInside(x, y + s) ||
            obs[i].isPointInside(x + s, y + s)){
            return true;
        }
    }
    return false;

}

function drawStars() {
    for (var i = 0; i < numStars; ++i) {
        var star = stars[i];
        if (star.x > 0) star.x -= speed;
        else star.x = canvasWidth;
        fill(255);
        rect(star.x, star.y, 5, 5);
    }
}

function mouseClicked() {
    if (!over) return;
    var centerX = canvasWidth/2;
    var centerY = canvasHeight-120 + 35;

    if(dist(centerX, centerY, mouseX, mouseY) < 31){
        over = false;
        init();
    }
}
function keyPressed() {
    if (over) return;
    if (keyCode === UP_ARROW && cube.onGround()) {
        cube.jump();
    }
}
