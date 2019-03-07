class Particle extends p5.Vector{
  constructor(x, y) {
    super (x,y);
    this.vel=p5.Vector.random2D();


  }
  update() {
   this.add(this.vel);

  }
  show() {
    stroke(255);
    strokeWeight(24);
    point(this.x, this.y);

  }
}