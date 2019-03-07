//
class Perceptron {
// Perceptron is created with n weights and learning constant
  constructor(n,c) {
    this.weights = new Array (n);
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = random(-1, 1);
    }

    // this.inputs = [i0, i1];
    this.c = c; // learning rate/constant
  }
  //activation
  activate(sum) {
    if (sum>0){
      return 1;
    } else {
      return - 1;
    }    
  }

  feedforward(inputs) {
    let sum = 0;
    //console.log(inputs);
    for (let i = 0; i < this.weights.length; i++) {
      sum += this.weights[i] * inputs[i];
    }
    //console.log(sum);
    return this.activate(sum);
  }

  train(inputs,target){
    let guess=this.feedforward(inputs);
    // Compute the factor for changing the weight based on the error
    // Error = desired output - guessed output
    // Note this can only be 0, -2, or 2
    // Multiply by learning constant

    var error = target-guess;
    // tune all weights w0=w0+delta W
    for (let i=0;i<this.weights.length;i++){
      this.weights[i] = this.weights[i]+ error * inputs[i] * this.c;
    }
  }
 getWeights(){
   return this.weights;
 }
}