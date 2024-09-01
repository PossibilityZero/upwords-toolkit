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

[tiles.ts:66](https://github.com/PossibilityZero/upwords-toolkit/blob/c6c9d661206a414e2b4431125278dd2fd913bcc5/src/tiles.ts#L66)

## Properties

### tiles

> `protected` **tiles**: [`FullTiles`](../type-aliases/FullTiles.md)

#### Defined in

[tiles.ts:64](https://github.com/PossibilityZero/upwords-toolkit/blob/c6c9d661206a414e2b4431125278dd2fd913bcc5/src/tiles.ts#L64)

## Accessors

### tileCount

> `get` **tileCount**(): `number`

#### Returns

`number`

#### Defined in

[tiles.ts:73](https://github.com/PossibilityZero/upwords-toolkit/blob/c6c9d661206a414e2b4431125278dd2fd913bcc5/src/tiles.ts#L73)

## Methods

### addTile()

> **addTile**(`letter`, `count`): `void`

#### Parameters

• **letter**: `"X"` \| `"S"` \| `"A"` \| `"B"` \| `"C"` \| `"D"` \| `"E"` \| `"F"` \| `"G"` \| `"H"` \| `"I"` \| `"J"` \| `"K"` \| `"L"` \| `"M"` \| `"N"` \| `"O"` \| `"P"` \| `"Q"` \| `"R"` \| `"T"` \| `"U"` \| `"V"` \| `"W"` \| `"Y"` \| `"Z"`

• **count**: `number`

#### Returns

`void`

#### Defined in

[tiles.ts:87](https://github.com/PossibilityZero/upwords-toolkit/blob/c6c9d661206a414e2b4431125278dd2fd913bcc5/src/tiles.ts#L87)

***

### addTiles()

> **addTiles**(`letters`): `void`

#### Parameters

• **letters**: [`Tiles`](../type-aliases/Tiles.md)

#### Returns

`void`

#### Defined in

[tiles.ts:91](https://github.com/PossibilityZero/upwords-toolkit/blob/c6c9d661206a414e2b4431125278dd2fd913bcc5/src/tiles.ts#L91)

***

### deleteAllTiles()

> **deleteAllTiles**(): `void`

#### Returns

`void`

#### Defined in

[tiles.ts:114](https://github.com/PossibilityZero/upwords-toolkit/blob/c6c9d661206a414e2b4431125278dd2fd913bcc5/src/tiles.ts#L114)

***

### getLetter()

> **getLetter**(`letter`): `number`

#### Parameters

• **letter**: `"X"` \| `"S"` \| `"A"` \| `"B"` \| `"C"` \| `"D"` \| `"E"` \| `"F"` \| `"G"` \| `"H"` \| `"I"` \| `"J"` \| `"K"` \| `"L"` \| `"M"` \| `"N"` \| `"O"` \| `"P"` \| `"Q"` \| `"R"` \| `"T"` \| `"U"` \| `"V"` \| `"W"` \| `"Y"` \| `"Z"`

#### Returns

`number`

#### Defined in

[tiles.ts:77](https://github.com/PossibilityZero/upwords-toolkit/blob/c6c9d661206a414e2b4431125278dd2fd913bcc5/src/tiles.ts#L77)

***

### listLetters()

> **listLetters**(): (`"X"` \| `"S"` \| `"A"` \| `"B"` \| `"C"` \| `"D"` \| `"E"` \| `"F"` \| `"G"` \| `"H"` \| `"I"` \| `"J"` \| `"K"` \| `"L"` \| `"M"` \| `"N"` \| `"O"` \| `"P"` \| `"Q"` \| `"R"` \| `"T"` \| `"U"` \| `"V"` \| `"W"` \| `"Y"` \| `"Z"`)[]

#### Returns

(`"X"` \| `"S"` \| `"A"` \| `"B"` \| `"C"` \| `"D"` \| `"E"` \| `"F"` \| `"G"` \| `"H"` \| `"I"` \| `"J"` \| `"K"` \| `"L"` \| `"M"` \| `"N"` \| `"O"` \| `"P"` \| `"Q"` \| `"R"` \| `"T"` \| `"U"` \| `"V"` \| `"W"` \| `"Y"` \| `"Z"`)[]

#### Defined in

[tiles.ts:81](https://github.com/PossibilityZero/upwords-toolkit/blob/c6c9d661206a414e2b4431125278dd2fd913bcc5/src/tiles.ts#L81)

***

### removeTile()

> **removeTile**(`letter`, `count`): [`Tiles`](../type-aliases/Tiles.md)

#### Parameters

• **letter**: `"X"` \| `"S"` \| `"A"` \| `"B"` \| `"C"` \| `"D"` \| `"E"` \| `"F"` \| `"G"` \| `"H"` \| `"I"` \| `"J"` \| `"K"` \| `"L"` \| `"M"` \| `"N"` \| `"O"` \| `"P"` \| `"Q"` \| `"R"` \| `"T"` \| `"U"` \| `"V"` \| `"W"` \| `"Y"` \| `"Z"`

• **count**: `number`

#### Returns

[`Tiles`](../type-aliases/Tiles.md)

#### Defined in

[tiles.ts:97](https://github.com/PossibilityZero/upwords-toolkit/blob/c6c9d661206a414e2b4431125278dd2fd913bcc5/src/tiles.ts#L97)

***

### removeTiles()

> **removeTiles**(`letters`): `void`

#### Parameters

• **letters**: [`Tiles`](../type-aliases/Tiles.md)

#### Returns

`void`

#### Defined in

[tiles.ts:102](https://github.com/PossibilityZero/upwords-toolkit/blob/c6c9d661206a414e2b4431125278dd2fd913bcc5/src/tiles.ts#L102)

***

### setTiles()

> **setTiles**(`letters`): `void`

#### Parameters

• **letters**: [`Tiles`](../type-aliases/Tiles.md)

#### Returns

`void`

#### Defined in

[tiles.ts:108](https://github.com/PossibilityZero/upwords-toolkit/blob/c6c9d661206a414e2b4431125278dd2fd913bcc5/src/tiles.ts#L108)
