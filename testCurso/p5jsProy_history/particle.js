var gravity = .05;

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.yspeed = 0;
  this.history = [];

  this.update = function () {
    this.y += this.yspeed;
    this.yspeed += gravity;
    this.x += (abs(this.yspeed)> 2)*random(-4, 4);

      //puedo cambiar los puntos de la historia aqui


    //llego abajo?
    if (this.y >= height - 30) {
      this.y = height - 30;
      this.yspeed *= -0.9;
      //print(this.y ,this.yspeed);
      if (this.yspeed >= -0.8) {
        //print(this.yspeed);
        //si se quedo abajo , le da una patadita
        this.yspeed = random(-4, -8);
      }
    }
    var v = createVector(this.x, this.y);
    this.history.push(v);
    //print(v);
    // solo deja los ultimos 30 elementos de la historia del movimiento y va sacando el mas antiguo
    if (this.history.length > 30) {
      this.history.splice(0, 1);
    }
  }

  this.show = function () {
    stroke(0);
    //fill(0, 150, );
    ellipse(this.x, this.y, 15, 15);
    // dibujo las n posiciones guardadas en la historia del objeto

    beginShape(line);
    noFill(); // para que el shape no se muestre como un poligono cerrado
    for (var i = 0; i < this.history.length; i++) {
      var pos = this.history[i];
      var pos1=this.history[i+1];
      // fill(random(255));
      // ellipse(pos.x, pos.y, i, i);
      var col = map(i, 0, this.history.length, 0, 255);
      stroke(0, 0, 0, col);
      vertex(pos.x, pos.y);
      
    }
    endShape(line);

  }
}