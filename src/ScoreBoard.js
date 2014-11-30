function ScoreBoard() {
  this.frameHolder = new Array();
  this.previousFrameStatus = "Normal";
  this.score = 0;
  this.firstRollBonusMultiplier = 1;
  this.secondRollBonusMultiplier = 1;
  this.displayScore = 0;
};

ScoreBoard.prototype.storeFrame = function(frame) {
  this.frameHolder.push(frame);  
};

ScoreBoard.prototype.storeFrameStatusForNextRound = function(frame) {
  if(frame.isAStrike()) {
    this.previousFrameStatus = "Strike";
  }
  else if (frame.isASpare()) {
    this.previousFrameStatus = "Spare";
  }
  else {
    this.previousFrameStatus = "Normal";
  }
};

ScoreBoard.prototype.shouldABonusApply= function() {
  return this.previousFrameStatus == "Normal" ? false : true;  
};

ScoreBoard.prototype.bonusMultiplier= function() {
  if(this.previousFrameStatus == "Spare") {
    this.firstRollBonusMultiplier = 2;
  }
  else if(this.previousFrameStatus == "Strike") {
    this.firstRollBonusMultiplier = 2;
    this.secondRollBonusMultiplier = 2;
  }
  else {
  }
};

ScoreBoard.prototype.calculateRunningTotal = function(frame) {
  if(this.shouldABonusApply()) {
    this.bonusMultiplier();
    this.score = (frame.rollHolder[0].hitPins * this.firstRollBonusMultiplier) + (frame.rollHolder[1].hitPins * this.secondRollBonusMultiplier) + this.score;
  }
  else {
    this.score = frame.rollHolder[0].hitPins + frame.rollHolder[1].hitPins + this.score;
  }
};

ScoreBoard.prototype.updateScoreDisplay = function(frame) {
  if(this.previousFrameStatus == "Strike") {
    this.displayScore = "X";
  }
  else if (this.previousFrameStatus == "Spare") {
    this.displayScore = "/";
  }
  else {
    this.displayScore = this.score;
  }
};


