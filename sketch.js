// Name any p5.js functions we use in the global so Glitch can recognize them.    *
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, 
          color, random, rect, ellipse, stroke, image, loadImage, keyCode,
          collideCircleCircle, text, textSize, mouseX, mouseY, strokeWeight, line, 
          mouseIsPressed, windowWidth, windowHeight, noStroke, UP_ARROW, DOWN_ARROW 
          LEFT_ARROW, RIGHT_ARROW, backgroundColor, round textAlign CENTER LEFT floor \
          loadFont textFont createButton mouseIsPressed break myDraw*/

let duration, pomTimes, backgroundColor, timeX, timeY;
let score, time, gameIsOver;
let mouseEllipse,
  ball1,
  ball2,
  ball3,
  balls = [];

let timerOver = false,
  timerOn = false,
  timerPaused = false,
  gamePage = false;

let timerFont;
let startTimerButton, stopTimerButton;

const CIRCLE_SIZE = 20,
  canvasWidth = 400,
  canvasLength = 400;

function preload() {
  timerFont = loadFont(
    "https://cdn.glitch.com/7c73080a-fa15-436b-b267-4281d9383dfb%2FSourceSansPro-Light.ttf?v=1595655935353"
  );
}

function setup() {
  // Original set up
  createCanvas(canvasWidth, canvasLength);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  //other things
  backgroundColor = 95;
  duration = 25 * 60 * 100;

  timerPaused = false;

  // startTimer setup
  startTimerButton = createButton("  start  ");
  startTimerButton.position(width / 2 - 20, 300);
  startTimerButton.style("background-color", color(177, 83, 27));
  startTimerButton.style("border-color", color(176, 100, 81));
  startTimerButton.style("color", color(176, 100, 81));

  // Stop timer setup
  stopTimerButton = createButton("  stop  ");
  stopTimerButton.position(width / 2 - 20, 330);
  stopTimerButton.style("background-color", color(270, 5, 16));
  stopTimerButton.style("border-color", color(44, 96, 100));
  stopTimerButton.style("color", color(44, 96, 100));
  stopTimerButton.hide();

  //game 1 setup
  for (var i = 0; i < 4; i++) {
    balls.push(new Ball());
  }
  gameIsOver = false;
  score = 0;
  noStroke();

  pageOne();
}

function draw() {
  background(backgroundColor);
  // pauseTimer();
  
    pageOne();
    countdown();
    runGame();

  // Starter page
  // setInterval(timer(), 10);
  // countdown();
}

function timer() {
  if (timerOver == false) {
    let minutes = floor(duration / (60 * 100));
    let seconds = floor((duration % (60 * 100)) / 100);
    // floor(duration % (60*1000)/1000);

    if (minutes < 10) {
      if (seconds < 10) {
        text(`0${minutes}:0${seconds}`, timeX, timeY);
      } else {
        text(`0${minutes}:${seconds}`, timeX, timeY);
      }
    } else {
      if (seconds < 10) {
        text(`${minutes}:0${seconds}`, timeX, timeY);
      } else {
        text(`${minutes}:${seconds}`, timeX, timeY);
      }
    }

    if (duration <= 0) {
      timerOver = true;
      timerOn = false;
      gamePage = true;
      backgroundColor = color(270, 5, 16);
    } else {
      duration--;
    }
  }
}

function pauseTimer() {
  if (timerPaused == true) {
    console.log(" pressed");
    backgroundColor = color(100, 100, 69);
    timerOver = false;
    stopTimerButton.hide();
    startTimerButton.show();
  }
}

function mousePressed() {
  if (startTimerButton.mousePressed()) {
    timerOn = true;
    timerOver = false;
    timerPaused = false;
  } else if (stopTimerButton.mouseClicked()) {
    timerPaused = true;
    // backgroundColor = color(100, 100, 69);
    timerOver = false;
    timerOn = false;
    stopTimerButton.hide();
    startTimerButton.show();
  }
}

// Studying timer!
function countdown() {
  if (timerOn == true && gamePage == false) {
    console.log("countdown");

    // formatting
    backgroundColor = color(19, 100, 69);
    startTimerButton.hide();
    // stopTimerButton.show();

    // Status
    fill(18, 89, 100);
    rect(15, 15, width - 30, 100, 15);

    // Timer
    fill(174, 100, 100);
    textFont(timerFont);
    textSize(100);
    textAlign(CENTER);

    timeX = width / 2;
    timeY = height / 2 + 50;

    setInterval(timer(), 1000);
  }
}

// This function outlines the starting page of the program
function pageOne() {
  if (timerOn == false && gamePage == false) {
    console.log("pressed");
    backgroundColor = color(270, 5, 16);
    duration = 1 * 10 * 100;

    // Status
    fill(18, 89, 100);
    rect(15, 15, width - 30, 100, 15);

    // Time
    fill(174, 100, 100);
    textFont(timerFont);
    textSize(100);
    textAlign(CENTER);
    text("25:00", width / 2, height / 2 + 50);

    // Start Button
    stopTimerButton.hide();
    startTimerButton.show();
    // if (mouseIsPressed && startTimerButton.mousePressed()) {
    //   console.log(" pressed");
    //   timerOn = true;
    //   timerOver = false;
    // }
  }
}

// This function sets up the screen to run the game
function runGame() {
  if (gamePage == true) {
    //formatting
    backgroundColor = color(270, 5, 16);
    stopTimerButton.hide();
    startTimerButton.hide();
    textSize(12);
    textAlign(LEFT);
    
    // set up 
    duration = 5 * 60 * 100;
    
    fill(290, 80, 100);
    mouseEllipse = ellipse(mouseX, mouseY, 20);
    
  
    //Game functions
    balls.forEach(function(ball) {
      ball.draw();
      ball.move();
      ball.collide();
    });
    
    // Display
    fill(100);
    text(`Time remaining: ${time}`, 20, 40);
    text(`Score: ${score}`, 20, 60);

  }
}

// BREAK
// Classes go below this line
class Ball {
  constructor() {
    this.coinX = random(width);
    this.coinY = random(height);
    this.radius = CIRCLE_SIZE;

    this.worth = round(random(2, 10));

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
