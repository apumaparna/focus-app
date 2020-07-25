// Name any p5.js functions we use in the global so Glitch can recognize them.    *
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, 
          color, random, rect, ellipse, stroke, image, loadImage, keyCode,
          collideRectCircle, text, textSize, mouseX, mouseY, strokeWeight, line, 
          mouseIsPressed, windowWidth, windowHeight, noStroke, UP_ARROW, DOWN_ARROW 
          LEFT_ARROW, RIGHT_ARROW, backgroundColor, round textAlign CENTER floor loadFont
          textFont createButton mouseIsPressed*/

let duration, pomTimes, backgroundColor;
let timerOver = false,
  timerOn = false;
let timerFont;
let startTimerButton;

function preload() {
  timerFont = loadFont(
    "https://cdn.glitch.com/7c73080a-fa15-436b-b267-4281d9383dfb%2FSourceSansPro-Light.ttf?v=1595655935353"
  );
}

function setup() {
  // Original set up
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  //other things
  backgroundColor = 95;
  duration = 25 * 60 * 100;

  startTimerButton = createButton("  start  ");
  startTimerButton.position(width / 2 - 20, 300);
  startTimerButton.style("background-color", color(177, 83, 27));
  startTimerButton.style("border-color", color(176, 100, 81));
  startTimerButton.style("color", color(176, 100, 81));
}

function draw() {
  background(backgroundColor);
  pageOne();
  countdown();

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
        text(`0${minutes}:0${seconds}`, width / 2, height / 2 + 50);
      } else {
        text(`0${minutes}:${seconds}`, width / 2, height / 2 + 50);
      }
    } else {
      if (seconds < 10) {
        text(`${minutes}:0${seconds}`, width / 2, height / 2 + 50);
      } else {
        text(`${minutes}:${seconds}`, width / 2, height / 2 + 50);
      }
    }

    if (duration <= 0) {
      timerOver == true;
    } else {
      duration--;
    }
  }
}

function countdown() {
  if (timerOn == true) {
  console.log("countdown");

  // formatting
  backgroundColor = color(19, 100, 69);
  startTimerButton.hide();

  // Status
  fill(18, 89, 100);
  rect(15, 15, width - 30, 100, 15);
  // Timer
  fill(174, 100, 100);
  textFont(timerFont);
  textSize(100);
  textAlign(CENTER);

  // timer function
  setInterval(timer(), 10); }
}

// This function outlines the starting page of the program
function pageOne() {
  if (timerOn == false) {
    console.log("pressed");
    backgroundColor = color(270, 5, 16);
    duration = 25 * 60 * 100;

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
    startTimerButton.show(); 
    if (mouseIsPressed && startTimerButton.mousePressed()) {
      console.log(" pressed");
      timerOn = true;
    }
  }
}
