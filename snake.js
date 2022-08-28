function Snake() {
  this.x = 0;
  this.y = 3 * scl;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.dir = function (x_coord, y_coord) {
    this.xspeed = x_coord;
    this.yspeed = y_coord;
  };

  this.update = function () {
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x += this.xspeed * scl;
    this.y += this.yspeed * scl;
  };

  this.currDir = function(){
    return(`(${this.xspeed}, ${this.yspeed})`) 
  }
  
  this.show = function () {
    //Print rectangles
    fill("white");
    noStroke();
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
  };

  this.eat = function (pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  };

  this.die = function () {
    if (
      (this.y >= height - scl) |
      (this.y < 0) |
      (this.x >= width - scl) |
      (this.x < 0)
    ) {
      dead = true;
      livesLeft--;
    }
    for (var i = 0; i < this.tail.length; i++) {
      var d = dist(this.x, this.y, this.tail[i].x, this.tail[i].y);
      if (d < 1) {
        dead = true;
        livesLeft--;
      }
    }
  };
}
