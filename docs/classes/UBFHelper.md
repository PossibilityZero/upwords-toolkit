[**upwords-toolkit**](../README.md) • **Docs**

***

[upwords-toolkit](../globals.md) / UBFHelper

# Class: UBFHelper

A collection of static methods to help with Upwords board operations.

No public method in the class mutates the board.
Instead, a new copy is created for each operation.

## Constructors

### new UBFHelper()

> **new UBFHelper**(): [`UBFHelper`](UBFHelper.md)

#### Returns

[`UBFHelper`](UBFHelper.md)

## Properties

### boardLength

> `static` **boardLength**: `number` = `10`

#### Defined in

[boardUtils.ts:41](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/boardUtils.ts#L41)

## Methods

### boardIsEmpty()

> `static` **boardIsEmpty**(`board`): `boolean`

Returns true if the board is empty.
An empty board is one where all tiles are '0 '.

#### Parameters

• **board**: [`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

The board to check

#### Returns

`boolean`

true if the board is empty

#### Defined in

[boardUtils.ts:293](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/boardUtils.ts#L293)

***

### coordsAreEqual()

> `static` **coordsAreEqual**(`coord1`, `coord2`): `boolean`

Compares two coordinates and returns true if they are equal.

#### Parameters

• **coord1**: [`Coord`](../type-aliases/Coord.md)

The first coordinate

• **coord2**: [`Coord`](../type-aliases/Coord.md)

The second coordinate

#### Returns

`boolean`

true if coord1 and coord2 have the same x and y values

#### Defined in

[boardUtils.ts:151](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/boardUtils.ts#L151)

***

### copyBoard()

> `static` **copyBoard**(`board`): [`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

Creates a new IUpwordsBoardFormat that is a deep copy of the input board.

#### Parameters

• **board**: [`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

The board to copy

#### Returns

[`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

A deep copy of the input board

#### Defined in

[boardUtils.ts:68](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/boardUtils.ts#L68)

***

### createEmptyBoard()

> `static` **createEmptyBoard**(): [`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

Creates an empty Upwords board.

#### Returns

[`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

An empty 10 x 10 Upwords board

#### Defined in

[boardUtils.ts:47](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/boardUtils.ts#L47)

***

### findWord()

> `static` **findWord**(`board`, `coord`, `direction`): [`BoardWord`](../type-aliases/BoardWord.md)

Given a coordinate on the board and a direction, finds the word that the coordinate is part of.

As opposed to the scoring rules, findWord allows for 1-letter "words".

If the starting coordinate is empty, returns an empty array.

#### Parameters

• **board**: [`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

The current board state

• **coord**: [`Coord`](../type-aliases/Coord.md)

The coordinate to start from

• **direction**: [`PlayDirection`](../enumerations/PlayDirection.md)

The direction to search for the word

#### Returns

[`BoardWord`](../type-aliases/BoardWord.md)

An array of BoardCell objects representing the word

#### Defined in

[boardUtils.ts:359](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/boardUtils.ts#L359)

***

### getAdjacentCoords()

> `static` **getAdjacentCoords**(`coord`): [`Coord`](../type-aliases/Coord.md)[]

Returns an array of coordinates that are adjacent to the given
coordinate in the vertical and horizontal directions.

#### Parameters

• **coord**: [`Coord`](../type-aliases/Coord.md)

The coordinate to find adjacent coordinates for

#### Returns

[`Coord`](../type-aliases/Coord.md)[]

An array of coordinates that are adjacent to the given coordinate.
Excludes out-of-bounds coordinates.

#### Defined in

[boardUtils.ts:163](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/boardUtils.ts#L163)

***

### getAdjacentTiles()

> `static` **getAdjacentTiles**(`board`, `coord`): [`BoardCell`](../interfaces/BoardCell.md)[]

#### Parameters

• **board**: [`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

• **coord**: [`Coord`](../type-aliases/Coord.md)

#### Returns

[`BoardCell`](../interfaces/BoardCell.md)[]

#### Defined in

[boardUtils.ts:170](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/boardUtils.ts#L170)

***

### getHeightAt()

> `static` **getHeightAt**(`board`, `coord`): `number`

Returns the height of the tile at the given coordinate on the board.
Throws an error if the tile does not exist.

#### Parameters

• **board**: [`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

The board to search

• **coord**: [`Coord`](../type-aliases/Coord.md)

The coordinate to look up

#### Returns

`number`

The height of the tile at the given coordinate

#### Defined in

[boardUtils.ts:102](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/boardUtils.ts#L102)

***

### getLetterAt()

> `static` **getLetterAt**(`board`, `coord`): `string`

Returns the letter of the tile at the given coordinate on the board.
Throws an error if the tile does not exist.

#### Parameters

• **board**: [`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

The board to search

• **coord**: [`Coord`](../type-aliases/Coord.md)

The coordinate to look up

#### Returns

`string`

The letter of the tile at the given coordinate

#### Defined in

[boardUtils.ts:118](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/boardUtils.ts#L118)

***

### getLineOfPlay()

> `static` **getLineOfPlay**(`board`, `coord`, `direction`): `string`[]

Given a board state, coordinate, and a direction,
returns the row or column of the board as an array of tile strings.

Example:
```
getLineOfPlay(board, [4, 5], PlayDirection.Horizontal);
// ['0 ', '0 ', '2H', '1E', '3L', '1L', '1O', '0 ', '0 ', '0 ']
```

#### Parameters

• **board**: [`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

The current board state

• **coord**: [`Coord`](../type-aliases/Coord.md)

The coordinate to start from

• **direction**: [`PlayDirection`](../enumerations/PlayDirection.md)

The direction to get the line of play

#### Returns

`string`[]

An array of strings representing the line of play

#### Defined in

[boardUtils.ts:272](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/boardUtils.ts#L272)

***

### getOrthogonalDirection()

> `static` **getOrthogonalDirection**(`direction`): [`PlayDirection`](../enumerations/PlayDirection.md)

Returns the orthogonal direction to the given direction.

```
getOrthogonalDirection(PlayDirection.Horizontal); // PlayDirection.Vertical
getOrthogonalDirection(PlayDirection.Vertical); // PlayDirection.Horizontal
```

#### Parameters

• **direction**: [`PlayDirection`](../enumerations/PlayDirection.md)

The input PlayDirection

#### Returns

[`PlayDirection`](../enumerations/PlayDirection.md)

The orthogonal PlayDirection

#### Defined in

[boardUtils.ts:192](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/boardUtils.ts#L192)

***

### getTileAt()

> `static` **getTileAt**(`board`, `coord`): `string`

Returns the tile at the given coordinate on the board.
Throws an error if the coordinate is out of bounds.

#### Parameters

• **board**: [`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

The board to search

• **coord**: [`Coord`](../type-aliases/Coord.md)

The coordinate to look up

#### Returns

`string`

A string representing the tile, in the format 'height letter'. eg. '2T'

#### Defined in

[boardUtils.ts:81](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/boardUtils.ts#L81)

***

### getWordsFromPlay()

> `static` **getWordsFromPlay**(`board`, `play`): [`BoardWord`](../type-aliases/BoardWord.md)[]

Returns the words formed by a play on the board.

#### Parameters

• **board**: [`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

The current board state

• **play**: [`IUpwordsPlay`](../interfaces/IUpwordsPlay.md)

The play onto the board, from which to find all words formed

#### Returns

[`BoardWord`](../type-aliases/BoardWord.md)[]

An array of words formed by the play

#### Defined in

[boardUtils.ts:399](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/boardUtils.ts#L399)

***

### offsetCoord()

> `static` **offsetCoord**(`start`, `direction`, `offset`): [`Coord`](../type-aliases/Coord.md)

Returns a new Coord that is offset from the start Coord in the given direction.

#### Parameters

• **start**: [`Coord`](../type-aliases/Coord.md)

The starting point coordinate

• **direction**: [`PlayDirection`](../enumerations/PlayDirection.md)

The direction to offset the coordinate

• **offset**: `number`

The distance to offset the coordinate

#### Returns

[`Coord`](../type-aliases/Coord.md)

A new coordinate that is offset by the given amount in the given direction

#### Defined in

[boardUtils.ts:134](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/boardUtils.ts#L134)

***

### placeSingleTile()

> `static` **placeSingleTile**(`board`, `letter`, `coordinate`): [`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

Places a single tile on the board at the given coordinate.

#### Parameters

• **board**: [`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

The current board state

• **letter**: `string`

The letter to place on the board.

• **coordinate**: [`Coord`](../type-aliases/Coord.md)

The coordinate to start from

#### Returns

[`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

A new board state with the tile placed

#### Defined in

[boardUtils.ts:206](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/boardUtils.ts#L206)

***

### placeTiles()

> `static` **placeTiles**(`board`, `play`): [`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

Places multiple tiles on the board given a play.

#### Parameters

• **board**: [`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

The current board state

• **play**: [`IUpwordsPlay`](../interfaces/IUpwordsPlay.md)

The play to place on the board

#### Returns

[`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

A new board state with the tiles placed

#### Defined in

[boardUtils.ts:246](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/boardUtils.ts#L246)

***

### scorePlay()

> `static` **scorePlay**(`board`, `play`): `number`

Given a board and a play, returns the score of the play.
Doesn't check if the play is valid.

#### Parameters

• **board**: [`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

The current board state

• **play**: [`IUpwordsPlay`](../interfaces/IUpwordsPlay.md)

The play to score

#### Returns

`number`

The score of the play

#### Defined in

[boardUtils.ts:305](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/boardUtils.ts#L305)
