//Axiom A
//variable A,B
// rules a--> AB  , B --> A

// con 6 ciclos es el arbol que mejor se ve

let len = 100;
let angle;

let axiom = "F";
let rules = [];
// FF forward , + right , - left .[ save location ] restore location 

rules[0] = {
	a: "F",
	b: "FF+[+F-F-F]-[-F+F+F]"
}
// rules[1] = {
// 	a: "B",
// 	b: "A"
// }
let sentence = axiom;

// transforma el string de la secuencia en un grafico
// donde cada caracter reepresenta una orden a la "tortuga"
function turtle() {
		background(0);
	translate(width / 2, height);
	stroke(255,44);
	for (let i = 0; i < sentence.length; i++) {
		let current = sentence.charAt(i);
	//	console.log(current);
		if (current == "F") {
			line(0, 0, 0, -len);
			translate(0, -len);
		} else if (current == "+") {
			rotate(angle);
		} else if (current == "-") {
			rotate(-angle);

		} else if (current == "[") {
			push();
		} else if (current == "]") {
			pop();
		}
	}
}

// genera la secuencia en base a las reglas
function generate() {
	let nextSentence = "";
	for (let i = 0; i < sentence.length; i++) {
		let current = sentence.charAt(i);
		let flag = false;

		for (let j = 0; j < rules.length; j++) {
			if (current == rules[j].a) {
				nextSentence += rules[j].b;
				flag = true;
				break;
			}
		}
		if (!flag) {
			nextSentence += current;
		} // no char matching 

	}
	turtle();
	sentence = nextSentence;
	createP(sentence);
	//console.log(sentence);
	len=len*0.56; //  cada ciclo acorta la long de la rama
}

function setup() {
	createP(axiom);
	createCanvas(400, 400);
	background(0);
	stroke(255,44);
	angle=radians(25);

	//			line(0, 0, 0, -len);
	//turtle();
	let button = createButton("generate");
	button.mousePressed(generate);


}

function draw() {
	stroke(255);
//		turtle();
}