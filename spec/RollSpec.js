describe("Roll", function() {

  var roll;

  beforeEach(function() {
    roll = new Roll();
  });

   it('should be able to store an attempt', function() {
      roll.attempt(5);
      expect(roll.hitPins).toEqual(5);
    });

});