describe("ScoreBoard", function() {

  var board, frame, frame2, frame3, frame4, frame5, roll1, roll2, roll3, roll4;

  beforeEach(function() {
    board = new ScoreBoard;
    frame = new Frame;
    frame2 = new Frame;
    frame3 = new Frame;
    frame4 = new Frame;
    frame5 = new Frame;
    roll1 = new Roll;
    roll2 = new Roll;
    roll3 = new Roll;
    roll4 = new Roll;
    roll5 = new Roll;
  });

  it('should should start out with zero points on the board', function() {
    expect(board.cumulativeScore).toBe(0);
  });

  it('should be able to present the total score for normal frames', function() {
    roll1.attempt(2);
    frame.storeRoll(roll1);
    roll2.attempt(5);
    frame.storeRoll(roll2);
    board.storeFrame(frame);
    board.storePinsHit(frame);
    expect(board.cumulativeScore).toEqual(7);
  });

  it('should display "X" as the current score if the previous round finished a strike', function() {
    roll1.attempt(10);
    frame.storeRoll(roll1);
    board.storeFrame(frame);
    board.updateScoreDisplay(frame);
    expect(board.displayScore).toEqual("X");

  });

  it('should display "/" as the current score if the previous round finished a spare', function() {
    roll1.attempt(1);
    frame.storeRoll(roll1);
    roll2.attempt(9);
    frame.storeRoll(roll2);
    board.storeFrame(frame);
    board.updateScoreDisplay(frame);
    expect(board.displayScore).toEqual("/");
  });

  it('should display the current score if the previous round finished as neither a spare nor a strike', function() {
    roll1.attempt(1);
    frame.storeRoll(roll1);
    roll2.attempt(6);
    frame.storeRoll(roll2);
    board.storeFrame(frame);
    board.storePinsHit(frame);
    board.updateScoreDisplay(frame);
    expect(board.displayScore).toEqual(7);
  });

  it('should be able to calculate a bonus in the event of a spare', function() {
    roll1.attempt(5);
    frame.storeRoll(roll1);
    roll2.attempt(5);
    frame.storeRoll(roll2);
    board.storeFrame(frame);
    board.storePinsHit(frame);
    roll3.attempt(7);
    frame2.storeRoll(roll3);
    roll4.attempt(1);
    frame2.storeRoll(roll4);
    board.calculateSpareBonus(frame2);
    expect(board.frameBonus[0]).toEqual(7);
  });

  it('should be able to calculate a bonus in the event of a strike', function() {
    roll1.attempt(10);
    frame.storeRoll(roll1);
    board.storeFrame(frame);
    board.storePinsHit(frame);
    roll3.attempt(4);
    frame2.storeRoll(roll3);
    roll4.attempt(2);
    frame2.storeRoll(roll4);
    board.calculateStrikeBonus(frame2);
    expect(board.frameBonus[0]).toEqual(6);

  });

  it('should be able to calculate a bonus in the event of two strike', function() {
    roll1.attempt(10);
    frame.storeRoll(roll1);
    board.storeFrame(frame);
    board.storePinsHit(frame);
    roll2.attempt(10);
    frame2.storeRoll(roll2);
    board.calculateStrikeBonus(frame2);
    board.storeFrame(frame2);
    board.storePinsHit(frame2);
    roll3.attempt(10);
    frame3.storeRoll(roll3);
    board.storeFrame(frame3);
    board.calculateStrikeBonus(frame3);
    roll4.attempt(10);
    frame4.storeRoll(roll4);
    board.storeFrame(frame4);
    board.calculateStrikeBonus(frame4);
    roll5.attempt(10);
    frame5.storeRoll(roll5);
    board.storeFrame(frame5);
    board.calculateStrikeBonus(frame5);
    expect(board.frameBonus[0]).toEqual(20);
  });

// it('should recognise if a bonus needs to apply to a frame', function() {
  //   expect(board.shouldABonusApply()).toBe(false);
  //   roll1.attempt(10);
  //   frame.storeRoll(roll1);
  //   board.storeFrame(frame);
  //   board.storeFrameStatus(frame);
  //   expect(board.shouldABonusApply()).toBe(true);
  // });

});