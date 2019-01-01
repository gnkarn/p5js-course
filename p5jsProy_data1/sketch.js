var data;
var tot = 0;

// function preload() {
// 	data = loadJSON("birds.json");

// }

function endLoad(data){
	var pajaros = data.birds;
	
	for (var i = 0; i < pajaros.length; i++) {
		createElement("h1", pajaros[i].family);
		tot += pajaros[i].members.length;
		print(pajaros[i].family + " " + pajaros[i].members.length);
	}
	print("total " + tot);
}

function setup() {
	noCanvas();
data = loadJSON("birds.json", endLoad);
	
}

function draw() {

}