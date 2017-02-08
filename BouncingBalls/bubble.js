MAX_BOUNCES = 1000;
DAMPING_FACTOR = 0.9;

function Bubble(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(random(-7, 7), random(-7, 7));
  this.acc = createVector(0, 0);
  this.r = 12;
  this.col = color(random(0, 255), random(0, 255), random(0, 255), 200);
  
  var gravity = createVector(0, 0.22);
  this.bounces = 0;

  this.display = function() {
    stroke(this.col);
    fill(this.col);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }
  
  this.update = function() {
    if (this.pos.x > width - this.r)
      this.pos.x = width - this.r;
    if (this.pos.x < this.r)
      this.pos.x = this.r;
    if (this.pos.x >= width - this.r || this.pos.x <= this.r) {
      this.vel.x *= -DAMPING_FACTOR;
    }
    
    if (this.pos.y > height - this.r)
      this.pos.y = height - this.r;
    if (this.pos.y >= height - this.r && this.vel.y >= 0) {
      this.vel.y *= -DAMPING_FACTOR;
      this.bounces++;
    } else {
      this.addForce(gravity);
    }
    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  this.isFinished = function() {
    return (this.bounces > MAX_BOUNCES)
      ? (true) : (false);
  }
  
  this.addForce = function(force) {
    this.acc.add(force);
  }
  
  this.checkCollision = function(other) {
    var d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
    if (d < this.r + other.r) {
      var dir = p5.Vector.sub(other.pos, this.pos);
      dir.normalize();
      var heading1 = p5.Vector.angleBetween(dir, this.vel);
      dir.mult(-1);
      var heading2 = p5.Vector.angleBetween(dir, other.vel);
    
      //var temp = this.vel;
      //this.vel = other.vel;
      //other.vel = temp;
      
      this.vel.rotate(2*heading1 - this.vel.heading());
      this.vel.mult(-1);
      
      dir.mult(-1);
      other.vel.rotate(2*heading2 - other.vel.heading());
      other.vel.mult(-1);
      
      this.pos.add(this.vel);
      other.pos.add(other.vel);
      
      this.bounces++;
      other.bounces++;
    }
  }
}