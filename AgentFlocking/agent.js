function Agent(type) {
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(random(0.3, 0.7), -random(0.3, 0.7));
  this.acc = createVector(0, 0);
  this.r = 10;
  this.type = type;

  switch (type) {
    case 'predator':
      this.maxspeed = 2.5;
      this.maxforce = 0.05;
      this.color = color(255, 0, 0, 150);
      break;

    case 'prey':
      this.maxspeed = 3;
      this.maxforce = 0.02;
      this.color = color(0, 255, 0, 150);
      break;

    default:
      console.log('unknown type');
      this.maxspeed = 0;
      this.maxforce = 0;
      this.color = color(255);
      break;
  }
  this.vel.setMag(this.maxspeed);
  this.desiredVel = this.vel.copy();

  this.show = function() {
    stroke(255, 150);
    strokeWeight(3);
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, 2 * this.r, 2 * this.r);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.continueBounds();
    this.acc.mult(0);
  }

  this.steer = function(others) {
    if (this.type == 'predator') {
      var seek = this.seek(others);
      var avoid = this.avoid(others);
      var avoidWall = this.avoidWall();

      seek.mult(2);
      avoid.mult(1);
      avoidWall.mult(1);

      this.applyForce(seek);
      this.applyForce(avoid);
      this.applyForce(avoidWall);
    } else {
      // var flee = this.flee(others);
      var avoid = this.avoid(others);
      var migrate = this.migrate();
      // var avoidWall = this.avoidWall();

      // flee.mult(1.3);
      avoid.mult(2.5);
      migrate.mult(1);
      // avoidWall.mult(2);

      // this.applyForce(flee);
      this.applyForce(avoid);
      this.applyForce(migrate);
      // this.applyForce(avoidWall);
    }
  }

  this.flee = function(others) {
    var steer = createVector(0, 0);
    var count = 0;

    for (var i = 0; i < others.length; i++) {
      if (others[i].type == 'predator') {
        var diff = p5.Vector.sub(others[i].pos, this.pos);
        var d = diff.mag();
        diff.normalize();
        diff.div(d);
        steer.add(diff);
        count++;
      }
    }

    if (count > 0) {
      steer.div(count);
    }

    if (steer.mag() > 0) {
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.vel);
      steer.limit(this.maxforce);
      steer.mult(-1);
    }
    return steer;
  }
  
  this.migrate = function() {
    var steer = p5.Vector.sub(this.desiredVel, this.vel);
    steer.limit(this.maxforce);
    return steer;
  }

  this.seek = function(others) {
    var nearest = others[0];
    var minDist = p5.Vector.dist(nearest.pos, this.pos);
    for (var i = 0; i < others.length; i++) {
      var d = p5.Vector.dist(others[i].pos, this.pos);
      if (d > 0 && d < minDist && others[i].type == 'prey') {
        nearest = others[i];
        minDist = d;
      }
    }
    var desired = p5.Vector.sub(nearest.pos, this.pos);
    desired.normalize();
    desired.mult(this.maxspeed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  }

  this.avoid = function(others) {
    var desiredDistance = 28;
    var steer = createVector(0, 0);
    var count = 0;

    for (var i = 0; i < others.length; i++) {
      var d = p5.Vector.dist(others[i].pos, this.pos);
      if (d > 0 && d < desiredDistance && others[i].type == this.type) {
        var diff = p5.Vector.sub(this.pos, others[i].pos);
        diff.normalize();
        diff.div(d);
        steer.add(diff);
        count++;
      }
    }

    if (count > 0) {
      steer.div(count);
    }

    if (steer.mag() > 0) {
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

  this.avoidWall = function() {
    var desiredDistance = 60;
    var steer = createVector(0, 0);

    if (this.pos.x < desiredDistance) {
      steer.add(createVector(1, 0));
    } else if (this.pos.x > width - desiredDistance) {
      steer.add(createVector(-1, 0));
    }
    if (this.pos.y < desiredDistance) {
      steer.add(createVector(0, 1));
    } else if (this.pos.y > height - desiredDistance) {
      steer.add(createVector(0, -1));
    }

    if (steer.mag() > 0) {
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.vel);
      steer.limit(this.maxforce);
    }
    return steer;
  }

  this.collides = function(other) {
    var d = p5.Vector.dist(other.pos, this.pos);
    if (d < other.r + this.r) {
      return true;
    } else {
      return false;
    }
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.stopBounds = function() {
    if (this.pos.x < this.r) {
      this.pos.x = this.r;
    } else if (this.pos.x > width - this.r) {
      this.pos.x = width - this.r;
    }
    if (this.pos.y < this.r) {
      this.pos.y = this.r;
    } else if (this.pos.y > height - this.r) {
      this.pos.y = height - this.r;
    }
  }

  this.continueBounds = function() {
    if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    } else if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    }
    if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    } else if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    }
  }
}