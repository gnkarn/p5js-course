//gifi api k lL5yJMf06DNw8JNH1ztMBJmAWt0jc6oF
// promise 1
let gify = "http://api.giphy.com/v1/gifs/search?api_key=lL5yJMf06DNw8JNH1ztMBJmAWt0jc6oF&limit=5&q=";
let word = "http://api.datamuse.com//words?sp=l??*";

// palabras que relacionadas con horse
// los pedidos estan encadenados, la respuesta de uno , se usa como dato para el siguiente
// function setup() {
// 	noCanvas();
// 	let rn = floor(random(10)); // un elemento random del json de respuestas
// 	// de las palabras que retornan, tomo una de las primeras 20 al azar
// 	// y en base a esta busco un gif
// 	fetch(word)
// 	.then(response => response.json())
// 	.then(json=> {
// 		createP(json[rn].word);
// 		return fetch(gify+json[rn].word);// return a promise
// 	})
// 	.then(response=> response.json())
// 	.then(json=> {
// 		createImg(json.data[0].images['fixed_height_small'].url)
// 	})
// 	.catch(err => console.log(err));
// }


// promise 2

// function setup() {
// 	noCanvas();

// 	delayES8(1000)
// 		.then(() => createP('hello'))
// 		.catch((err) => console.error(err));

// delayPromise('bla')
// 	.then(() => createP('hello2'))
// 	.catch((err) => console.error(err));
//}

// function delayPromise(time) {
// 	return new Promise((resolve, reject) => {
// 		if (isNaN(time)) { // si el argumento no es un numero
// 			reject(new Error('argumento debe ser numero'));
// 		}else{
// 		setTimeout(resolve, time); // igual a setTimeout(()=>resolve(),time);
// 		}
// 	});
// }

// promise 3

// function setup() {
// 	noCanvas();
// 	delayES8(1000)
// 		.then(() => createP('hello'))
// 		.catch((err) => console.error(err));
// }
// async function delayES8(time) {
// 	// this func return a promise
// 	await delay(time);
// 	return;
// }

// promise 4

// function setup() {
// 	noCanvas();
// 	wordGif().
// 	then(results => {
// 		createP(results.word);
// 		createImg(results.img);
// 	}).catch(err => console.error(err));
// }

// async function wordGif() {
// 	let rn = floor(random(5)); // un elemento random del json de respuestas
// 	let response1 = await fetch(word);
// 	let json1 = await response1.json();
// 	let response2 = await fetch(gify + json1[rn].word);
// 	//console.log(gify + json1[rn].word);
// 	let json2 = await response2.json();
// 	let img_url = json2.data[0].images['fixed_height_small'].url;
// 	return {
// 		word: json1[rn].word,
// 		img: img_url
// 	}
// }

//promise all


function setup() {
	noCanvas();
	let promises = [];
	for (let i = 0; i < 11; i++) {
		promises.push(wordGif(i));
	}
	Promise.all(promises)
		.then(results => {
			for (let i = 0; i < results.length; i++) {
				createP(results[i].word);
				console.log("result url " + results[i].img);
				//createImg(results[i].img);
				if (results[i].img !== null) {

					createImg(results[i].img);

				}

			}

		})
}

async function wordGif(num) {
	let rn = floor(random(num)); // un elemento random del json de respuestas
	let response1 = await fetch(word);
	let json1 = await response1.json();
	let response2 = await fetch(gify + json1[rn].word);
	console.log(gify + json1[rn].word);
	let json2 = await response2.json();
	let img_url = null;
	try {
		img_url = json2.data[0].images['fixed_height_downsampled'].url;
		console.log("url " + img_url);
	} catch (err) {
		console.log('no image found for ' + json1[rn].word);
		console.error(err);
	}
	return {
		word: json1[rn].word,
		img: img_url
	}
}