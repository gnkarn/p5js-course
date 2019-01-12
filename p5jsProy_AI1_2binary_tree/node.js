//node.js
function Node(val, x, y) {
  this.left = null;
  this.right = null;
  this.value = val;
  this.x = x; // posicion para dibujar el nodo
  this.y = y;

}
Node.prototype.visit = function () {
  if (this.left != null) {
    this.left.visit();
  }
  console.log(this.value);
  fill(255);
  noStroke();
  textAlign(CENTER);
  text(this.value, this.x, this.y);

  if (this.right != null) {
    this.right.visit();
  }
}

Node.prototype.search = function (val) {
  let ll, rr = "";
  if (this.value == val) { // sie encontre el valor lo imprimo
    if (this.left) { // veo si tiene rama izquierda
      ll = this.left.value;
    } else {
      ll = ""
    };
    if (this.right) { // veo si tiene rama derecha
      rr = this.right.value;
    } else {
      rr = ""
    };
    console.log("FOUND " + val + " left " + ll + " right " + rr);
    return this
  } else {
    if (val < this.value) {
      if (this.left != null) { // si es menor busco por la izquierda
        return this.left.search(val);
      }
    } else { // si es mayor busco por la derecha
      if (this.right != null) {
        return this.right.search(val);
      }
    }

  }

}
Node.prototype.addNode = function (n) {
  if (n.value < this.value) {
    if (this.left == null) {
      this.left = n;
       this.left.x = this.x - 20; // esta ubicacion no es correcta , causa superposicion
      this.left.y = this.y + 25;
      stroke(255, 0, 0);
      noFill();
      line(this.x, this.y, this.left.x, this.left.y);
      ellipse(this.x, this.y, 20);
    } else {
      this.left.addNode(n); // es recursivo, pues ese nodo puede estar ocupado , y tengo que seguir comparando
    }
  } else {
    if (n.value > this.value) { // pues si es = no debe hacer nada
      if (this.right == null) {
        this.right = n;
         this.right.x = this.x +20;// esta ubicacion no es correcta , causa superposicion
        this.right.y = this.y + 25;
        stroke(0, 255, 0);
        noFill();
        line(this.x, this.y, this.right.x, this.right.y);
        ellipse(this.x, this.y, 20);
      } else {
        this.right.addNode(n);
      }
    }
  }
}