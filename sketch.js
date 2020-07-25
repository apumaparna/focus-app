// Name any p5.js functions we use in the global so Glitch can recognize them.    *
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, 
          color, random, rect, ellipse, stroke, image, loadImage, keyCode,
          collideCircleCircle, text, textSize, mouseX, mouseY, strokeWeight, line, 
          mouseIsPressed, windowWidth, windowHeight, noStroke, UP_ARROW, DOWN_ARROW 
          LEFT_ARROW, RIGHT_ARROW, backgroundColor, round textAlign CENTER LEFT floor \
          loadFont textFont createButton mouseIsPressed break myDraw textStyle BOLD
          keyIsPressed noFill*/

let duration, pomTimes, backgroundColor, timeX, timeY;
let score;
let mouseEllipse,
  ball1,
  ball2,
  ball3,
  balls = [];
let level, exp, health, expCap;

let timerOver = false,
  timerOn = false,
  timerPaused = false,
  gamePage = false,
  gameIsOver = false,
  waiting = false;

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
  startTimerButton.mousePressed(false); 
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
  score = 0;
  noStroke();

  // over-arching game setup
  level = 0;
  exp = 0;
  health = 50;
  expCap = 100;

  pageOne();
}

function draw() {
  background(backgroundColor);
  // pauseTimer();

  pageOne();
  countdown();
  waitingRoom();
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
      waiting = true;
      duration = 1 * 5 * 100;
      //backgroundColor = color(270, 5, 16);
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
  console.log("mouse is pressed")
  
  if (startTimerButton.mousePressed(true)) {
    console.log("button is pressed")
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
    backgroundColor = color(19, 89, 100);
    startTimerButton.hide();
    // stopTimerButton.show();

    // Status
    fill(19, 100, 69);
    rect(15, 15, width - 30, 110, 15);
    status(); 

    // Timer
    fill(174, 100, 100);
    textFont(timerFont);
    textSize(100);
    textAlign(CENTER);

    timeX = width / 2;
    timeY = height / 2 + 50;

    setInterval(timer(), 1000);
    health += duration/(25*60*10); 
  }
}

//this function shows the status
function status() {
  // formatting
  fill(100);
  textSize(18);
  strokeWeight(1);

  // level
  textAlign(LEFT);
  text(`level: ${level}`, 30, 40);

  // textAlign(RIGHT);
  // text(`level: ${level}`, width - 30, 40);
  
  // adjustments 
  if (exp >= expCap) {
    level++; 
    exp = 0; 
    expCap += 50; 
  }
  if (health >= 50) {
    health = 50
  }

  // EXP
  stroke(44, 96, 100);
  noFill();
  rect(85, 50, width / 2, 20);
  noStroke();
  fill(100);
  text("EXP", 30, 65);
  text(expCap, width / 2 + 95, 65);
  fill(44, 96, 100);
  rect(85, 50, ((exp / expCap) * width) / 2, 20);
  fill(100);
  textAlign(CENTER);
  text(round(exp), ((exp / expCap) * width) / 2 / 2 + 80, 65);

  // Health
  stroke(176, 100, 81);
  noFill();
  rect(85, 80, width / 2, 20);
  noStroke();
  fill(100);
  textAlign(LEFT);
  text("health", 30, 95);
  text(50, width / 2 + 95, 95);
  fill(176, 100, 81);
  rect(85, 80, ((health / 50) * width) / 2, 20);
  fill(100);
  textAlign(CENTER);
  text(round(health), ((health / 50) * width) / 2 / 2 + 80, 95);
  
  
  
}

// This function outlines the starting page of the program
function pageOne() {
  if (timerOn == false && gamePage == false && waiting == false) {
    console.log("pag1");
    backgroundColor = color(270, 5, 16);
    duration = 1 * 5 * 100;

    // Status
    stroke(18, 89, 100);
    strokeWeight(3);
    fill(backgroundColor);
    rect(15, 15, width - 30, 110, 15);
    noStroke();
    status();

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

// This function sets up the waiting room between the work room and the playground
function waitingRoom() {
  if (waiting == true && gamePage == false) {
    // formatting
    backgroundColor = color(176, 100, 81);
    textSize(50);
    textAlign(CENTER);
    fill(270, 5, 16);
    text("press any key \n to start playing!", width / 2, height / 2);

    //navigating
    if (keyIsPressed) {
      gamePage = true;
      waiting = false;
    }
  }
}

// This function plays the game
function runGame() {
  if (gamePage == true && waiting == false) {
    console.log("gamemode");
    //formatting
    backgroundColor = color(270, 5, 16);
    stopTimerButton.hide();
    startTimerButton.hide();

    // set up
    timeX = 20;
    timeY = 70;
    timerOver = false;
    textSize(30);
    textAlign(LEFT);
    fill(44, 96, 100);
    setInterval(timer(), 1000);

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
    textSize(14);
    text("Time remaining:", 20, 40);
    text(`Score: ${score}`, 20, 100);
    
    // Big Game

    if (duration <= 0) {
      gamePage = false;
      timerOn = false;
      exp += score*10; 
      health -= round(score*3/2);
      score = 0; 
    }
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
    textSize(12);
    fill(100);
    text(this.worth, this.coinX - 4, this.coinY + 3);
  }

  move() {
    if (!gamePage) {
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
    if (!gamePage) {
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
