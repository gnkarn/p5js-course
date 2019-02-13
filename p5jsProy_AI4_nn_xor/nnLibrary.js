//neural library
// escrito como ES6
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}
// derivada
function dsigmoid(y) {
  //return sigmoid(x)*(1-sigmoid(x));
  return y * (1 - y);
}


class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes) {
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;

    this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
    this.weights_ih.randomize(10) * 2 - 1;
    this.weights_ho.randomize(10) * 2 - 1;
    this.bias_h = new Matrix(this.hidden_nodes, 1);
    this.bias_o = new Matrix(this.output_nodes, 1);
    this.bias_h.randomize(10);
    this.bias_o.randomize(10);
    this.learning_rate = 0.1;
  }
  feedforward(input_array) {
    // generating hidden outputs
    let inputs = Matrix.fromArray(input_array);
    //print(inputs);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    //hidden.print();
    hidden.add(this.bias_h);
    //activate
    hidden.map(sigmoid); // aplica la funcion a cada elemento de h
    //output layer calcs
    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(sigmoid);

    return output.toArray();
  }

  train(input_array, targets_array) {
    // generating hidden outputs
    let inputs = Matrix.fromArray(input_array);
    //print(inputs);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    //hidden.print();
    hidden.add(this.bias_h);
    //activate
    hidden.map(sigmoid); // aplica la funcion a cada elemento de h
    //output layer calcs
    let outputs = Matrix.multiply(this.weights_ho, hidden);
    outputs.add(this.bias_o);
    outputs.map(sigmoid);


    let targets = Matrix.fromArray(targets_array);

    // calc error tagets-outputs
    let output_errors = Matrix.substract(targets, outputs);
    // calcula gradient out*(1 - out)
    let gradients = Matrix.map(outputs, dsigmoid);
    gradients.multiply(output_errors);
    gradients.multiply(this.learning_rate);


    // calculate deltas
    let hidden_t = Matrix.transpose(hidden);
    let weight_ho_deltas = Matrix.multiply(gradients, hidden_t);
    // adjust weight by deltas 
    this.weights_ho.add(weight_ho_deltas);
    // adjust bias by its deltas which is the gradient
    this.bias_o.add(gradients);

    // errors_hidden layer= Weights_ho x Errors_o
    let who_t = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(who_t, output_errors);
    // calc hidden gradient
    let hidden_gradient = Matrix.map(hidden, dsigmoid);
    hidden_gradient.multiply(hidden_errors);
    hidden_gradient.multiply(this.learning_rate);
    // calc input to hidden deltas
    let input_t = Matrix.transpose(inputs);
    let weight_ih_deltas = Matrix.multiply(hidden_gradient, input_t);
    
    this.weights_ih.add(weight_ih_deltas);
    // adjust bias by its deltas which is the gradient
    this.bias_h.add(hidden_gradient);
    // outputs.print();
    // targets.print();
    // error.print();


  }
}