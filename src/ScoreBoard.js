function ScoreBoard() {
  this.frameHolder = new Array();
  this.frameTotalPinsHit = new Array();
  this.frameBonusStrike = new Array();
  this.frameBonusSpare = new Array();
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
    this.frameBonusSpare.push(0);
    this.frameBonusStrike.push(0);
    this.cumulativeScore = this.frameTotalPinsHit[this.frameTotalPinsHit.length-1] + this.cumulativeScore;
  }
};

ScoreBoard.prototype.calculateSpareBonus = function(frame) {
  if(this.frameHolder[this.frameHolder.length-1].isASpare()) {
    this.frameBonusSpare.push(frame.rollHolder[0].hitPins);
  }else{
    this.frameBonusSpare;
  }
  console.log(this.frameBonusSpare);
};

ScoreBoard.prototype.calculateStrikeBonus = function(frame) {
  if(this.frameHolder[this.frameHolder.length-1].isAStrike()) {
    this.frameBonusStrike.push(frame.rollHolder[0].hitPins + frame.rollHolder[1].hitPins);
    if(frame.isAStrike() && this.frameBonusStrike.length > 1) {
      this.frameBonusStrike[this.frameBonusStrike.length-2] = this.frameBonusStrike[this.frameBonusStrike.length-2] + frame.rollHolder[0].hitPins;
    }
  }else{
    this.frameBonusStrike;
  }
    console.log(this.frameBonusStrike);
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


