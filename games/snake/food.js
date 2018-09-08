function Food() {
  this.x;
  this.y;
  this.scale;
  this.value;

  this.draw = function() {
    fill(color("red"));
    rect(this.x, this.y, this.scale, this.scale);
  };

  this.generate = function() {
    var cols = floor(canvasWidth/scl);
    var rows = floor(canvasHeight/scl);
    this.x = floor(random(cols)) * scl;
    this.y = floor(random(rows)) * scl;
    this.value = floor(random(100));
    this.scale = scl;
  };
}
