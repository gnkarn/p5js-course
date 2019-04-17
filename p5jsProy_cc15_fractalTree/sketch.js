let angle = 0;
let slider;
let len = 100;
let tree = [];

function setup() {
	createCanvas(400, 400);
	slider = createSlider(0, 2 * PI, PI / 5, PI / 90);
	angle = slider.value();
	let a = createVector(width / 2, height);
	let b = createVector(width / 2, height - len);

	let root = new Branch(a, b);
	tree[0] = root;
	
}

function mousePressed() {
	for (let i = tree.length-1; i >=0; i--) {
		if(!tree[i].finished){
		tree.push(tree[i].growRight());
		tree.push(tree[i].growLeft());
		}
	}
	tree[i].finished=true;

}


function draw() {
	background(0);
	stroke(255);
	for (let i = 0; i < tree.length; i++) {
		tree[i].show();

	}


}