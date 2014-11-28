describe("Frame", function() {

  beforeEach(function() {
    frame = new Frame();
    roll1 = new Roll();
    roll2 = new Roll();
  });

   it('should consist of two rolls', function() {
      frame.storeRoll(roll1);
      frame.storeRoll(roll2);
      expect(frame.rollHolder.length).toEqual(2);
    });

    it('should know if it is a strike', function() {
      roll1.attempt(10);
      frame.storeRoll(roll1);
      expect(frame.isAStrike()).toBe(true);
    });




//    Should consist of two rolls
// Should know if it represents a "strike", "spare", or "normal" round

});