// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

class Bird {
  constructor(brain) {
    this.y = height / 2;
    this.x = 64;

    this.gravity = 0.7;
    this.lift = -16;
    this.velocity = 0;

    this.score = 0;
    this.fitness = 0; // para seleccion
    if (brain){
      this.brain=brain.copy();

    }else { // si el bird aun no tiene brain
    this.brain = new NeuralNetwork(5, 8, 2); // cambia
    }
  }

  show() {
    stroke(255);
    fill(255, 100);
    ellipse(this.x, this.y, 32, 32);
  }

  up() {
    this.velocity += this.lift;
  }

  mutate() {
    this.brain.mutate(.1);
  }

  think(pipes) {

    // find closest pipe
    let closest = null;
    let closestD = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let d = (-this.x + pipes[i].x+pipes[i].w);
      if (d < closestD && d > 0) {
        closestD = d;
        closest = pipes[i];
      }
    }
    let inputs = [];
    inputs[0] = this.y / height; // posicion del bird
    inputs[1] = closest.top / height; // pos del pipe
    inputs[2] = closest.bottom / height;
    inputs[3] = closest.x / width;
    inputs[4] = this.velocity/10; // new input , si se ppone vel cero , hay que bajar this.lift

    let output = this.brain.predict(inputs);
    if (output[0] > output[1]) { //  && this.velocity >= 0 solo permnite que salte si va para abajo
      this.up();
    }

  }

  offscreen(){
    return ( this.y> height || this.y <0);
  }

  update() {
    this.score++; // vivio mas tiempo

    this.velocity += this.gravity;
    // this.velocity *= 0.9;
    this.y += this.velocity;

    // if (this.y > height) {
    //   this.y = height;
    //   this.velocity = 0;
    // }

    // if (this.y < 0) {
    //   this.y = 0;
    //   this.velocity = 0;
    // }

  }

}