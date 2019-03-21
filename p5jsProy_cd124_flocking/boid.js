class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D(); // magnitude 1
    this.velocity.setMag(random(-22, 22));
    this.acceleration = createVector();
    this.maxForce = 1;
    this.maxSpeed = 5;
  }

  show() {
    strokeWeight(8);
    stroke(255);
    point(this.position.x, this.position.y);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0); // resetea para aplicar la nueva fuerza ( no es una celeracion permanete , es una fuerza de correccion)
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }
  flock(boids) {

    let aligment = this.align(boids);
    let cohesion = this.cohesion(boids);
    // debo sumar ambas fuerzas la de cohesion y la de aligment
    let separation = this.separation(boids);

    separation.mult(separationSlider.value());
    cohesion.mult(cohesionSlider.value());
    aligment.mult(alignSlider.value());
    this.acceleration.add(separation);
    this.acceleration.add(aligment);
    this.acceleration.add(cohesion);
  }

  align(boids) {
    let n = 0;
    let steer = createVector();
    let perceptionRadius = 55; // radio de perception
    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (d < perceptionRadius && other != this) {
        steer.add(other.velocity);
        n++;
      }

    }
    if (n > 0) {
      steer.div(n);
      steer.setMag(this.maxSpeed); // asi setea la direccion a la del flock pero no la misma vel
      steer.sub(this.velocity);
      steer.limit(this.maxForce);

    }
    return steer;
  }

  cohesion(boids) {
    let n = 0;
    let steer = createVector();
    let perceptionRadius = 55; // radio de perception
    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (d < perceptionRadius && other != this) {
        steer.add(other.position);
        n++;
      }

    }
    if (n > 0) {
      steer.div(n);
      steer.sub(this.position);
      steer.setMag(this.maxSpeed); // asi setea la direccion a la del flock pero no la misma vel
      steer.sub(this.velocity);
      steer.limit(this.maxForce);

    }
    return steer;
  }

  separation(boids) {
    let n = 0;
    let steer = createVector();
    let perceptionRadius = 22; // radio de perception
    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (d < perceptionRadius && other != this) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d);
        steer.add(diff);
        n++;
      }

    }
    if (n > 0) {
      steer.div(n);
      steer.setMag(this.maxSpeed); // asi setea la direccion a la del flock pero no la misma vel
      steer.sub(this.velocity);
      steer.limit(this.maxForce);

    }
    return steer;
  }

}