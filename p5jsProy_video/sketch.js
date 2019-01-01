//clown nose
// ml5 library , posenet
let video;
let posnet;
let nosex = 0;
let nosey = 0;
let eyely = 0;
let eyery = 0;
let eyelx = 0;
let eyerx = 0;
let r = 5; // radio de la nariz
let d = 0;
var newd = 0;

var damp = .1;
var d_damp = .4;

let slider1;
let sliderd;

function setup() {
	createCanvas(640, 480);
	textSize(15);

	video = createCapture(VIDEO); // esta separado del canvas
	video.hide(); // esconde el video , para solo ver el del canvas
	//console.log(ml5);// verifico si cargo correctamente

	// Create a new poseNet method
	poseNet = ml5.poseNet(video, modelLoaded);

	// When the model is loaded
	function modelLoaded() {
		console.log('Model Loaded!');
	}

	slider1 = createSlider(0, 1, 1, .1);
	sliderd = createSlider(0, 1, 1, .1);
	slider1.position(10, 500);
	sliderd.position(10, 520);
	
	// Listen to new 'pose' events
	poseNet.on('pose', function (results) {
		poses = results;
		//console.log(poses); // ver el objeto y los puntos
		if (poses.length > 0) {
			newx = poses[0].pose.keypoints[0].position.x;
			newy = poses[0].pose.keypoints[0].position.y;
			nosex = lerp(nosex, newx, damp); // linear interpolation
			nosey = lerp(nosey, newy, damp);
			// calcula la distancia entre los ojos
			// como una forma de determinar la distancia a la camara

			neweyelx = poses[0].pose.keypoints[1].position.x;
			neweyely = poses[0].pose.keypoints[1].position.y;
			eyely = lerp(eyely, neweyely, damp); // linear interpolation
			eyelx = lerp(eyelx, neweyelx, damp);

			neweyerx = poses[0].pose.keypoints[2].position.x;
			neweyery = poses[0].pose.keypoints[2].position.y;
			eyery = lerp(eyery, neweyery, damp); // linear interpolation
			eyerx = lerp(eyerx, neweyerx, damp);
			// con la distancia entre los ojos , estima el tamano de la nariz

			newd = dist(neweyerx, neweyery, neweyelx, neweyely);
			d = lerp(d, newd, d_damp);
			///console.log(d);    
		}
	});
	

}




function draw() {
	dump = slider1.value();
	

	d_dump = sliderd.value();

	background(220);
	image(video, 0, 0);

	r = map(d, 20, 100, 15, 80);

	fill(255);
	ellipse(eyerx, eyery, d, d); // ojos
	ellipse(eyelx, eyely, d, d);
	fill(0);
	ellipse(eyerx, eyery, d / 4, d / 4);
	ellipse(eyelx, eyely, d / 4, d / 4);

	fill(255, 0, 0);
	ellipse(nosex, nosey, r, r); // nariz
	// filter(GRAY);
	//filter(THRESHOLD);

}