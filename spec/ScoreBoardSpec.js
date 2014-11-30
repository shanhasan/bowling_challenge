describe("ScoreBoard", function() {

  beforeEach(function() {
    board = new ScoreBoard();
    frame = new Frame();
    roll1 = new Roll();
    roll2 = new Roll();
  });

  it('should should start out with zero points on the board', function() {
    expect(board.score).toBe(0);
  });

  it('should be able to present the total score for normal frames', function() {
    roll1.attempt(2);
    frame.storeRoll(roll1);
    roll2.attempt(5);
    frame.storeRoll(roll2);
    board.storeFrame(frame);
    board.calculateRunningTotal(frame, 0);
    expect(board.score).toBe(7);
  });

  it('should recognise if a spare was achieved in the previous round', function() {
    roll1.attempt(5);
    frame.storeRoll(roll1);
    roll2.attempt(5);
    frame.storeRoll(roll2);
    board.storeFrame(frame);
    expect(board.previousFrameStatus).toEqual("Normal");
    board.storeFrameStatusForNextRound(frame);
    expect(board.previousFrameStatus).toEqual("Spare");
  });

  it('should recognise if a strike was achieved in the previous round', function() {
    roll1.attempt(10);
    frame.storeRoll(roll1);
    board.storeFrame(frame);
    expect(board.previousFrameStatus).toEqual("Normal");
    board.storeFrameStatusForNextRound(frame);
    expect(board.previousFrameStatus).toEqual("Strike");
  });

  it('should recognise if a bonus is going to be applied to the current round', function() {
    roll1.attempt(10);
    frame.storeRoll(roll1);
    board.storeFrame(frame);
    board.storeFrameStatusForNextRound(frame);
    expect(board.shouldABonusApply()).toBe(true);
  });



  //   ==== 0-9
  //   ==== frame10
  //   ==== 10 (spare strike)

  //   expect(board.score).toBe(0);
  // });

  //   shuld be able to calculate if a bonus shd be applied

  // frame(n-1).is normal, strike, 
  // > modifer is 
  // > modifier is 


// Should calculate the score (and hence account for bonuses)
// Should be able to hold/display score
// The final score should range from 0 to 300.



});