var agents = [];
var numPrey = 100;
var numPred = 0;

function setup() {
  createCanvas(800, 600);
  for (var i = 0; i < numPrey; i++) {
    agents[i] = new Agent('prey');
  }
  for (var i = numPrey; i < numPrey + numPred; i++) {
    agents[i] = new Agent('predator');
  }
}

function draw() {
  background(51);
  for (var i = agents.length - 1; i >= 0; i--) {
      agents[i].steer(agents);
      agents[i].update();
      if (agents[i].type == 'predator') {
        for (var j = agents.length - 1; j >= 0; j--) {
          if (agents[j].type == 'prey' && agents[i].collides(agents[j])) {
            agents.splice(j, 1);
            i--;
          }
        }
      }
      agents[i].show();
    }
}