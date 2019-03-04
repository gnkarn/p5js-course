class Confetti extends Particle {
  constructor(x, y) {
    //hereda el constructor de particle y le agrega propiedades
    super(x,y);
    this.bright=random(255);
    this.r=10;
  }
  
  show() {
    strokeWeight(1);
    stroke(255);
    fill(this.bright);
    rect(this.x,this.y,this.r,this.r);
  }
  update(){
    //hereda la func update de particle  y la modifica
    super.update();
    this.r+=random(-5,5);
  }
}