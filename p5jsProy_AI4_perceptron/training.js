//t

function pixelX(x) {
  return map(x, -1, 1, 0, width);
}

function pixelY(y) {
  return map(y, -1, 1, height, 0);
}



function show() {
  if (this.label == 1) {
    fill(255, 0, 0);
  } else {
    fill(0, 255, 0);
  }
  let px=pixelX();
  let py=pixelY();
  ellipse(px,py,32,32);
}