class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  update() {
    this.x += random(-10, 10);
    this.y += random(-10, 10);
    constrain(this.x, 0, width);
    constrain(this.y, 0, height);
  }

  show() {
    noStroke;
    var col = video.get(this.x / vscale, this.y / vscale);
    fill(col, slider.value());

    ellipse(this.x, this.y, 16, 16);

  }
}
lerp