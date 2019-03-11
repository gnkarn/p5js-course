class Particle {
  constructor(x, y, r,fixed) {
    let options = {
      friction: .02,
      restitution: .5 ,// rebote
      isStatic: fixed
    }
    this.x = x;
    this.y = y;
    this.r = r;

    this.body = Bodies.circle(x, y, r, options);
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
    ellipse(0, 0, this.r*2);
    line(0,0,this.r,0); // para ver el radio y detectar rotacion
    pop();
  }
  isOffScreen(){
    let pos=this.body.position;
    return (pos.y >height+100);
    
  }
  removeFromWorld(){
    World.remove(world,this.body);
  }
}