var dots = [];

function setup() {
  createCanvas(1000, 600);
  for (var i = 0; i < width/15; i++) {
    dots[i] = new Dot(random(width), random(height));
  }
}

function draw() {
  background(0, 170, 140);
  // frameRate(40);
  var d;
  for (var i = 0; i < dots.length; i++) {
    dots[i].show();
    for (var j = i + 1; j < dots.length; j++) {
      if ((d = dist(dots[i].x, dots[i].y, dots[j].x, dots[j].y)) < 130)
        dots[i].connect(dots[j], d);
    }
    dots[i].update();
    dots[i].checkMouse();
  }
}

function mousePressed() {
  for (var i = 0; i < 2; i++) {
    var dot = new Dot(mouseX, mouseY);
    dots.push(dot);
  }
}