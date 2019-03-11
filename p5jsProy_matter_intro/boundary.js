class Boundary {
  constructor(x, y, w, h, options) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.options=options;

    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, this.options);
    World.add(world, this.body); // agrega el piso, ( pero aun no se ve)
  }

  show(){
    let pos = this.body.position;
    let angle = this.body.angle;
    push();
    translate(pos.x,pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(127);
    rect(0,0,this.w,this.h);
    pop();
    }
}