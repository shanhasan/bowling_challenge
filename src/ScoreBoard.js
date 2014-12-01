function ScoreBoard() {
  this.frameHolder = new Array();
  this.FrameStatus = "Normal";
  this.frameTotalPinsHit = new Array();
  this.frameBonus = new Array();
  this.displayScore = 0;
  this.cumulativeScore = 0;
};

ScoreBoard.prototype.storeFrame = function(frame) {
  this.frameHolder.push(frame);  
};

ScoreBoard.prototype.storeFrameStatus = function(frame) {
  if(frame.isAStrike()) {
    this.FrameStatus = "Strike";
  }
  else if (frame.isASpare()) {
    this.FrameStatus = "Spare";
  }
  else {
    this.FrameStatus = "Normal";
  }
};

ScoreBoard.prototype.shouldABonusApply= function() {
  return this.FrameStatus == "Normal" ? false : true;  
};

ScoreBoard.prototype.storePinsHit = function(frame) {
  if(this.shouldABonusApply()) {
    this.frameTotalPinsHit.push(frame.rollHolder[0].hitPins + frame.rollHolder[1].hitPins);
  }
  else {
    this.frameTotalPinsHit.push(frame.rollHolder[0].hitPins + frame.rollHolder[1].hitPins);
    this.frameBonus.push(0);
    this.cumulativeScore = this.frameTotalPinsHit[this.frameTotalPinsHit.length-1] + this.cumulativeScore;
  }
};

ScoreBoard.prototype.updateScoreDisplay = function(frame) {
  if(this.FrameStatus == "Strike") {
    this.displayScore = "X";
  }
  else if (this.FrameStatus == "Spare") {
    this.displayScore = "/";
  }
  else {
    this.displayScore = this.cumulativeScore;
  }
};


