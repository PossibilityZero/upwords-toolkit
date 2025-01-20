[**upwords-toolkit**](../README.md) • **Docs**

***

[upwords-toolkit](../globals.md) / TileRack

# Class: TileRack

## Extends

- [`TileSet`](TileSet.md)

## Constructors

### new TileRack()

> **new TileRack**(): [`TileRack`](TileRack.md)

#### Returns

[`TileRack`](TileRack.md)

#### Overrides

[`TileSet`](TileSet.md).[`constructor`](TileSet.md#constructors)

#### Defined in

[tiles.ts:273](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L273)

## Properties

### tiles

> `protected` **tiles**: [`FullTiles`](../type-aliases/FullTiles.md)

#### Inherited from

[`TileSet`](TileSet.md).[`tiles`](TileSet.md#tiles)

#### Defined in

[tiles.ts:93](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L93)

## Accessors

### tileCount

> `get` **tileCount**(): `number`

Get the total count of tiles in the set

#### Returns

`number`

#### Inherited from

[`TileSet`](TileSet.md).[`tileCount`](TileSet.md#tilecount)

#### Defined in

[tiles.ts:113](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L113)

***

### tileCountTarget

> `get` **tileCountTarget**(): `number`

The maximum number of tiles a player can have in their hand

ie. When replenishing tiles, the player will draw until they have this many tiles

#### Returns

`number`

#### Defined in

[tiles.ts:283](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L283)

## Methods

### addTile()

> **addTile**(`letter`, `count`): `void`

Add a specified number of one letter to the tile set

#### Parameters

• **letter**: `"Q"` \| `"X"` \| `"S"` \| `"A"` \| `"B"` \| `"C"` \| `"D"` \| `"E"` \| `"F"` \| `"G"` \| `"H"` \| `"I"` \| `"J"` \| `"K"` \| `"L"` \| `"M"` \| `"N"` \| `"O"` \| `"P"` \| `"R"` \| `"T"` \| `"U"` \| `"V"` \| `"W"` \| `"Y"` \| `"Z"`

The letter to add

• **count**: `number`

The number of tiles to add

Example:
```
// tileSet contains 2 A's
tileSet.addTile('A', 1);
tileSet.addTile('B', 2);
// tileSet now contains 3 A's and 2 B's
```

#### Returns

`void`

#### Inherited from

[`TileSet`](TileSet.md).[`addTile`](TileSet.md#addtile)

#### Defined in

[tiles.ts:175](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L175)

***

### addTiles()

> **addTiles**(`letters`): `void`

Add a specified number of each letter to the tile set

#### Parameters

• **letters**: [`Tiles`](../type-aliases/Tiles.md)

A mapping of letters to their counts

Example:
```
// tileSet contains 2 A's
tileSet.addTiles({ A: 3, B: 2 });
// tileSet now contains 5 A's and 2 B's
```

#### Returns

`void`

#### Inherited from

[`TileSet`](TileSet.md).[`addTiles`](TileSet.md#addtiles)

#### Defined in

[tiles.ts:191](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L191)

***

### copyToNewRack()

> **copyToNewRack**(): [`TileRack`](TileRack.md)

Create a deep copy of the current TileRack

#### Returns

[`TileRack`](TileRack.md)

A new TileRack with the same tiles as the current rack

#### Defined in

[tiles.ts:304](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L304)

***

### deleteAllTiles()

> **deleteAllTiles**(): `void`

Remove all tiles from the set

#### Returns

`void`

#### Inherited from

[`TileSet`](TileSet.md).[`deleteAllTiles`](TileSet.md#deletealltiles)

#### Defined in

[tiles.ts:254](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L254)

***

### getLetter()

> **getLetter**(`letter`): `number`

Get the count of a specific letter in the tile set

#### Parameters

• **letter**: `"Q"` \| `"X"` \| `"S"` \| `"A"` \| `"B"` \| `"C"` \| `"D"` \| `"E"` \| `"F"` \| `"G"` \| `"H"` \| `"I"` \| `"J"` \| `"K"` \| `"L"` \| `"M"` \| `"N"` \| `"O"` \| `"P"` \| `"R"` \| `"T"` \| `"U"` \| `"V"` \| `"W"` \| `"Y"` \| `"Z"`

The letter to get the count of

#### Returns

`number`

The count of the letter

#### Inherited from

[`TileSet`](TileSet.md).[`getLetter`](TileSet.md#getletter)

#### Defined in

[tiles.ts:127](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L127)

***

### getMissingTiles()

> **getMissingTiles**(): `number`

Return the number of tiles needed to reach the target

A TileRack represents a player's hand in a game like Scrabble or Upwords.
The target is the maximum number of tiles a player can have in their hand.

#### Returns

`number`

The number of tiles needed to reach the target

#### Defined in

[tiles.ts:295](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L295)

***

### getTiles()

> **getTiles**(): [`Tiles`](../type-aliases/Tiles.md)

#### Returns

[`Tiles`](../type-aliases/Tiles.md)

#### Inherited from

[`TileSet`](TileSet.md).[`getTiles`](TileSet.md#gettiles)

#### Defined in

[tiles.ts:117](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L117)

***

### hasTiles()

> **hasTiles**(`tiles`): `boolean`

#### Parameters

• **tiles**: [`Tiles`](../type-aliases/Tiles.md)

#### Returns

`boolean`

#### Inherited from

[`TileSet`](TileSet.md).[`hasTiles`](TileSet.md#hastiles)

#### Defined in

[tiles.ts:260](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L260)

***

### listLetters()

> **listLetters**(): (`"Q"` \| `"X"` \| `"S"` \| `"A"` \| `"B"` \| `"C"` \| `"D"` \| `"E"` \| `"F"` \| `"G"` \| `"H"` \| `"I"` \| `"J"` \| `"K"` \| `"L"` \| `"M"` \| `"N"` \| `"O"` \| `"P"` \| `"R"` \| `"T"` \| `"U"` \| `"V"` \| `"W"` \| `"Y"` \| `"Z"`)[]

Return a list of unique letters in the tile set

#### Returns

(`"Q"` \| `"X"` \| `"S"` \| `"A"` \| `"B"` \| `"C"` \| `"D"` \| `"E"` \| `"F"` \| `"G"` \| `"H"` \| `"I"` \| `"J"` \| `"K"` \| `"L"` \| `"M"` \| `"N"` \| `"O"` \| `"P"` \| `"R"` \| `"T"` \| `"U"` \| `"V"` \| `"W"` \| `"Y"` \| `"Z"`)[]

An array of Letters (allowed keys of FullTiles)

#### Inherited from

[`TileSet`](TileSet.md).[`listLetters`](TileSet.md#listletters)

#### Defined in

[tiles.ts:136](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L136)

***

### listTiles()

> **listTiles**(): `string`

Return the tiles contained in the set as a string

Example:
```
// tileSet contains 2 A's, 2 B's, and 1 C
tileSet.listTiles(); // => 'AABBC'
```

#### Returns

`string`

A string of all the tiles in the set

#### Inherited from

[`TileSet`](TileSet.md).[`listTiles`](TileSet.md#listtiles)

#### Defined in

[tiles.ts:153](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L153)

***

### removeTile()

> **removeTile**(`letter`, `count`): [`Tiles`](../type-aliases/Tiles.md)

Remove a specified number of one letter from the tile set

#### Parameters

• **letter**: `"Q"` \| `"X"` \| `"S"` \| `"A"` \| `"B"` \| `"C"` \| `"D"` \| `"E"` \| `"F"` \| `"G"` \| `"H"` \| `"I"` \| `"J"` \| `"K"` \| `"L"` \| `"M"` \| `"N"` \| `"O"` \| `"P"` \| `"R"` \| `"T"` \| `"U"` \| `"V"` \| `"W"` \| `"Y"` \| `"Z"`

The letter to remove

• **count**: `number`

The number of tiles to remove

Example:
```
// tileSet contains 3 A's
tileSet.removeTile('A', 2);
// tileSet now contains 1 A
```

#### Returns

[`Tiles`](../type-aliases/Tiles.md)

#### Inherited from

[`TileSet`](TileSet.md).[`removeTile`](TileSet.md#removetile)

#### Defined in

[tiles.ts:210](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L210)

***

### removeTiles()

> **removeTiles**(`letters`): `void`

Remove a specified number of each letter from the tile set

#### Parameters

• **letters**: [`Tiles`](../type-aliases/Tiles.md)

A mapping of letters to their counts

Example:
```
// tileSet contains 3 A's, 2 B's, and 1 C
tileSet.removeTiles({ A: 2, B: 1 });
// tileSet now contains 1 A, 1 B, and 1 C
```

#### Returns

`void`

#### Inherited from

[`TileSet`](TileSet.md).[`removeTiles`](TileSet.md#removetiles)

#### Defined in

[tiles.ts:227](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L227)

***

### setTiles()

> **setTiles**(`letters`): `void`

Set the count of each letter in the tile set

#### Parameters

• **letters**: [`Tiles`](../type-aliases/Tiles.md)

A mapping of letters to their counts

Example:
```
// tileSet contains 2 A's and 1 B
tileSet.setTiles({ A: 3, C: 2 });
// tileSet now contains 3 A's, 1 B, and 2 C's
```

#### Returns

`void`

#### Inherited from

[`TileSet`](TileSet.md).[`setTiles`](TileSet.md#settiles)

#### Defined in

[tiles.ts:245](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L245)

***

### tilesFromString()

> `static` **tilesFromString**(`tiles`): [`Tiles`](../type-aliases/Tiles.md)

#### Parameters

• **tiles**: `string`

#### Returns

[`Tiles`](../type-aliases/Tiles.md)

#### Inherited from

[`TileSet`](TileSet.md).[`tilesFromString`](TileSet.md#tilesfromstring)

#### Defined in

[tiles.ts:102](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L102)
