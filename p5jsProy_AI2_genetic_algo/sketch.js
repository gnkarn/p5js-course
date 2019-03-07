// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Seeking "vehicle" follows the mouse position

// Implements Craig Reynold's autonomous steering behaviors
// One vehicle "seeks"
// See: http://www.red3d.com/cwr/
// agregar una interface con sliders para parametros
// valor nutritivo de la comida , relacionado con la velocidad de envejecimiento
//si envejece muy rapido no alcanza reproducirse, mutation rate , pues si no hay mucha variedad 
// la poblacion no se adapta
// crecimiento del veneno , si hay mucho veneno, en el futuroi , se les acorta la cola roja, pues sino nunca llegan a la comida

let vehicles = [];
let food = [];
let maxFood = 100;
let poisson = [];
let maxPoisson = 44;
let numVehicles = 15;

function setup() {
	createCanvas(640, 360);
	for (var i = 0; i < numVehicles; i++) {
		vehicles[i] = new Vehicle(random(width), random(height));
	}

	for (var i = 0; i < maxFood; i++) {
		var x = random(width);
		var y = random(height);

		food.push(createVector(x, y));

	}

	// add poison
	for (var i = 0; i < maxPoisson; i++) {
		var x = random(width);
		var y = random(height);

		poisson.push(createVector(x, y));

	}

}

function draw() {
	background(51);
	//random food
	if (random(1) < .1) {
		var x = random(width);
		var y = random(height);
		food.push(createVector(x, y));
	}
	// cada 5% del tiempo agrega poisson
	if (random(1) < .005) {
		var x = random(width);
		var y = random(height);
		poisson.push(createVector(x, y));
	}
	// let mouse = createVector(mouseX, mouseY);

	// // Draw an ellipse at the mouse position
	// fill(127);
	// stroke(200);
	// strokeWeight(2);
	// ellipse(mouse.x, mouse.y, 48, 48);

	//add food
	for (var i = 0; i < food.length; i++) {
		fill(0, 255, 0);
		noStroke();
		ellipse(food[i].x, food[i].y, 8, 8);
	}

	// add poison
	for (var i = 0; i < poisson.length; i++) {
		fill(255, 0, 0);
		noStroke();
		ellipse(poisson[i].x, poisson[i].y, 8, 8);
	}

	// Call the appropriate steering behaviors for our agents
	for (var i = vehicles.length - 1; i > 0; i--) {
		vehicles[i].behaviours(food, poisson);
		vehicles[i].boundaries();
		var newVehicle = vehicles[i].clone();
		if (newVehicle != null) {
			vehicles.push(newVehicle);
		}
		if (!vehicles[i].update()) {// si esta muerto pongo un food en su lugar
			var x = vehicles[i].position.x;
			var y = vehicles[i].position.y;
			food.push(createVector(x, y));
			vehicles.splice(i, 1); // si esta muerto( sin fuel), lo saco
		}
		if (vehicles[i]) {
			vehicles[i].display();
		} else {
			console.log(" fin")
		}
	}
}