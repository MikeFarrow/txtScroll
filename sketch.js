/* eslint-disable no-undef, no-unused-vars */
let initMsg;
let initWord;
const WIDTH = 600;
const HEIGHT = 350;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(0);
  initWord = new AWord("Mike");
  // Put setup code here
}

function draw() {
  // alpha between 0 - 255
  fill(0, 120);
  rect(0, 0, WIDTH, HEIGHT);
  fill(255);

  initWord.tick();
}

class AMsg {
  constructor(msg) {
    this.msg = msg;
    // str.split(" ")
  }
}

class AWord {
  constructor(word) {
    this.word = word;
    this.initChar = new AChar(word.charAt(0), WIDTH, 150);
    this.cnt = 1;
  }
  tick() {
    // Check if char has crossed the screen and back
    if (this.initChar.done) {
      // Add another character from the word
      this.initChar.char += this.word.charAt(this.cnt);
      this.cnt += 1;
      this.initChar.done = false;
    }
    this.initChar.draw();
  }
}

class AChar {
  constructor(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;
    this.moveDir = -9;
    this.done = false;
  }
  draw() {
    this.x += this.moveDir;
    if (this.x < 1) {
      this.moveDir *= -1;
    } else if (this.x > WIDTH) {
      this.moveDir *= -1;
      this.done = true;
    }

    textStyle(BOLD);
    textSize(140);
    text(this.char, this.x, this.y);
  }
}

// This Redraws the Canvas when resized
windowResized = function() {
  //resizeCanvas(windowWidth, windowHeight);
};
