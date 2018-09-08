function Flag() {
  this.color = color(255, 0, 0);

  this.x = canvasWidth - 30;
  this.y = canvasHeight - 90;
  this.distance = 0;

  this.toDrawText = false;              //Minden 2. körben jöjjön méter!!!

  this.display = function() {
      fill(0);
      rect(this.x, this.y, 10, 60);
      fill(this.color);
      triangle(
        this.x,
        this.y,
        this.x,
        this.y + cubeSize,
        this.x - cubeSize,
        this.y + cubeSize / 2
      );

      fill(0);
      
      textSize(20);
      if(this.toDrawText){
        text(this.distance + " m", this.x-10, this.y + 80);
      }

      if (this.x + 10 >= 0) {
        this.x -= speed;
      } else {
        this.x = canvasWidth + cubeSize;
        this.color = color(random(255), random(255), random(255));
        if(!this.toDrawText) this.distance += 10;
        this.toDrawText = !this.toDrawText;
      }
  };
}
