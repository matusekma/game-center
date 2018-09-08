function Snake(x, y, scl) {
  this.scale = scl;
  this.xspeed = 1;
  this.yspeed = 0;
  this.size = 0;
  this.parts = [createVector(x, y)];

  this.head = function(){
    return this.parts[0];
  }
  this.update = function(food) {
    fill(255);
    if (this.eatFood(food)) {
      this.grow();
    } else {
      this.move();
    }
  };

  this.dir = function(xs, ys) {
    if (this.xspeed != -xs && this.yspeed != -ys) {
      this.xspeed = xs;
      this.yspeed = ys;
    }
  };

  this.eatFood = function(food) {
    var d = dist(food.x, food.y, this.parts[0].x, this.parts[0].y);
    if (d < 1) {
      return true;
    } else return false;
  };
  
  this.move = function(){
    var headX = this.parts[0].x;
    var headY = this.parts[0].y;

    this.parts[0].x = headX + this.xspeed * this.scale;
    this.parts[0].y = headY + this.yspeed * this.scale;

    if(this.parts[0].x == canvasWidth){
      this.parts[0].x = 0;
    }
    if(this.parts[0].x == -scl){
      this.parts[0].x = canvasWidth - scl;
    }
    if(this.parts[0].y == canvasHeight){
      this.parts[0].y = 0;
    }
    if(this.parts[0].y == -scl){
      this.parts[0].y = canvasHeight-scl;
    }

    for(var i = this.parts.length - 1; i > 0 && this.parts.length > 1; --i){
      
      if(this.parts[i].x == this.parts[0].x && this.parts[i].y == this.parts[0].y){
        finishGame();
        return;
      }else{
        if(i == 1){  //a 2. helyen lévőnek a még nem elmozdult állapot kell
          this.parts[i] = createVector(headX, headY); 
        }
        else
          this.parts[i] = createVector(this.parts[i-1].x, this.parts[i-1].y);
      }
  
      rect(this.parts[i].x, this.parts[i].y, this.scale, this.scale);
    }

    rect(this.parts[0].x, this.parts[0].y, this.scale, this.scale);
  };

  //megáll a falnál mozgás:
  
  /*this.move = function(){ //constrain a falnak ütközés miatt
    
    var headX = this.parts[0].x;
    var headY = this.parts[0].y;

    this.parts[0].x = constrain(headX + this.xspeed * this.scale, 0, canvasWidth - this.scale);
    this.parts[0].y = constrain(headY + this.yspeed * this.scale, 0, canvasHeight - this.scale);
    
    

    for(var i = this.parts.length - 1; i > 0 && this.parts.length > 1; --i){
      
      if(this.parts[i].x == this.parts[0].x && this.parts[i].y == this.parts[0].y){
        finishGame();
        return;
      }
      if(this.parts[0].x == headX && this.parts[0].y == headY){
        ; //ha elakad a falnál, akkor nem mozdulunk
      }
      else{
        if(i == 1){  //a 2. helyen lévőnek a még nem elmozdult állapot kell
          this.parts[i] = createVector(headX, headY); 
        }
        else
          this.parts[i] = createVector(this.parts[i-1].x, this.parts[i-1].y);
      }
  
      rect(this.parts[i].x, this.parts[i].y, this.scale, this.scale);
    }

    rect(this.parts[0].x, this.parts[0].y, this.scale, this.scale);
  };*/

  this.grow = function() {
    points += food.value;
    food.generate();

    //utolsó megjegyzése, ide kerül az új
    lastIndex = this.parts.length - 1;
    var newPart = createVector(this.parts[lastIndex].x, this.parts[lastIndex].y);
  
    this.move();

    //új rész hozzárajzolása
    this.parts.push(newPart);

    rect(newPart.x, newPart.y, this.scale, this.scale);
  };
}
