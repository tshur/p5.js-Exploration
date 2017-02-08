function Mouse() {
  this.pos = new p5.Vector(width/2, height/2);
  this.oldPos = new p5.Vector(mouseX, mouseY);
  this.vel = new p5.Vector(5, 0);
  this.r = 12;

  this.show = function() {
    this.update();
    fill(255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 2 * this.r, 2 * this.r);
  }
  
  this.update = function() {
    this.oldPos = this.pos;
    this.pos = new p5.Vector(mouseX, mouseY);
    this.vel = p5.Vector.sub(this.pos, this.oldPos);
  }
}