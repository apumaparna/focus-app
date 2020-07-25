// Name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, text, mouseX, mouseY, 
          strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, keyIsPressed, textStyle, 
          NORMAL, BOLD, round*/


let backgroundColor, score, time, gameIsOver;
let mouseEllipse, ball1, ball2, ball3, balls = [];

const CIRCLE_SIZE = 20,
  canvasWidth = 400,
  canvasLength = 400;

function setup() {
  createCanvas(canvasWidth, canvasLength);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;

  for (var i = 0; i < 4; i++) {
    balls.push(new Ball());
  }

  // gameIsOver = false;
  score = 0;
  noStroke();
}
function draw() {
  background(backgroundColor);
  // Add code here

  fill(290, 80, 100);
  mouseEllipse = ellipse(mouseX, mouseY, 20);
  
  balls.forEach(function(ball) {
    ball.draw(); 
    ball.move();
    ball.collide(); 
  })
  
  fill(0);
  text(`Time remaining: ${time}`, 20, 40);
  text(`Score: ${score}`, 20, 60);

}

class Ball {
  constructor() {
    this.coinX = random(width);
    this.coinY = random(height);
    this.radius = CIRCLE_SIZE;

    this.worth = round(random(1, 10));

    this.xVel = this.worth;
    this.yVel = this.worth;

    this.color = random(360);
  }

  draw() {
    fill(this.color, 80, 80);
    ellipse(this.coinX, this.coinY, this.radius);
    fill(0); 
    text(this.worth, this.coinX - 4, this.coinY + 3);
  }

  move() {
    if (gameIsOver) {
      return;
    }
    this.coinX += this.xVel;
    this.coinY += this.yVel;

    if (this.coinX > canvasWidth || this.coinX < 0) {
      this.xVel = -this.xVel;
    }

    if (this.coinY > canvasLength || this.coinY < 0) {
      this.yVel = -this.yVel;
    }
  }

  collide() {
    if (gameIsOver) {
      return;
    }
    this.hit = collideCircleCircle(
      mouseX,
      mouseY,
      CIRCLE_SIZE,
      this.coinX,
      this.coinY,
      CIRCLE_SIZE
    );
    if (this.hit) {
      score += 1;
      this.coinX = random(width);
      this.coinY = random(height);
    }
  }
}
