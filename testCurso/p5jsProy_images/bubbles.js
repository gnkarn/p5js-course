class Bubble {
  constructor(_x, _y, _r, _color, _frec, _stroke = 150, _img=flower, _intersect = false) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.frec = _frec; // periodo de oscilacion de la transparencia
    this.stroke = _stroke;
    this.img = _img;
    this.intersect = _intersect;
  }
  
  move() {
    this.x = this.x + random(-3, 3);
    this.y = this.y + random(-2, 2);
  }
  rollover(px, py) {
    let d = int(dist(px, py, this.x, this.y));
    if (d < this.r / 2) {
      return true;
    } else {
      return false;
    }
  }
  // acording to  collision , set flag to change shape 
  changeStroke(t) {
    this.intersect = t;
    // podria hacer si cambia de false a tru entonce cambia el gatito
  }


  intersects(other) {
    // las imagenes tienen coordenadas arriba a la izquiers y el circulo en el centro
    let d = int(dist(this.x + this.r / 2, this.y + this.r / 2, other.x + other.r / 2, other.y + other.r / 2));
    return (d < (this.r + other.r) / 2);

  }


  // la frecuencia de oscilacion de cada bubble es propia y depende del numero de burbuja
  show(n) {
    image(this.img, this.x, this.y, this.r, this.r );
    stroke(255, 255, 255, this.stroke);
    strokeWeight(4);

    // // variacion 255 * abs(sin(2 * PI * n / this.frec)+20
    noFill();

    if (this.intersect) {
      ellipse(this.x + this.r / 2, this.y + this.r / 2, (this.r + 2), (this.r + 2));
    }

  }
}