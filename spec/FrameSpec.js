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

    it('should know if it is a spare', function() {
      roll1.attempt(5);
      frame.storeRoll(roll1);
      roll2.attempt(5);
      frame.storeRoll(roll2);
      expect(frame.isASpare()).toBe(true);
    });

    it('should know if it is neither a spare nor a strike', function() {
      roll1.attempt(2);
      frame.storeRoll(roll1);
      roll2.attempt(3);
      frame.storeRoll(roll2);
      expect(frame.isNormal()).toBe(true);
    });
});