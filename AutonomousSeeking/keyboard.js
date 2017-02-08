function Keyboard() {
  this.pos = new p5.Vector(width*0.7, height*0.7);
  this.oldPos;
  this.vel;
  this.maxspeed = 5;
  this.r = 12;

  this.show = function() {
    this.update();
    fill(255);
    noStroke();
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, 2 * this.r, 2 * this.r);
  }
  
  this.update = function() {
    this.oldPos = this.pos;
    if (keyIsDown(LEFT_ARROW)) {
      this.pos.x -= this.maxspeed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.pos.x += this.maxspeed;
    }
    if (keyIsDown(UP_ARROW)) {
      this.pos.y -= this.maxspeed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.pos.y += this.maxspeed;
    }
    this.vel = p5.Vector.sub(this.pos, this.oldPos);
  }
}