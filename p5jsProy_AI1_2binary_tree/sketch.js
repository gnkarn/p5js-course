// el arbol tiene nodos , cada nodo puede tener una rama
//izquierda con un valor menor, una derecha con un valor mayor , y 
// su propio valor de nodo
// en el arbol , pueden agregarse noidos con valores ( add)
// listar sus nodos ordenados de menor a mayor ( traverse)
// busca si un valor determinado existe o no en el arbol.(search)

let tree;
let val;

function setup() {
	createCanvas(600, 400);
	background(51);

	tree = new Tree();
	for (let i = 0; i < 32; i++) {
		tree.addValue(floor(random(100)));
	}
	console.log(tree);
	tree.traverse(); // lista los valores de todos los nodos ordenados

	tree.search(55); //  busca si esta este valor
	
}



function draw() {

}