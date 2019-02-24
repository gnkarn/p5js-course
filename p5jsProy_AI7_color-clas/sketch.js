tf.disableDeprecationWarnings();
// ver ml5js.org, making your own datasets
// setear permisos en firebase , y regla por mas seguridad
//https://console.firebase.google.com/project/tf-colorclass/database/tf-colorclass/data
let r, g, b;
let database ;

function setup() {

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyCqgvmF8INq98yeKMV1Ygi8gvevHfghcT4",
		authDomain: "tf-colorclass.firebaseapp.com",
		databaseURL: "https://tf-colorclass.firebaseio.com",
		projectId: "tf-colorclass",
		storageBucket: "tf-colorclass.appspot.com",
		messagingSenderId: "1077142222102"
	};
	firebase.initializeApp(config);

	createCanvas(400, 400);
	pickcolor();

	background(r, g, b);

	let buttons = [];
	buttons.push(createButton('red-ish'));
	buttons.push(createButton('green-ish'));
	buttons.push(createButton('blue-ish'));
	buttons.push(createButton('orange-ish'));
	buttons.push(createButton('yellow-ish'));
	buttons.push(createButton('pink-ish'));
	buttons.push(createButton('purple-ish'));
	buttons.push(createButton('brown-ish'));
	buttons.push(createButton('grey-ish'));

	for (let i = 0; i < buttons.length; i++) {
		buttons[i].mousePressed(sendData);
	}


}


function pickcolor() {
	r = floor(random(256));
	g = floor(random(256));
	b = floor(random(256));
		background(r, g, b);
}

function sendData() {
	console.log(this.html()); // recibe el label del boton presionado
	database= firebase.database();

	let colorDatabase = database.ref('colors');
	// make object with data
	var data = {
		r: r,
		g: g,
		b: b,
		label: this.html()
	}

	console.log("saving data");
	console.log(data);

	let color = colorDatabase.push(data, finished);
	console.log(" firebase generated key : " + color.key);

	function finished(err) {
		if (err) {
			console.error(" oops, something went wrong");
			console.error(err);

		} else {
			console.log(" data saved ok");
			pickcolor();
		}
	}
}

function draw() {

}