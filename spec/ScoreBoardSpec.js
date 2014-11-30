describe("ScoreBoard", function() {

  beforeEach(function() {
    board = new ScoreBoard();
    frame = new Frame();
    frame2 = new Frame();
    roll1 = new Roll();
    roll2 = new Roll();
    roll3 = new Roll();
    roll4 = new Roll();
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
    board.calculateRunningTotal(frame);
    expect(board.score).toEqual(7);
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

  it('should apply a bonus to the first roll if the previous round was a spare', function() {
    roll1.attempt(5);
    frame.storeRoll(roll1);
    roll2.attempt(5);
    frame.storeRoll(roll2);
    board.storeFrame(frame);
    board.calculateRunningTotal(frame);
    expect(board.score).toEqual(10);
    board.storeFrameStatusForNextRound(frame);
    roll3.attempt(2);
    frame2.storeRoll(roll3);
    roll4.attempt(3);
    frame2.storeRoll(roll4);
    board.storeFrame(frame2);  
    expect(board.previousFrameStatus).toEqual("Spare");
    board.bonusMultiplier();
    expect(board.firstRollBonusMultiplier).toEqual(2);
    board.calculateRunningTotal(frame2);
    expect(board.score).toEqual(17);
  });

  it('should apply a bonus to the both rolls if the previous round was a strike', function() {
    roll1.attempt(10);
    frame.storeRoll(roll1);
    board.storeFrame(frame);
    board.calculateRunningTotal(frame);
    expect(board.score).toEqual(10);
    board.storeFrameStatusForNextRound(frame);
    roll3.attempt(2);
    frame2.storeRoll(roll3);
    roll4.attempt(3);
    frame2.storeRoll(roll4);
    board.storeFrame(frame2);  
    expect(board.previousFrameStatus).toEqual("Strike");
    board.bonusMultiplier();
    expect(board.firstRollBonusMultiplier).toEqual(2);
    expect(board.secondRollBonusMultiplier).toEqual(2);
    board.calculateRunningTotal(frame2);
    expect(board.score).toEqual(20);
  });

  it('should display "X" as the current score if the previous round finished a strike', function() {
    roll1.attempt(10);
    frame.storeRoll(roll1);
    board.storeFrame(frame);
    board.storeFrameStatusForNextRound(frame);
    board.calculateRunningTotal(frame);
    board.updateScoreDisplay(frame);
    expect(board.displayScore).toEqual("X");

  });

  it('should display "/" as the current score if the previous round finished a spare', function() {
    roll1.attempt(1);
    frame.storeRoll(roll1);
    roll2.attempt(9);
    frame.storeRoll(roll2);
    board.storeFrame(frame);
    board.storeFrameStatusForNextRound(frame);
    board.calculateRunningTotal(frame);
    board.updateScoreDisplay(frame);
    expect(board.displayScore).toEqual("/");
  });

  it('should display the current score if the previous round finished as neither a spare nor a strike', function() {
    roll1.attempt(1);
    frame.storeRoll(roll1);
    roll2.attempt(6);
    frame.storeRoll(roll2);
    board.storeFrame(frame);
    board.storeFrameStatusForNextRound(frame);
    board.calculateRunningTotal(frame);
    board.updateScoreDisplay(frame);
    expect(board.displayScore).toEqual(7);
  });




});