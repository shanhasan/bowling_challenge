describe("ScoreBoard", function() {

  var board, frame, frame2, frame3, frame4, frame5, roll1, roll2;

  beforeEach(function() {
    board = new ScoreBoard();
    frame = new Frame();
    frame2 = new Frame();
    frame3 = new Frame();
    frame4 = new Frame();
    frame5 = new Frame();
    roll1 = new Roll();
    roll2 = new Roll();
  });

  ScoreBoard.prototype.bowls = function(frame) {
    roll1.attempt(2);
    frame.storeRoll(roll1);
    roll2.attempt(5);
    frame.storeRoll(roll2);
  };

  ScoreBoard.prototype.spare = function(frame) {
    roll1.attempt(5);
    frame.storeRoll(roll1);
    roll2.attempt(5);
    frame.storeRoll(roll2);
  };

  ScoreBoard.prototype.strike = function(frame) {
    roll1.attempt(10);
    frame.storeRoll(roll1);
    board.storeFrame(frame);
    board.storePinsHit(frame);
  };

  ScoreBoard.prototype.storeRound = function(frame) {
    board.calculateBonus(frame);
    board.storeFrame(frame);
    board.storePinsHit(frame);
  };

  // ScoreBoard.prototype.storeRoundSpare = function(frame) {
  //   board.calculateSpareBonus(frame);
  //   board.storeFrame(frame);
  //   board.storePinsHit(frame);
  // };

  // ScoreBoard.prototype.storeRoundStrike = function(frame) {
  //   board.calculateStrikeBonus(frame);
  //   board.storeFrame(frame);
  //   board.storePinsHit(frame);
  // };

  it('should should start out with zero points on the board', function() {
    expect(board.cumulativeScore).toBe(0);
  });

  it('should be able to present the total score for normal frames', function() {
    board.bowls(frame);
    board.storeRound(frame);
    expect(board.cumulativeScore).toEqual(7);
  });

  it('should display "X" as the current score if the previous round finished a strike', function() {
    board.strike(frame);
    board.updateScoreDisplay(frame);
    expect(board.displayScore).toEqual("X");
  });

  it('should display "/" as the current score if the previous round finished a spare', function() {
    board.spare(frame);
    board.updateScoreDisplay(frame);
    expect(board.displayScore).toEqual("/");
  });

  it('should display the current score if the previous round finished as neither a spare nor a strike', function() {
    board.bowls(frame);
    board.storeRound(frame);
    board.updateScoreDisplay(frame);
    expect(board.displayScore).toEqual(7);
  });

  it('should be able to calculate a bonus in the event of a spare', function() {
    board.spare(frame);
    board.storeRound(frame);
    board.bowls(frame2);
    board.storeRound(frame2);
    board.bowls(frame3);
    board.storeRound(frame3);
    expect(board.frameBonusSpare[0]).toEqual(2);
  });

  it('should be able to calculate a bonus in the event of a strike', function() {
    board.strike(frame);
    board.storeRound(frame);
    board.strike(frame2);
    board.storeRound(frame);
    board.bowls(frame3);
    board.storeRound(frame2);
    expect(board.frameBonusStrike[1]).toEqual(7);
  });

  it('should be able to calculate a bonus in the event of two strikes', function() {
    board.strike(frame);
    board.storeRound(frame);
    board.strike(frame2);
    board.storeRound(frame2);
    board.strike(frame3);
    board.storeRound(frame3);
    board.strike(frame4);
    board.storeRound(frame4);
    expect(board.frameBonusStrike[0]).toEqual(20)
  });

  it('should be able to calculate a bonus in the event of a strike', function() {
    board.strike(frame);
    board.storeRound(frame);
    board.strike(frame2);
    board.storeRound(frame2);
    board.bowls(frame3);
    board.storeRound(frame3);
    board.storeFrame(frame3);
    expect(board.frameBonusStrike[0]).toEqual(10);
  });

  it('spare Test', function() {
    board.spare(frame);
    board.storeRound(frame);
    board.spare(frame2);
    board.storeRound(frame2);
    board.strike(frame3);
    board.storeRound(frame3);
    board.strike(frame4);
    board.storeRound(frame4);
    expect(board.frameBonusSpare[0]).toEqual(5);
    expect(board.frameBonusStrike[0]).toEqual(10);
  });
});