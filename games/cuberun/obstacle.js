function Obstacle() {
    this.double = random() < 0.5 ? true : false;
  
    this.out = false;

    this.width = 20;
    this.height = this.double ? cubeSize*2 - 10 : cubeSize+10;

    this.x = canvasWidth + cubeSize;
    this.y = canvasHeight - canvasHeight/4 - this.height;

    this.display = function(){
       fill(color(100, 200, 100));

       if (this.x + 10 >= 0) {
        this.x -= speed;
      } else {
        this.out = true;
        return;
      } 
        
      rect(this.x, this.y, this.width, this.height);
    };

    this.isPointInside = function(xCoord, yCoord){
        return (xCoord > this.x && xCoord < this.x+this.width && yCoord > this.y && yCoord < this.y+this.height);
    };
}
