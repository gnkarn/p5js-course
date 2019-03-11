class Box {
  constructor(x, y, w, h) {
    let options={
      friction:.2,
      restitution:.5// rebote
    }
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.body = Bodies.rectangle(x, y, w, h,options);
    World.add(world, this.body); // agrega el box al mundo
  }

  show() {
    strokeWeight(1);
    stroke(255);
    fill(127);
    let pos = this.body.position;
    let angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    angle = this.body.angle;
    rotate(angle); // permite que rote segun el angulo calculado para el body
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
}