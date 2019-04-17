class Foton{
  constructor (x,y){
    this.pos = createVector(x,y );
    this.vel =createVector(-c,0) ;
    this.history=[];
    this.stopped =false;
  }
  stop(){
    this.stopped= true ;
  }

  show(){
    strokeWeight(4);
    stroke(255,0,0);
    point(this.pos.x, this.pos.y);

    stroke(44);
    strokeWeight(1);
    beginShape();
    noFill();
    for (let v of this.history ){
      vertex(v.x, v.y);
    }
    endShape();
  }
  update(){
    if ( !this.stopped){
    this.history.push(this.pos.copy());
    const deltaV =this.vel.copy();
    deltaV.mult(dt);
    this.pos.add(deltaV);

    if(this.history.length > 300 ){
      this.history.splice( 0,1);

    }
  }
  }
}