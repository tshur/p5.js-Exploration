var MOUSE_TOL = 150;

function Dot(x, y) {
  this.x = x;
  this.y = y;
  this.r = random(1, 5);
  this.col = color(255, 255, 255, 150);

  this.velx = random(-1, 1);
  this.vely = random(-1, 1);

  this.show = function() {
    noStroke();
    fill(this.col);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
  
  this.update = function() {
    this.x += this.velx;
    this.y += this.vely;
    
    if (this.x < -this.r) {
      this.x = width + this.r;
    }
    if (this.x > width + this.r) {
      this.x = -this.r;
    }
    if (this.y < -this.r) {
      this.y = height + this.r;
    }
    if (this.y > height + this.r) {
      this.y = -this.r;
    }
  }
  
  this.connect = function(other, d) {
    var a = map(d, 0, 150, 255, 0);
    stroke(255, 255, 255, a);
    strokeWeight(0.5);
    line(this.x, this.y, other.x, other.y);
  }
  
  this.checkMouse = function() {
    var d = dist(this.x, this.y, mouseX, mouseY);
    if (d < MOUSE_TOL) {
      var xsign = 1; var ysign = 1;
      if (this.x < mouseX) xsign = -1; if (this.y < mouseY) ysign = -1;
      
      var shift = (1/Math.sqrt(2))*(MOUSE_TOL - d)
      this.x += xsign*shift;
      this.y += ysign*shift;
    }
  }
}