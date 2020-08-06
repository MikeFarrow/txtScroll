/* eslint-disable no-undef, no-unused-vars */
let msg;
//let initWord;
const WIDTH = 600;
const HEIGHT = 350;
const SPEED = -20;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(0);
  //initWord = new AWord("Mike", 160);
  msg = new AMsg("Mike Farrow");
  // Put setup code here
}

function draw() {
  // alpha between 0 - 255
  fill(0, 250);
  rect(0, 0, WIDTH, HEIGHT);

  //initWord.tick();
  msg.tick();
}

class AMsg {
  constructor(msg) {
    this.msg = msg;
    this.wrds = msg.split(" ");
    let mWord = new AWord(this.wrds[0], 160);
    this.mWords = [];
    this.mWords.push(mWord);
    this.wrdCnt = this.wrds.length;
    this.cnt = 1;
  }
  tick() {
    // Loop through words
    this.mWords.forEach(word => {
      word.tick();
      if (word.wrdDone && this.cnt < this.wrdCnt) {
        this.nextWord();
        word.wrdDone = false;
        word.wrdStill = true;
        this.cnt += 1;
      }
    });
    //this.mWord.tick();
  }
  nextWord() {
    let mWord = new AWord(this.wrds[1], 300);
    this.mWords.push(mWord);
  }
}

class AWord {
  constructor(word, yPos) {
    this.word = word;
    this.wChars = new AChars(word.charAt(0), WIDTH, yPos);
    this.cnt = 1; // Keeps track of the letters
    this.done = false;
    this.wrdDone = false;
    this.wrdStill = false;
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
      } else if (!this.wrdStill) {
        this.wrdDone = true;
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
    this.moveDir = SPEED;
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
    fill(255);
    textStyle(BOLD);
    textSize(140);
    text(this.chars, this.x, this.y);
  }
}

// This Redraws the Canvas when resized
windowResized = function() {
  //resizeCanvas(windowWidth, windowHeight);
};
