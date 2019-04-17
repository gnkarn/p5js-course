// blackhole

class blackHole {

  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.mass = m;
    this.rs = 2*G * this.mass / (c*c);
  }


  pull(foton) {
    let force = p5.Vector.sub(this.pos, foton.pos);
    const r = force.mag(); // calcula la magnitud del vector  distancia
    const fg = G * this.mass / (r * r); // realmente es la aceleracion no la fuerza , para evitar multiplicar por la masa del foton que es cero
    force.setMag(fg);
    foton.vel.add(force);
    foton.vel.setMag(c); // pues la magnitud de la velocidad de mantenerse constante 

    if (r < this.rs){
      foton.stop();
    }
  }
  show() {
    fill(0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.rs);

    noFill();
    stroke(100);
    strokeWeight(10);
    ellipse(this.pos.x, this.pos.y, this.rs * 3 + 5);
    stroke(180, 150, 50, 100);
    strokeWeight(5);
    ellipse(this.pos.x, this.pos.y, this.rs * 1.5 + 5);
  }
}