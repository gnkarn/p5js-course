function Spot(i, j) {
  //location
  this.i = i;
  this.j = j;
  // cost values for A* 
  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.neighbors = [];
  this.previous = undefined; // where i came from

  // hay pared?
  this.wall = false;
  if (random(1) < 0.4) {
    this.wall = true;
  }

  this.show = function (col) {
    fill(col);
    stroke(0);
    if (this.wall) {
      fill(0);
      noStroke();

      ellipse(this.x * w + w / 2, this.y * h + h / 2, 10);
    } else if (col) {
      rect(this.i * w - 1, this.j * h - 1, w, h);
    }
  }


  this.addNeighbors = function (grid) {
    let i = this.i;
    let j = this.j;
    // antes de agregarlo veo si no estoy en un borde de la grilla
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
    if (i < cols - 1 && j<rows-1) {
      this.neighbors.push(grid[i + 1][j+1]);
    }
    if (i > 0 && j>0) {
      this.neighbors.push(grid[i - 1][j-1]);
    }
    if (j < rows - 1 && i>0) {
      this.neighbors.push(grid[i-1][j + 1]);
    }
    if (j > cols-1 && j>0) {
      this.neighbors.push(grid[i+1][j - 1]);
    }
    
  }
}