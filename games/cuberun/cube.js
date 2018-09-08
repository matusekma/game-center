function Cube(x, y, siz, c) {
  this.x = x;
  this.y = y;

  this.size = siz;
  this.color = c;

  this.speed = 0;
  this.acceleration = 0;

  this.display = function() {
    stroke(0);
    strokeWeight(2);
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  };

  this.jump = function() {
    this.speed = 17;
    this.acceleration = 0.5;
  };

  this.stop = function() {
    this.speed = 0;
    this.acceleration = 0;
  };

  this.onGround = function() {
    return groundPos - (this.y + this.size) < 0.1;
  };

  this.update = function() {
    if (this.speed == 0 && this.acceleration == 0) return;

    if (this.onGround() && this.speed < 0) {
      this.stop();
      return;
    }

    if (this.speed > 0)
      //felfelé megy
      this.speed = this.speed - this.acceleration - abs(this.speed) * dragForce;
    else
      this.speed = this.speed - this.acceleration + abs(this.speed) * dragForce;

    this.y -= this.speed;
  };
}
