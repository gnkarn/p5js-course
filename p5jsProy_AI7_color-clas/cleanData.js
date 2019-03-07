// clean data
//f.disableDeprecationWarnings();

let colorBylabel = {
  'red-ish': [],
  'green-ish': [],
  'blue-ish': [],
  'orange-ish': [],
  'yellow-ish': [],
  'pink-ish': [],
  'purple-ish': [],
  'brown-ish': [],
  'grey-ish': []

}
let label = 'blue-ish'; // para prueba de los datos

function setup() {
  createCanvas(400, 400);

  // Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyCqgvmF8INq98yeKMV1Ygi8gvevHfghcT4",
  //   authDomain: "tf-colorclass.firebaseapp.com",
  //   databaseURL: "https://tf-colorclass.firebaseio.com",
  //   projectId: "tf-colorclass",
  //   storageBucket: "tf-colorclass.appspot.com",
  //   messagingSenderId: "1077142222102"
  // };
  // uso la base de daniel en lugar de la mia

  function mousePressed() {
    let i = floor(mouseX / 10);
    let j = floor(mouseY / 10);
    let index = i + j * (width / 10);
    let data = colorBylabel[label];

    console.log(data[index]);

  }

  var config = {
    apiKey: "AIzaSyDPekCKX4ee6h9NVR2lEITGAM0XIHn-c7c",
    authDomain: "color-classification.firebaseapp.com",
    databaseURL: "https://color-classification.firebaseio.com",
    projectId: "color-classification",
    storageBucket: "",
    messagingSenderId: "590040209608"
  };

  firebase.initializeApp(config);
  database = firebase.database();
  let ref = database.ref('colors');

  ref.once('value', gotData);





  function gotData(results) {
    //console.log(results.val());

    // process data
    // pasar el objeto a un array
    let data = results.val();
    let keys = Object.keys(data);
    //console.log(keys.length);

    for (let key of keys) {
      let record = data[key];
      //let col = color(record.r, record.g, record.b);
      colorBylabel[record.label].push(record);
    }
    //console.log(colorBylabel);

    let x = 0;
    let y = 0;
    let blues = colorBylabel[label];
    noStroke();
    for (let i = 0; i < blues.length; i++) {
      fill(blues[i].r, blues[i].g, blues[i].b);
      rect(x, y, 10, 10);
      x += 10;
      if (x >= width) {
        x = 0;
        y += 10;
      }

    }
    // let uid_bycount ={};
    // let users=[];


    // for ( let key of keys){
    //   let record=data[key];
    //   let id = record.uid;
    //   if (!uid_bycount[id]){
    //     uid_bycount[id]=1;
    //     users.push(id);

    //   }else{
    //     uid_bycount[id]++;

    //   }


    // }
    // users.sort(function (a,b){
    //   return (uid_bycount[a]-uid_bycount[b]);
    // })
    // for ( let id of users){
    //   console.log(`user ${id} submitted ${uid_bycount[id]}`);
    // }

  }
}