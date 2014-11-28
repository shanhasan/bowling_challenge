function Frame() {
  this.rollHolder = new Array();
};

Frame.prototype.storeRoll = function(roll) {
  this.rollHolder.push(roll);  
};

Frame.prototype.isAStrike = function() {
  return this.rollHolder[0].hitPins == 10 ? true : false;
};