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

[tiles.ts:124](https://github.com/PossibilityZero/upwords-toolkit/blob/88bd741b283b4e85f6340d5666373c00631373bd/src/tiles.ts#L124)

## Properties

### tiles

> `protected` **tiles**: [`FullTiles`](../type-aliases/FullTiles.md)

#### Inherited from

[`TileSet`](TileSet.md).[`tiles`](TileSet.md#tiles)

#### Defined in

[tiles.ts:64](https://github.com/PossibilityZero/upwords-toolkit/blob/88bd741b283b4e85f6340d5666373c00631373bd/src/tiles.ts#L64)

## Accessors

### tileCount

> `get` **tileCount**(): `number`

#### Returns

`number`

#### Inherited from

[`TileSet`](TileSet.md).[`tileCount`](TileSet.md#tilecount)

#### Defined in

[tiles.ts:73](https://github.com/PossibilityZero/upwords-toolkit/blob/88bd741b283b4e85f6340d5666373c00631373bd/src/tiles.ts#L73)

***

### tileCountTarget

> `get` **tileCountTarget**(): `number`

#### Returns

`number`

#### Defined in

[tiles.ts:129](https://github.com/PossibilityZero/upwords-toolkit/blob/88bd741b283b4e85f6340d5666373c00631373bd/src/tiles.ts#L129)

## Methods

### addTile()

> **addTile**(`letter`, `count`): `void`

#### Parameters

• **letter**: `"X"` \| `"S"` \| `"A"` \| `"B"` \| `"C"` \| `"D"` \| `"E"` \| `"F"` \| `"G"` \| `"H"` \| `"I"` \| `"J"` \| `"K"` \| `"L"` \| `"M"` \| `"N"` \| `"O"` \| `"P"` \| `"Q"` \| `"R"` \| `"T"` \| `"U"` \| `"V"` \| `"W"` \| `"Y"` \| `"Z"`

• **count**: `number`

#### Returns

`void`

#### Inherited from

[`TileSet`](TileSet.md).[`addTile`](TileSet.md#addtile)

#### Defined in

[tiles.ts:87](https://github.com/PossibilityZero/upwords-toolkit/blob/88bd741b283b4e85f6340d5666373c00631373bd/src/tiles.ts#L87)

***

### addTiles()

> **addTiles**(`letters`): `void`

#### Parameters

• **letters**: [`Tiles`](../type-aliases/Tiles.md)

#### Returns

`void`

#### Inherited from

[`TileSet`](TileSet.md).[`addTiles`](TileSet.md#addtiles)

#### Defined in

[tiles.ts:91](https://github.com/PossibilityZero/upwords-toolkit/blob/88bd741b283b4e85f6340d5666373c00631373bd/src/tiles.ts#L91)

***

### copyToNewRack()

> **copyToNewRack**(): [`TileRack`](TileRack.md)

#### Returns

[`TileRack`](TileRack.md)

#### Defined in

[tiles.ts:137](https://github.com/PossibilityZero/upwords-toolkit/blob/88bd741b283b4e85f6340d5666373c00631373bd/src/tiles.ts#L137)

***

### deleteAllTiles()

> **deleteAllTiles**(): `void`

#### Returns

`void`

#### Inherited from

[`TileSet`](TileSet.md).[`deleteAllTiles`](TileSet.md#deletealltiles)

#### Defined in

[tiles.ts:114](https://github.com/PossibilityZero/upwords-toolkit/blob/88bd741b283b4e85f6340d5666373c00631373bd/src/tiles.ts#L114)

***

### getLetter()

> **getLetter**(`letter`): `number`

#### Parameters

• **letter**: `"X"` \| `"S"` \| `"A"` \| `"B"` \| `"C"` \| `"D"` \| `"E"` \| `"F"` \| `"G"` \| `"H"` \| `"I"` \| `"J"` \| `"K"` \| `"L"` \| `"M"` \| `"N"` \| `"O"` \| `"P"` \| `"Q"` \| `"R"` \| `"T"` \| `"U"` \| `"V"` \| `"W"` \| `"Y"` \| `"Z"`

#### Returns

`number`

#### Inherited from

[`TileSet`](TileSet.md).[`getLetter`](TileSet.md#getletter)

#### Defined in

[tiles.ts:77](https://github.com/PossibilityZero/upwords-toolkit/blob/88bd741b283b4e85f6340d5666373c00631373bd/src/tiles.ts#L77)

***

### getMissingTiles()

> **getMissingTiles**(): `number`

#### Returns

`number`

#### Defined in

[tiles.ts:133](https://github.com/PossibilityZero/upwords-toolkit/blob/88bd741b283b4e85f6340d5666373c00631373bd/src/tiles.ts#L133)

***

### listLetters()

> **listLetters**(): (`"X"` \| `"S"` \| `"A"` \| `"B"` \| `"C"` \| `"D"` \| `"E"` \| `"F"` \| `"G"` \| `"H"` \| `"I"` \| `"J"` \| `"K"` \| `"L"` \| `"M"` \| `"N"` \| `"O"` \| `"P"` \| `"Q"` \| `"R"` \| `"T"` \| `"U"` \| `"V"` \| `"W"` \| `"Y"` \| `"Z"`)[]

#### Returns

(`"X"` \| `"S"` \| `"A"` \| `"B"` \| `"C"` \| `"D"` \| `"E"` \| `"F"` \| `"G"` \| `"H"` \| `"I"` \| `"J"` \| `"K"` \| `"L"` \| `"M"` \| `"N"` \| `"O"` \| `"P"` \| `"Q"` \| `"R"` \| `"T"` \| `"U"` \| `"V"` \| `"W"` \| `"Y"` \| `"Z"`)[]

#### Inherited from

[`TileSet`](TileSet.md).[`listLetters`](TileSet.md#listletters)

#### Defined in

[tiles.ts:81](https://github.com/PossibilityZero/upwords-toolkit/blob/88bd741b283b4e85f6340d5666373c00631373bd/src/tiles.ts#L81)

***

### removeTile()

> **removeTile**(`letter`, `count`): [`Tiles`](../type-aliases/Tiles.md)

#### Parameters

• **letter**: `"X"` \| `"S"` \| `"A"` \| `"B"` \| `"C"` \| `"D"` \| `"E"` \| `"F"` \| `"G"` \| `"H"` \| `"I"` \| `"J"` \| `"K"` \| `"L"` \| `"M"` \| `"N"` \| `"O"` \| `"P"` \| `"Q"` \| `"R"` \| `"T"` \| `"U"` \| `"V"` \| `"W"` \| `"Y"` \| `"Z"`

• **count**: `number`

#### Returns

[`Tiles`](../type-aliases/Tiles.md)

#### Inherited from

[`TileSet`](TileSet.md).[`removeTile`](TileSet.md#removetile)

#### Defined in

[tiles.ts:97](https://github.com/PossibilityZero/upwords-toolkit/blob/88bd741b283b4e85f6340d5666373c00631373bd/src/tiles.ts#L97)

***

### removeTiles()

> **removeTiles**(`letters`): `void`

#### Parameters

• **letters**: [`Tiles`](../type-aliases/Tiles.md)

#### Returns

`void`

#### Inherited from

[`TileSet`](TileSet.md).[`removeTiles`](TileSet.md#removetiles)

#### Defined in

[tiles.ts:102](https://github.com/PossibilityZero/upwords-toolkit/blob/88bd741b283b4e85f6340d5666373c00631373bd/src/tiles.ts#L102)

***

### setTiles()

> **setTiles**(`letters`): `void`

#### Parameters

• **letters**: [`Tiles`](../type-aliases/Tiles.md)

#### Returns

`void`

#### Inherited from

[`TileSet`](TileSet.md).[`setTiles`](TileSet.md#settiles)

#### Defined in

[tiles.ts:108](https://github.com/PossibilityZero/upwords-toolkit/blob/88bd741b283b4e85f6340d5666373c00631373bd/src/tiles.ts#L108)
