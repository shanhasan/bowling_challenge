Bowling-Challenge
=================

This is our weekend challenge for week 5.  The aim to build a scoreboard using Javascript that tracks the scores of a bowling game for one player.  We are going to develop this using Jasmine tests, having defined the game in terms of basic classes and responsibilities.

##How The Game Is Described
A game consists of 10 frames in which the player tries to knock down  10 pins. In every frame the player can throw one or two times. The actual number depends on strikes and spares. The score of a frame is the number of knocked down pins plus bonuses for strikes and spares. After every frame the 10 pins are reset. 

###Strikes & Spares
The player has a strike if he knocks down all 10 pins with the first roll in a frame. The frame ends immediately (since there are no pins left for a second roll).  The player has a spare if the knocks down all 10 pins with the two roles of a frame. 

###How Bonuses Are Calculated
If there is a spare, the bonus for that frame is the number of pins knocked down by the next roll (i.e. the first role of next frame).  If there is a strike, the bonus for that frame will be the number of pins knocked down by the next two rolls unless the player rolls a strike again and hence has one roll (i.e. the bonus is the outcome of the next frame).

###The 10th Frame
If the player rolls a strike or spare in the 10th frame he can roll  additional balls for a bonus.  He can never roll more than 3 balls in the 10th frame.  10, 10, 10 in the 10th frame gives 30 points and is the maximum (i.e. 10 points for the regular first strike and 20 points for the bonus).  1, 9, 10 in the 10th frame would give 20 points (10 points for the regular spare and 10 points for the bonus).

###The Perfect Game
A Perfect Game is when the player rolls 12 strikes (10 regular strikes and 2 strikes for the bonus in the 10th frame). The Perfect Game scores to 300 points.

##How We Define Classes & Basic Responsibilities

###Scoreboard
- Should calculate the score (and hence account for bonuses)
- Should be able to hold/display score
- The final score should range from 0 to 300.

###Roll
- The first roll should return a value in the range 0-10
- A second roll should return a value in the range of 0-(10-first roll) and hence will return zero if the first roll is 10 as a proxy to the first roll being a strike.

###Frame
- Should consist of two rolls
- Should know if it represents a "strike", "spare", or "normal" round

###Bonus Frame (Frame 10)
- Cannot consist of more than three rolls
- Will comprise of two rolls if there is no strike or spare after two rolls
- Will comprise of three rolls if there is a spare after the first two rolls.  The third roll will offer a single roll on a reset set of 10 pins.
- Will comprise of three rolls if there is a strike.