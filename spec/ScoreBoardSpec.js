describe("ScoreBoard", function() {

  var board, frame, frame2, frame3, frame4, frame5, roll1, roll2, roll3, roll4, roll5, roll6, roll7;

  beforeEach(function() {
    board = new ScoreBoard();
    frame = new Frame();
    frame2 = new Frame();
    frame3 = new Frame();
    frame4 = new Frame();
    frame5 = new Frame();
    roll1 = new Roll();
    roll2 = new Roll();
    roll3 = new Roll();
    roll4 = new Roll();
    roll5 = new Roll();
    roll6 = new Roll();
    roll7 = new Roll();
  });

  ScoreBoard.prototype.bowls = function(frame) {
    roll1.attempt(2);
    frame.storeRoll(roll1);
    roll2.attempt(5);
    frame.storeRoll(roll2);
    board.storeFrame(frame);
    board.storePinsHit(frame);
  };

  ScoreBoard.prototype.spare = function(frame) {
    roll1.attempt(5);
    frame.storeRoll(roll1);
    roll2.attempt(5);
    frame.storeRoll(roll2);
    board.storeFrame(frame);
    board.storePinsHit(frame);
  };

  ScoreBoard.prototype.spare2 = function(frame) {
    roll3.attempt(7);
    frame2.storeRoll(roll3);
    roll4.attempt(3);
    frame2.storeRoll(roll4);
    board.calculateSpareBonus(frame2);
    board.storeFrame(frame2);
    board.storePinsHit(frame2);
  };

  ScoreBoard.prototype.strike = function(frame) {
    roll1.attempt(10);
    frame.storeRoll(roll1);
    board.storeFrame(frame);
    board.storePinsHit(frame);
  };

  ScoreBoard.prototype.strike2 = function(frame) {
    roll3.attempt(10);
    frame2.storeRoll(roll3);
    board.calculateStrikeBonus(frame2);
    board.storeFrame(frame2);
    board.storePinsHit(frame2);
  };

  ScoreBoard.prototype.strike3 = function(frame) {
    roll5.attempt(10);
    frame3.storeRoll(roll5);
    board.calculateStrikeBonus(frame3);
    board.storeFrame(frame3);
    board.storePinsHit(frame3);
  };

  ScoreBoard.prototype.strike4 = function(frame) {
    roll7.attempt(10);
    frame4.storeRoll(roll7);
    board.calculateStrikeBonus(frame4);
    board.storeFrame(frame4);
    board.storePinsHit(frame4);
  };

  it('should should start out with zero points on the board', function() {
    expect(board.cumulativeScore).toBe(0);
  });

  it('should be able to present the total score for normal frames', function() {
    board.bowls(frame);
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
    board.updateScoreDisplay(frame);
    expect(board.displayScore).toEqual(7);
  });

  it('should be able to calculate a bonus in the event of a spare', function() {
    board.spare(frame);
    roll3.attempt(7);
    frame2.storeRoll(roll3);
    roll4.attempt(1);
    frame2.storeRoll(roll4);
    board.calculateSpareBonus(frame2);
    expect(board.frameBonusSpare[0]).toEqual(7);
  });

  it('should be able to calculate a bonus in the event of a strike', function() {
    board.strike(frame);
    roll3.attempt(4);
    frame2.storeRoll(roll3);
    roll4.attempt(2);
    frame2.storeRoll(roll4);
    board.calculateStrikeBonus(frame2);
    expect(board.frameBonusStrike[0]).toEqual(6);
  });

  it('should be able to calculate a bonus in the event of two strikes', function() {
    board.strike(frame);
    board.strike2(frame2);
    board.strike3(frame3);
    board.strike4(frame4);
    expect(board.frameBonusStrike[0]).toEqual(20)
  });

  it('should be able to calculate a bonus in the event of a strike', function() {
    board.strike(frame);
    board.strike2(frame2);
    roll5.attempt(6);
    frame3.storeRoll(roll5);
    roll6.attempt(3);
    frame3.storeRoll(roll6);
    board.calculateStrikeBonus(frame3);
    board.storeFrame(frame3);
    expect(board.frameBonusStrike[0]).toEqual(10);
  });

  it('spare Test', function() {
    board.spare(frame);
    board.spare2(frame2);
    roll5.attempt(10);
    frame3.storeRoll(roll5);
    board.calculateSpareBonus(frame3);
    board.storeFrame(frame3);
    board.strike4(frame4);
    expect(board.frameBonusStrike[0]).toEqual(10);
    expect(board.frameBonusSpare[1]).toEqual(10);
  });
});