function ScoreBoard() {
  this.frameHolder = new Array();
  // this.FrameStatus = "Normal";
  this.frameTotalPinsHit = new Array();
  this.frameBonus = new Array();
  this.displayScore = 0;
  this.cumulativeScore = 0;
};

ScoreBoard.prototype.storeFrame = function(frame) {
  this.frameHolder.push(frame);  
};

ScoreBoard.prototype.storePinsHit = function(frame) {
  if(frame.isAStrike() || frame.isASpare() ) {
    this.frameTotalPinsHit.push(frame.rollHolder[0].hitPins + frame.rollHolder[1].hitPins);
  }
  else {
    this.frameTotalPinsHit.push(frame.rollHolder[0].hitPins + frame.rollHolder[1].hitPins);
    this.frameBonus.push(0);
    this.cumulativeScore = this.frameTotalPinsHit[this.frameTotalPinsHit.length-1] + this.cumulativeScore;
  }
};

ScoreBoard.prototype.calculateSpareBonus = function(frame) {
  if(this.frameHolder[this.frameHolder.length-1].isASpare()) {
    this.frameBonus.push(frame.rollHolder[0].hitPins);
  }
};

ScoreBoard.prototype.updateScoreDisplay = function(frame) {
  if(frame.isAStrike()) {
    this.displayScore = "X";
  }
  else if (frame.isASpare()) {
    this.displayScore = "/";
  }
  else {
    this.displayScore = this.cumulativeScore;
  }
};


