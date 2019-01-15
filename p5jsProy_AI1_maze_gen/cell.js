function Cell(i, j) {
  this.i = i; //coordenadas de posicion de celda
  this.j = j;
  this.walls = [true, true, true, true]; // top. right. bottom , left
  this.visited = false;


  this.checkNeighbors = function () {
    var neighbors = [];
   
    var gtop = grid[index(i, j - 1)];
    var gright = grid[index(i + 1, j)];
    var gbottom = grid[index(i, j + 1)];
    var gleft = grid[index(i - 1, j)];

    if (gtop && !gtop.visited) { // si no es edge y no fue visitado
      neighbors.push(gtop);
    }
    if (gright && !gright.visited) {
      neighbors.push(gright);
    }
    if (gbottom && !gbottom.visited) {
      neighbors.push(gbottom);
    }
    if (gleft && !gleft.visited) {
      neighbors.push(gleft);
    }
    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      console.log(r);
      order++;
      return neighbors[r];
    } else {
      return undefined;
    }
  }

  this.highlight = function () {
    noStroke();
    fill(255, 0, 0, 100);
    rect(this.i * w, this.j * w, w, w);
    //console.log( i,j);
  }

  // mostrar las paredes de cada celda que esten activas
  this.show = function () {
    let x = this.i * w;
    let y = this.j * w;
    //fill(200, 50);
    stroke(255);
    // draw cell walls
    if (this.walls[0]) {
      line(x, y, x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.walls[3]) {
      line(x, y + w, x, y);
    }
    if (this.visited) {
      noStroke();
      fill(0, 255, 0, 100);
      rect(x, y, w, w);
    }
    //
  }
}