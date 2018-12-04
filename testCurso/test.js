// bouncing ball and dots

function setup() {
  createCanvas(400, 400);
}

var n = 0;
var step = 1;
var vely = 3;
var velx = -4;

var g = 0.4; // gravity
var circle = {
  xc: 0,
  yc: 0,
  radio: 50
};

var ball = {
  xc: 20,
  yc: 20,
  radio: 10,
  xdir: 1,
  ydir: 1,
  step: 4,
  elastic: 0.2,
}

//  note: radio must be < step for proper rebound detection
function draw() {
  noStroke();
  background(0, 0, 0, 8);
  circle.xc = random(2, 400);
  circle.yc = random(2, 400);
  circle.radio = 50 * sin(2 * PI * n / 128);

  // color confined to specific X area on x coordinate
  if ((circle.xc) < 100) {
    fill(200, 222, 222, 20)
  } else {
    fill(circle.xc, circle.yc, 200 - circle.xc, circle.yc);
  }
  ellipse(circle.xc, circle.yc, 50 + circle.radio);
  n = n + 1;

  // bouncing on left right walls
  move();
  bounce();

  ellipse(ball.xc, ball.yc, ball.radio);

}

function mousePressed() {
  vely = random(-20, 20);
  velx = 3;
  ball.xc = 30;
  ball.yc = 50;
}

function bounce() {
  if (ball.xc >= (width - ball.radio) || ball.xc <= ball.radio) {
    ball.xdir = -ball.xdir;
    vely = ball.elastic * vely + random(-0.5, 0.5);
  }


  // bouncing on top bottom walls
  if (ball.yc >= (height - ball.radio) || (ball.yc <= ball.radio)) {
    ball.ydir = -ball.ydir
    ball.xdir = ball.elastic * velx + random(-0.5, 0.5);

  }
}

function move() {
  vely = vely + g * ball.ydir;
  velx = ball.step * ball.xdir
  ball.xc = ball.xc + velx;

  // ball.yc=ball.yc+ball.step*ball.ydir; // sin gravedad

  ball.yc = ball.yc + ball.ydir * vely;

}