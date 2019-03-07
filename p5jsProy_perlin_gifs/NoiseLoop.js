class NoiseLoop {
  constructor(diameter, min, max) {
    this.diameter = diameter;
    this.min = min;
    this.max = max;
    this.cx=random(1000);// ubicacion de las coordenadas del vertice para tomar los valores de noise func
    this.cy = random(1000);

  }

  value(a) {
    //phase=phase+slider_phase.value();
    // xoff = map(cos(a + phase + slider_phase.value()), -1, 1, 0, noiseMax);
    // yoff = map(sin(a + phase + slider_phase.value()), -1, 1, 0, noiseMax);
    // let r = noise(xoff, yoff);

    // let x = map(xoff, 0, 1, 0, width);
    // let y = map(yoff, 0, 1, 0, height);

    let xoff = map(cos(a), -1, 1, this.cx, this.cx+this.diameter);
    let yoff = map(sin(a), -1, 1, 0+this.cy, this.diameter+this.cy);
    let r = noise(xoff, yoff);
    return map(r, 0, 1, this.min, this.max);

  }
}