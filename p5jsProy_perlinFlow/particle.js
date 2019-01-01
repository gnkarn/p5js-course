//particle
function Particle() {
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(random(2), random(-3));
  this.acc = createVector(0, 0);
  this.maxspeed= 4;// poner slider
  this.prevPos=this.pos.copy();

  this.update = function () {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    

  }

  this.updatePrev=function(){
    this.prevPos.x=this.pos.x ;
    this.prevPos.y=this.pos.y ;
  }
  this.edges = function () {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }

  this.applyForce = function (force) {
    this.acc.add(force);
  }

  this.show = function () {
    strokeWeight(1);
   line(this.pos.x, this.pos.y,this.prevPos.x, this.prevPos.y);
    //point(this.pos.x, this.pos.y); // para particulas
     this.updatePrev();
  }
  this.follow = function (vectors) {
    
    // en base a la posicion de la particula en el campo
    // veo cual es el valor del vector en ese punto y se aplica como fuerza
    var indexp = floor(this.pos.x / scl) + floor(this.pos.y / scl) * cols;
    force = vectors[indexp] ;
    this.applyForce(force);
   
  }




}