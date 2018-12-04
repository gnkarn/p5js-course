class Bubble {
  constructor(_x, _y, _r, _color, _frec, _stroke) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.color = _color;
    this.frec = _frec; // periodo de oscilacion de la transparencia
    this.stroke = _stroke;
  }
  move() {
    this.x = this.x + random(-3, 3);
    this.y = this.y + random(-2, 2);
  }
  rollover(px, py) {
    let d = int(dist(px, py, this.x, this.y));
    if (d < this.r/2) {
      return true;
    } else {
      return false;
    }
  }

  changeStroke(t) {
    this.stroke = (t) * 255;
  }


  intersects(other) {
    let d = int(dist(this.x, this.y, other.x, other.y));
    return (d < (this.r + other.r)/2) ;

  }


  // la frecuencia de oscilacion de cada bubble es propia y depende del numero de burbuja
  show(n) {
    stroke(255, 255, 255, this.stroke);
    strokeWeight(4);

    // variacion 255 * abs(sin(2 * PI * n / this.frec)+20
    fill(this.color, 33,33, 200);
    ellipse(this.x, this.y, this.r, this.r);
  }
}