var vehicle;
var mouse;
var keyboard;

function setup() {
  createCanvas(1000, 600);
  vehicle = new Vehicle();
  mouse = new Mouse();
  keyboard = new Keyboard();
}

function draw() {
  background(0, 160, 130);
  mouse.show();
  //keyboard.show();
  vehicle.show();
  vehicle.seek(mouse);
  vehicle.update(mouse.vel.mag());
}