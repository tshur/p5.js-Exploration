function Vehicle() {
  this.pos = new p5.Vector(100, 100);
  this.vel = new p5.Vector(5, 0);
  this.accel = new p5.Vector(0, 0);
  this.r = 5;
  this.origMaxspeed = 5;
  this.maxspeed = 5;
  this.maxforce = 1;

  this.update = function(maxspeed) {
    this.maxspeed = (maxspeed > this.origMaxspeed) ? (maxspeed) : (this.origMaxspeed); // speeds up
    this.vel.add(this.accel);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.accel.mult(0);
  }

  this.applyForce = function(force) {
    this.accel.add(force);
  }
  
  this.seek = function(target) {
    var predictedTargetPos = this.predict(target);
    var desired = p5.Vector.sub(predictedTargetPos, this.pos);
    var d = desired.mag();
    desired.normalize();
    if (d < 100) {
      var spd = map(d, 0, 100, 0, this.maxspeed);
      desired.mult(spd);
    } else {
      desired.mult(this.maxspeed);
    }
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  this.predict = function(target) {
    var distance = dist(target.pos.x, target.pos.y, this.pos.x, this.pos.y);;
    var timeToArrive = distance / this.vel.mag();
    var targetVelCopy = target.vel.copy();
    targetVelCopy.mult(timeToArrive);
    var predictedPos = p5.Vector.add(targetVelCopy, target.pos);
    return predictedPos;
  }
  
  this.show = function() {
    var theta = this.vel.heading() + PI/2;
    fill(255, 0, 0);
    noStroke();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    beginShape();
    vertex(0, -2*this.r);
    vertex(-2*this.r, 2*this.r);
    vertex(2*this.r, 2*this.r);
    endShape(CLOSE);
    pop();
  }
}