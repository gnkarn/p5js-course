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
    //console.table(result.data);
    return result;


  }

  multiply(n) {
    if (n instanceof Matrix) { // es una matriz?
      // hadamard mult
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] *= n.data[i][j];
        }
      }
    } else {
      //scalar product
      for (let i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] *= n;

        }
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

  static substract(a, b) {
    // return a new matrix a-b
    let result = new Matrix(a.rows, a.cols)
    for (var i = 0; i < a.rows; i++) {
      for (var j = 0; j < a.cols; j++) {
        result.data[i][j] = a.data[i][j] - b.data[i][j];
      }
    }
    return result;
  }

  randomize(n) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.data[i][j] = Math.random()*2-1;
      }
    }
  }

  static transpose(matrix) {
    let result = new Matrix(matrix.cols, matrix.rows);
    for (var i = 0; i < matrix.rows; i++) {
      for (var j = 0; j < matrix.cols; j++) {
        result.data[j][i] = matrix.data[i][j];
      }
    }
    return result;
  }

  print() {
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

  static map(matrix, func) {
    // apply fn to every element of the matrix
    let result = new Matrix(matrix.rows, matrix.cols);
    for (var i = 0; i < matrix.rows; i++) {
      for (var j = 0; j < matrix.cols; j++) {
        result.data[i][j] = func(matrix.data[i][j]);

      }
    }
    return result;
  }


  // transforma un array en una matriz de una columna
  static fromArray(arr) {
    let m = new Matrix(arr.length, 1);
    for (let i = 0; i < arr.length; i++) {
      m.data[i][0] = arr[i];
    }
    return m;
  }

  toArray() {
    let arr = [];
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        arr.push(this.data[i][j]);

      }
    }
    return arr;
  }
}