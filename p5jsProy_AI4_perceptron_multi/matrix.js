//matrix
class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = [];
    for (var i = 0; i < this.rows; i++) {
      this.data[i] = [];
      for (var j = 0; j < this.cols; j++) {
        this.data[i][j] = 0;
      }
    }
  }

  static multiply(a, b) {
    // matrix product
    if (a.cols !== b.rows) {
      console.log("cols A tiene que ser iguales a rows B");
      return undefined;
    }
    let result = new Matrix(a.rows, b.cols);
 
    for (var i = 0; i < a.rows; i++) {

      for (var j = 0; j < b.cols; j++) {
        //dot product
        let sum = 0;
        for (let k = 0; k < a.cols; k++) {
          sum += a.data[i][k] * b.data[k][j];
        }
        result.data[i][j] = sum;
      }
    }
    console.table(result.data);
    return result;


  }

  multiply(n) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.data[i][j] *= n;

      }
    }
  }

  add(n) {
    if (n instanceof Matrix) { // es una matriz?
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] += n.data[i][j];
        }
      }
    } else { // n es un escalar
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] += n;
        }
      }
    }
  }

  randomize(n) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.data[i][j] = Math.floor(Math.random() * n);
      }
    }
  }

  transpose() {
    let result = new Matrix(this.cols, this.rows);
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        result.data[j][i] = this.data[i][j];
      }
    }
    return result;
  }

  print(){
    console.table(this.data);
  }

  map(func) {
    // apply fn to every element of the matrix
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.data[i][j] = func(this.data[i][j]);

      }
    }
  }
}