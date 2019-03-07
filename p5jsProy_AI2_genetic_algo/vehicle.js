// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// The "Vehicle" class
var mr=0.5 //mutation rate
class Vehicle {
  constructor(x, y, dna) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.r = 4;
    this.maxspeed = 3;
    this.maxforce = .4;
    this.dna = [];
    // algunos serq atraidos por el veneno, y otros lo rechazaran
    // si es un clon copia el dna, sino nace aleatorio
    if (dna) {
      this.dna[0] = dna[0]; // afecta comportamiento hacia la comida
       if (random(1) < mr) {
         this.dna[0] += random(-.1, .1);
       }
      this.dna[1] = dna[1]; // afgecta comportamiento hacia el veneno
      if (random(1) < mr) {
        this.dna[1] += random(-.1, .1);
      }
      this.dna[2] = dna[2];; // food perception
      if (random(1) < mr) {
        this.dna[2] += random(-10, 10);
      }
      this.dna[3] = dna[3];; // poisson perception( from how far it can be detected)
      if (random(1) < mr) {
        this.dna[3] += random(-10, 10);
      }
    } else {
      // mutation, aleatoriamente ajusta el dna con una pequena variacion aleatoria.
      this.dna[0] = random(-3, 3); // afecta comportamiento hacia la comida
      this.dna[1] = random(-3, 3); // afgecta comportamiento hacia el veneno
      this.dna[2] = random(0, 100);; // food perception
      this.dna[3] = random(0, 100);; // poisson perception( from how far it can be detected)
    }
    this.health = 1;
  }

  // Method to update location
  update() {

    this.health -= .008;

    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
    return (this.health > 0); // si negativo muere
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  behaviours(good, bad) {
    var SteerG = this.eat(good, .3, this.dna[2]);
    var steerB = this.eat(bad, -1, this.dna[3]);

    SteerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);
    this.applyForce(SteerG);
    this.applyForce(steerB);
  }
  eat(list, fuel, perception) {
    var record = Infinity;
    var closestIndex = null;

    for (var i = list.length - 1; i > 0; i--) {
      var d = this.position.dist(list[i]);
      if (d < this.maxspeed) { //  si esta muy cerca lo come
        list.splice(i, 1)
        this.health += fuel; // good or bad nutrients
      } else {
        if (d < record && d < perception) {
          record = d;
          closestIndex = list[i];
        }
      }
    }


    // busca comida , si esta cerca la come

    // si esta cerca lo come

    if (closestIndex) {
      return this.seek(closestIndex);
    }
    return createVector(0, 0);
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {

    var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

    // Scale to maximum speed
    desired.setMag(this.maxspeed);

    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    return steer;
    //this.applyForce(steer);
  }

  boundaries() {
    var desired = null;
    var d = 5;
    if (this.position.x < d) {
      desired = createVector(this.maxspeed, this.velocity.y);
    } else if (this.position.x > width - d) {
      desired = createVector(-this.maxspeed, this.velocity.y);
    }
    if (this.position.y < d) {
      desired = createVector(this.velocity.x, this.maxspeed);
    } else if (this.position.y > (height - d)) {
      desired = createVector(this.velocity.x, -this.maxspeed);
    }
    if (desired != null) {
      desired.normalize();
      desired.mult(this.maxspeed);
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }

  // EVOLUTION clona el vehiculo
  clone() {
    if (random(1) < .004) {
      return new Vehicle(this.position.x, this.position.y, this.dna);
    } else {
      return null
    }
  }

  display() {
    // Draw a triangle rotated in the direction of velocity
    var theta = this.velocity.heading() + PI / 2;
    fill(127);
    stroke(200);
    strokeWeight(1);
    // radios de deteccion de food, poisson
    stroke(0, 255, 0);
    noFill();
    ellipse(this.position.x, this.position.y, this.dna[2] * 2);
    stroke(255, 0, 0);
    ellipse(this.position.x, this.position.y, this.dna[3] * 2);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);

    beginShape();
    // un color que indica la salud del vehiculo
    fill(lerpColor(color(255, 0, 0), color(0, 255, 0), this.health));
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);

    // muestra la magnitud de la fuerza de atraccion repulsion, segun su DNA
    stroke(0, 255, 0);
    strokeWeight(5);
    line(0, 0, 0, -this.dna[0] * 20);
    stroke(255, 0, 0);
    strokeWeight(2);
    line(0, 0, 0, -this.dna[1] * 20);
    pop();
  }
}