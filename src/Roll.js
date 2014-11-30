function Roll() {
	this.hitPins = 0;
};

Roll.prototype.attempt = function(pins) {
  this.hitPins = pins;
};