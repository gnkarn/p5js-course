// color classifier , usando json file
// funciona muy bien !

let data;
tf.disableDeprecationWarnings();
let xs, ys;
let lossP;
let rslider, gslider, bslider;

let labelP;
let tensorsP;


let labelList = [
  'red-ish',
  'green-ish',
  'blue-ish',
  'orange-ish',
  'yellow-ish',
  'pink-ish',
  'purple-ish',
  'brown-ish',
  'grey-ish'

]

function preload() {
  data = loadJSON('colorData.json');

}

function setup() {
  lossP = createP('loss');
  labelP = createP('color: ');
  tensorsP= createP('tensors:');

  rslider = createSlider(0, 255, 0, 1);
  gslider = createSlider(0, 255, 0, 1);
  bslider = createSlider(0, 255, 0, 1);

  let colors = [];
  let labels = [];

  for (let record of data.entries) {
    let col = [record.r / 255, record.g / 255, record.b / 255];
    colors.push(col);
    labels.push(labelList.indexOf(record.label)); // segun el label lo ubica en el array
  }
  //console.log(colors);


  xs = tf.tensor2d(colors);
  console.log(xs.shape);
  console.log(labels);
  let labelTensor = tf.tensor1d(labels, 'int32');
  labelTensor.print();

  ys = tf.oneHot(labelTensor, 9, 1, 0);
  labelTensor.dispose();

  xs.print();
  console.log(xs.shape);
  ys.print();
  console.log(ys.shape);

  model = tf.sequential();

  // layers
  let hidden = tf.layers.dense({
    units: 16,
    activation: 'sigmoid',
    inputDim: 3

  });
  let output = tf.layers.dense({
    units: 9,
    activation: 'softmax',

  });
  model.add(hidden);
  model.add(output);
  // create optimizer
  const lr = .2;
  const optimizer = tf.train.sgd(lr);
  // compile
  model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy'
  })

  // train -- fit, deberia usar solo el 80% de los datos

  train().then(results => {
    console.log(results.history.loss);

  });

}
//  lo hace asi para que sea syncrono, y no bloquee el loop de draw
async function train() {
  let options = {
    epochs: 10,
    validationSplit: 0.1, // saca 10% para validar el modelo
    shuffle: true,
    callbacks: {
      onTrainBegin: () => console.log('training start'),
      onTrainEnd: () => console.log('training complete'),
      onEpochEnd: (num, logs) => {
        console.log(logs);
        lossP.html(' val_loss: ' + nf(logs.val_loss, 1, 2));
      },
      onBatchEnd: tf.nextFrame,
    }
  }
  return await model.fit(xs, ys, options);
}

function draw() {
  let r = rslider.value();
  let g = gslider.value();
  let b = bslider.value();
  background(r, g, b);
  stroke(255);
  strokeWeight(4);

  tf.tidy(() => {
    const xs = tf.tensor2d([
      [r / 255, g / 255, b / 255]
    ]);
    let results = model.predict(xs);
    //results.print();
    let index = results.argMax(1).dataSync();
    // index.print();
    let label = labelList[index];
    labelP.html('color :' + label);
  })
  tensorsP.html('tensors :' + tf.memory().numTensors);
//console.log(tf.memory().numTensors);

}