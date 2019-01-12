//particles
class Particle {

  constructor() {
    this.x = width / 2;
    this.y = height - 20;
    this.vx = random(-1, 1);
    this.vy = random(-5, -1);
    this.col = random(0,255);
    this.alpha = 255;
  }
  finished() {
    return (this.y <= 0);
    console.log(this.y);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 4;
  }

  show() {
    noStroke();
    fill(this.col);//this.alpha

    ellipse(this.x, this.y, 22);
  }
}