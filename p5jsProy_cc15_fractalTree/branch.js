class Branch {
  constructor(start,end,d =8){
    this.begin=start;
    this.end=end;
   this.d=d; // ancho del tronco
   this.finished=false;
  }

  show(){
    strokeWeight(this.d);
    line(this.begin.x,this.begin.y,this.end.x,this.end.y);
  }

  growRight() {
    let dir = p5.Vector.sub(this.end, this.begin); // la direccion de la rama anterior
    dir.rotate(angle); // gira para proxima rama
    dir.mult(.7);
    let d = dir.mag() / 8;
    let newEnd = p5.Vector.add(this.end, dir); // calcula direccion de proxima rama
    let right = new Branch(this.end, newEnd, d);
    return right;
  }
  growLeft() {
    let dir = p5.Vector.sub(this.end, this.begin); // la direccion de la rama anterior
    dir.rotate(-angle); // gira para proxima rama
    dir.mult(0.7);
    let d = dir.mag() / 8;
    let newEnd = p5.Vector.add(this.end, dir); // calcula direccion de proxima rama
    let left = new Branch(this.end, newEnd,d);
    return left;
  }
}