class Particle {
  constructor() {

    this.xNoise = new NoiseLoop(1,0, width);
    this.yNoise = new NoiseLoop(1,0, height);
    this.dNoise = new NoiseLoop(2, 10, 100);
    this.rNoise = new NoiseLoop(5, 0, 255);
    this.gNoise = new NoiseLoop(5, 0, 255);
    this.bNoise = new NoiseLoop(5, 0, 255);

  }

  render(a) {
    noStroke();

    let x = this.xNoise.value(a);
    let y = this.yNoise.value(a);
    let r = this.rNoise.value(a);
    let g = this.gNoise.value(a);
    let b = this.bNoise.value(a);
    fill(r, g, b,100);
    ellipse(x, y, this.dNoise.value(a));
  }
}