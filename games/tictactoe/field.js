function Field(x, y, scl) {
  this.x = x;
  this.y = y;
  this.scl = scl;
  this.status = "empty";

  this.display = function() {
    fill(0);
    stroke(color(255, 105, 180));
    rect(this.x, this.y, this.scl, this.scl);
    stroke(255);
    if (this.status == "X") {
      this.drawX();
    } else if (this.status == "O") {
      ellipse(this.x  + this.scl/2, this.y  + this.scl/2, this.scl - this.scl/5);
    }
  };

  this.drawX = function(){
    line(this.x + this.scl/5, this.y + this.scl/5, this.x + this.scl - this.scl/5, this.y + this.scl - this.scl/5);
    line(this.x + this.scl/5, this.y + this.scl - this.scl/5, this.x + this.scl - this.scl/5, this.y + this.scl/5);
  };

  this.inside = function(x, y){
    return (this.x < x && this.x + this.scl > x && this.y < y && this.y + this.scl > y );
  };

  this.place = function(what){
    this.status = what;
  };

  this.remove = function(){
    this.status = "empty";
  };

}
