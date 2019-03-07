// Fluid Simulation
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/132-fluid-simulation.html
// https://youtu.be/alhpH6ECFvQ

// This would not be possible without:
// Real-Time Fluid Dynamics for Games by Jos Stam
// http://www.dgp.toronto.edu/people/stam/reality/Research/pdf/GDC03.pdf
// Fluid Simulation for Dummies by Mike Ash
// https://mikeash.com/pyblog/fluid-simulation-for-dummies.html
// modified for p5JS by GNK 
// still wotking to find bugs, as it has different pattern than the processing version

let N = 64;
let SCALE = 10;
let iter = 4;
class Fluid {
 
  constructor(dt, diff, visc) {

    let Vx = new Array(N*N).fill(0);
    let Vy = new Array(N * N).fill(0);
    let Vx0 = new Array(N * N).fill(0);
    let Vy0 = new Array(N * N).fill(0);
  
    this.size = N;
    this.dt = dt;
    this.diff = diff;
    this.visc = visc;

    this.s = new Array(N * N).fill(0);

    this.density = new Array(N * N).fill(5);

    this.Vx = new Array(N * N).fill(0);
    this.Vy = new Array(N * N).fill(0);
    this.Vx0 = new Array(N * N).fill(0);
    this.Vy0 = new Array(N * N).fill(0);

  }

  step() {

    let N = this.size;
    let visc = this.visc;
    let diff = this.diff;
    let dt = this.dt;
    let density = this.density;
     let Vx = this.Vx;
     let Vy = this.Vy;
     let Vx0 = this.Vx0;
     let Vy0 = this.Vy0;
     let s = this.s;
     
// difusse the velocity
    diffuse(1, Vx0, Vx, visc, dt);
    diffuse(2, Vy0, Vy, visc, dt);

    project(Vx0, Vy0, Vx, Vy);

    advect(1, Vx, Vx0, Vx0, Vy0, dt);
    advect(2, Vy, Vy0, Vx0, Vy0, dt);

    project(Vx, Vy, Vx0, Vy0);
// difusse the density
    diffuse(0, s, density, diff, dt);
    advect(0, density, s, Vx, Vy, dt);
  }

  addDensity(x, y, amount) {
    let index = IX(x, y);
    this.density[index] += amount;
  }

  addVelocity(x, y, amountX, amountY) {
    let index = IX(x, y);
    this.Vx[index] += amountX;
    this.Vy[index] += amountY;
  }


  renderD() {
    colorMode(HSB,255, 255,255,255);
    
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        let x = i * SCALE;
        let y = j * SCALE;
        let d = this.density[IX(i, j)];
        //console.log(d);
        fill(33, 200, (d + 22) % 255);
        noStroke();
        rect(x, y, SCALE, SCALE);

      }
    }
  }

renderV() {
   for (let i = 0; i < N; i++) {
     for (let j = 0; j < N; j++) {
       let x = i * SCALE;
       let y = j * SCALE;
       let vx = this.Vx[IX(i, j)];
       let vy = this.Vy[IX(i, j)];
       stroke(255);
       if (!(abs(vx) < 0.1 && abs(vy) <= 0.1)) {
         line(x, y, x + vx * SCALE, y + vy * SCALE);
       }
     }
   }
 }

 fadeD(){
   for (let i=0;i<this.density.length;i++){
     let d= this.density[i];
     this.density[i]=constrain(d-0.1,0,255);
   }
 }

}
