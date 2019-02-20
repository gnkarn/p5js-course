// prepapararlo para que sea de grado variable
// como hacer un tensor , que se arme a si mismo? segun el degree definido para la funcion ?
// NO ESTA TERMINADO
// hay que implementar la multiplicacion del tensor de
// coeficientes x x^n, de acuerdo a dimension.
// como definir un tensor solo por su shape, es un buffer?
// el calculo esta errado  al elevar los x^i
let x_vals = [];
let y_vals = [];
tf.disableDeprecationWarnings();
let degree = 4;
let a ;


// arma el optimizer
const learningRate = 0.5;
const optimizer = tf.train.adam(learningRate);

function setup() {
  createCanvas(400, 400);
  background(0);
  const buffer = tf.buffer([1, degree]);
  for (let i = 0; i < degree; i++) {
    buffer.set(random(-1, 1), 0, i);

  }
  a = tf.variable(buffer.toTensor());
  console.log("initial values for coef");
  a.print();
}

function loss(pred, labels) {
  return pred.sub(labels).square().mean(); // (pred-label)^2
}

function predict(x) {
  console.log("predict xs=");
  const xs = tf.tensor1d(x);
  xs.print();
  let ys_bf = tf.buffer([1, degree]);
  let ex_bf = tf.buffer([1, degree]); // to hold x^exponents

  for (let i = 0; i < degree; i++) {
    ex_bf.set(i, 0, i);//a tensor with exponents , to apply pow

  }
  console.log("ex_bf " + ex_bf.toTensor());
  xs.print();
  // compute for every x , a vector with x^0,x^1,X^2,X^3 .....x^degree
  // esta mal calculado , quiero calcularlo como una matriz SIN usar loop

  ys_bf = xs.pow(ex_bf.toTensor()); // intermediat xs^n to apply dot product with coef

  const ys = tf.matMul(a, ys_bf, 0, 1);// sum( x^i * a(i))
  ys.print();
  console.log("a");
  a.print();
  return ys;
}

function mousePressed() {
  let x = map(mouseX, 0, width, -1, 1);
  let y = map(mouseY, 0, height, 1, -1);
  x_vals.push(x);
  y_vals.push(y);
}

function draw() {
  background(44);
  tf.tidy(() => {
    console.log("#xvals " + x_vals.length);

    if (x_vals.length > 0) {
      const ys = tf.tensor1d(y_vals);
      optimizer.minimize(() => loss(predict(x_vals), ys));
    }
  })

  stroke(255);
  strokeWeight(4)
  for (let i = 0; i < x_vals.length; i++) {
    let px = map(x_vals[i], -1, 1, 0, width);
    let py = map(y_vals[i], -1, 1, height, 0);

    point(px, py);
  }

  // muestra la linea ajustada
  tf.tidy(() => {
    const curveX = [];
    for (let x = -1; x < 1.1; x += .05) {
      curveX.push(x);

    }

    if (x_vals.length > 0) {
      const ys = predict(curveX);
      let curveY = ys.arraySync(); // paso el tensor a un array

      beginShape();
      noFill();
      stroke(255);
      strokeWeight(4);
      for (let i = 0; i < curveX.length; i++) {
        let y = map(curveY[i], -1, 1, height, 0);
        let x = map(curveX[i], -1, 1, 0, width);
        vertex(x, y);

      }
      endShape();
    }

  });
  //	ys.dispose(); // limpiando memoria
  stroke(100);
  strokeWeight(1);
  line(0, height / 2, width, height / 2);
  line(width / 2, 0, width / 2, height);

  textStyle(NORMAL);
  strokeWeight(1);
  // pasar los tensores a numeros
  // let aa = a[0].dataSync();

  // text("a " + nf(a1, 1, 2) + " b " + nf(a2, 1, 2) + " c " + nf(a3, 1, 2) + " d " + nf(a4, 1, 2), 150, 50);
  // text("tensors " + tf.memory().numTensors, 200, height - 50);
}