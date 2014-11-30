describe("Roll", function() {

  beforeEach(function() {
    roll = new Roll();
  });

   it('should range from 0-10 pins hit', function() {
      roll.attempt(5);
      expect(roll.hitPins).toBeGreaterThan(-1); 
      expect(roll.hitPins).toBeLessThan(11);
    });

});