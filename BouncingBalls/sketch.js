bubbles = [];

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);
  for(var i = bubbles.length-1; i >= 0; i--) {
    bubbles[i].display();
    bubbles[i].update();
    if(bubbles[i].isFinished())
      bubbles.splice(i, 1);
  }
  for(var i = bubbles.length-1; i >= 0; i--) {
    for (var j = i - 1; j >= 0; j--) {
      bubbles[i].checkCollision(bubbles[j]);
    }
  }
}

function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY));
}

function mouseDragged() {
  bubbles.push(new Bubble(mouseX, mouseY));
}