//tree.js

function Tree() {
  this.root = null;
}
//recorre el arbol , y cuando encuentra un null en la rama izquierda
// muestra su valor pues ese sera el menor, y sigue con la parte derecha , haciendo lo mismo( recorriendo las ramas izquierdas asociadas a ese nodo )
Tree.prototype.traverse = function (val) {
  this.root.visit();
}

Tree.prototype.search = function(val){
 let found=this.root.search(val);
  return found;
}

Tree.prototype.addValue = function (val) {
  let n = new Node(val)
  if (this.root == null) {
    this.root = n;
    this.root.x=width/2;
    this.root.y=20;
  } else {
    this.root.addNode(n);
  }

}