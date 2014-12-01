function Frame() {
  this.rollHolder = new Array();
};

Frame.prototype.storeRoll = function(roll) {
  if(roll.hitPins == 10) {
  	this.rollHolder.push(roll); 
  	var blankRoll = new Roll;
  	blankRoll.attempt(0);
  	this.rollHolder.push(blankRoll);
	}
  else
	 {
 	  this.rollHolder.push(roll);  
	}
};

Frame.prototype.isAStrike = function() {
  return this.rollHolder[0].hitPins == 10;
};

Frame.prototype.isASpare = function() {
  if(!this.isAStrike()) {
   return this.rollHolder[0].hitPins + this.rollHolder[1].hitPins == 10;
  }
};

Frame.prototype.isNormal = function() {
  return this.isASpare() == false;
};

