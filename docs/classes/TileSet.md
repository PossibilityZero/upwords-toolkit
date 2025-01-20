[**upwords-toolkit**](../README.md) • **Docs**

***

[upwords-toolkit](../globals.md) / TileSet

# Class: TileSet

## Extended by

- [`TileRack`](TileRack.md)
- [`TileBag`](TileBag.md)

## Constructors

### new TileSet()

> **new TileSet**(): [`TileSet`](TileSet.md)

#### Returns

[`TileSet`](TileSet.md)

#### Defined in

[tiles.ts:95](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L95)

## Properties

### tiles

> `protected` **tiles**: [`FullTiles`](../type-aliases/FullTiles.md)

#### Defined in

[tiles.ts:93](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L93)

## Accessors

### tileCount

> `get` **tileCount**(): `number`

Get the total count of tiles in the set

#### Returns

`number`

#### Defined in

[tiles.ts:113](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L113)

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

#### Defined in

[tiles.ts:191](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L191)

***

### deleteAllTiles()

> **deleteAllTiles**(): `void`

Remove all tiles from the set

#### Returns

`void`

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

#### Defined in

[tiles.ts:127](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L127)

***

### getTiles()

> **getTiles**(): [`Tiles`](../type-aliases/Tiles.md)

#### Returns

[`Tiles`](../type-aliases/Tiles.md)

#### Defined in

[tiles.ts:117](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L117)

***

### hasTiles()

> **hasTiles**(`tiles`): `boolean`

#### Parameters

• **tiles**: [`Tiles`](../type-aliases/Tiles.md)

#### Returns

`boolean`

#### Defined in

[tiles.ts:260](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L260)

***

### listLetters()

> **listLetters**(): (`"Q"` \| `"X"` \| `"S"` \| `"A"` \| `"B"` \| `"C"` \| `"D"` \| `"E"` \| `"F"` \| `"G"` \| `"H"` \| `"I"` \| `"J"` \| `"K"` \| `"L"` \| `"M"` \| `"N"` \| `"O"` \| `"P"` \| `"R"` \| `"T"` \| `"U"` \| `"V"` \| `"W"` \| `"Y"` \| `"Z"`)[]

Return a list of unique letters in the tile set

#### Returns

(`"Q"` \| `"X"` \| `"S"` \| `"A"` \| `"B"` \| `"C"` \| `"D"` \| `"E"` \| `"F"` \| `"G"` \| `"H"` \| `"I"` \| `"J"` \| `"K"` \| `"L"` \| `"M"` \| `"N"` \| `"O"` \| `"P"` \| `"R"` \| `"T"` \| `"U"` \| `"V"` \| `"W"` \| `"Y"` \| `"Z"`)[]

An array of Letters (allowed keys of FullTiles)

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

#### Defined in

[tiles.ts:245](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L245)

***

### tilesFromString()

> `static` **tilesFromString**(`tiles`): [`Tiles`](../type-aliases/Tiles.md)

#### Parameters

• **tiles**: `string`

#### Returns

[`Tiles`](../type-aliases/Tiles.md)

#### Defined in

[tiles.ts:102](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/tiles.ts#L102)
