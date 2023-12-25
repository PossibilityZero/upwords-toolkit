# Upwords Toolkit Game Formats

## Overview

Similar to PGN or FEN for chess, we will define a simple file format to describe board and game state, to be used within the programs contained in this package.

## Board

The board by default will be a 10x10 grid, with 0-indexed coordinates (0, 0) starting from the top left corner. The first number (x) will be the horizontal coordinates, and the second number (y) is the vertical coordinates.

For example, the word "HELLO" from (1, 1) to (1, 5) denotes the following configuration:

```
.  .  .  .  .  .  .  .  .  .
.  H  .  .  .  .  .  .  .  .
.  E  .  .  .  .  .  .  .  .
.  L  .  .  .  .  .  .  .  .
.  L  .  .  .  .  .  .  .  .
.  O  .  .  .  .  .  .  .  .
.  .  .  .  .  .  .  .  .  .
.  .  .  .  .  .  .  .  .  .
.  .  .  .  .  .  .  .  .  .
.  .  .  .  .  .  .  .  .  .
```

### UBF (Upwords Board Format)

In the development of this toolkits, there are several states that must be kept track of:

1. Board State: The tiles already placed on the board, and the height of each stack
2. Tiles: The locations of the remaining tiles (players' racks and/or draw pile)
3. History: The entire history of the game:
   a. From a 'Game Admin' perspective this should include the Tile history as well (who held which tiles on which turn).
   b. From the player perspective, Tiles are opaque while playing (though a running tally may be kept), so whatever format is chosen should allow for keeping Tile History blank.
4. Turn and Score: The turn number and scores of each player (calculable from Play History)

Of these, the Board State alone includes all information required to calculate whether a subsequent move is legal, and the scoring of said move. As this calculation is a core functionality that is reused multiple times by various components, we dedicate a specific format to describe it.
This Upwords Board Format (UBF) serves as an interface to pass Board State between components, and also a (semi-) human-readable format for debugging and test purposes. UBF is a JSON-style array, of 10 elements, representing the rows from top to bottom. Each square is represented by two characters: a number for the height, and the letter placed on the square. In case a square is empty, the letter will be a space. While not enforced, by convention the letters should be upper-case.

```
[
  '0 0 0 0 0 0 0 0 0 0 ',
  '0 1M0 0 0 0 0 0 0 0 ',
  '0 1A3H0 0 0 0 0 0 0 ',
  '0 1N1O0 5F1U4C3I0 0 ',
  '0 1S2O3M2A1N0 0 0 0 ',
  '0 0 4D5U3R4R0 0 0 0 ',
  '0 0 0 2L0 2I1D0 0 0 ',
  '0 0 0 4L3O5P1E0 0 0 ',
  '0 0 0 3A0 1S3W2I2M0 ',
  '0 0 0 0 0 0 0 0 0 0 '
]
```
