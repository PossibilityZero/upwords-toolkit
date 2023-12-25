# Upwords Toolkit Game Formats

## Overview

Similar to PGN or FEN for chess, we will define a simple file format to describe board and game state, to be used within the programs contained in this package.

## Board

The board by default will be a 10x10 grid, with 0-indexed coordinates (0, 0) starting from the top left corner. The first number will be the row number (horizontal coordinates), and the second number is the column (vertical coordinates).

For example, the word "HELLO" from (1, 1) to (5, 1) denotes the following configuration:

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
This Upwords Board Format (UBF) serves as an interface to pass Board State between components, and also a (semi-) human-readable format for debugging and test purposes. UBF is a JSON-style array of arrays, each of 10 elements, representing the columns (inner arrays) and rows (outer array) from top to bottom. Each square is represented by two characters: a number for the height, and the letter placed on the square. In case a square is empty, the letter will be a space. While not enforced, by convention the letters should be upper-case.

The example below shows a sample mid-game state of tiles placed on a board, taken from a recent game by the creator.

```
['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
['0 ', '1M', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
['0 ', '1A', '3H', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
['0 ', '1N', '1O', '0 ', '5F', '1U', '4C', '3I', '0 ', '0 '],
['0 ', '1S', '2O', '3M', '2A', '1N', '0 ', '0 ', '0 ', '0 '],
['0 ', '0 ', '4D', '5U', '3R', '4R', '0 ', '0 ', '0 ', '0 '],
['0 ', '0 ', '0 ', '2L', '0 ', '2I', '1D', '0 ', '0 ', '0 '],
['0 ', '0 ', '0 ', '4L', '3O', '5P', '1E', '0 ', '0 ', '0 '],
['0 ', '0 ', '0 ', '3A', '0 ', '1S', '3W', '2I', '2M', '0 '],
['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ']
```
