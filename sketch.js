/* eslint-disable no-undef, no-unused-vars */
let initMsg;
let initWord;
const WIDTH = 600;
const HEIGHT = 350;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(0);
  initWord = new AWord("Mike", 160);
  initMsg = new AMsg("Farrow Mike");
  // Put setup code here
}

function draw() {
  // alpha between 0 - 255
  fill(0, 120);
  rect(0, 0, WIDTH, HEIGHT);
  fill(255);

  initWord.tick();
  initMsg.tick();
}

class AMsg {
  constructor(msg) {
    this.msg = msg;
    this.wrds = msg.split(" ");
    let mWord = new AWord(this.wrds[0], 300);
    this.mWords = [];
    this.mWords.push(mWord);
    // str.split(" ")
  }
  tick() {
    this.mWords.forEach(word => {
      word.tick();
      if (word.done) {
      }
    });
    //this.mWord.tick();
  }
  nextWord() {}
}

class AWord {
  constructor(word, yPos) {
    this.word = word;
    this.wChars = new AChars(word.charAt(0), WIDTH, yPos);
    this.cnt = 1;
    this.done = false;
  }
  tick() {
    // Check if char has crossed the screen and back
    if (this.wChars.done) {
      // Add another character from the word
      this.wChars.chars += this.word.charAt(this.cnt);
      this.cnt += 1;
      this.wChars.done = false;
    }
    if (this.cnt < this.word.length) {
      this.wChars.calc();
    } else if (this.cnt === this.word.length) {
      if (this.wChars.x > 50) {
        this.wChars.calc();
      } else {
        this.done = true;
      }
    }
    this.wChars.draw();
  }
}

class AChars {
  constructor(chars, x, y) {
    this.chars = chars;
    this.x = x;
    this.y = y;
    this.moveDir = -9;
    this.done = false;
  }

  calc() {
    this.x += this.moveDir;
    if (this.x < 1) {
      this.moveDir *= -1;
    } else if (this.x > WIDTH) {
      this.moveDir *= -1;
      this.done = true;
    }
  }

  draw() {
    textStyle(BOLD);
    textSize(140);
    text(this.chars, this.x, this.y);
  }
}

// This Redraws the Canvas when resized
windowResized = function() {
  //resizeCanvas(windowWidth, windowHeight);
};
