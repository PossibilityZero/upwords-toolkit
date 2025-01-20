[**upwords-toolkit**](../README.md) • **Docs**

***

[upwords-toolkit](../globals.md) / UpwordsGame

# Class: UpwordsGame

## Constructors

### new UpwordsGame()

> **new UpwordsGame**(`wordList`, `playerCount`, `manualTiles`): [`UpwordsGame`](UpwordsGame.md)

#### Parameters

• **wordList**: `string`[]

• **playerCount**: `number` = `1`

• **manualTiles**: `boolean` = `false`

#### Returns

[`UpwordsGame`](UpwordsGame.md)

#### Defined in

[game.ts:18](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/game.ts#L18)

## Properties

### currentPlayer

> **currentPlayer**: `number`

#### Defined in

[game.ts:11](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/game.ts#L11)

***

### playerCount

> **playerCount**: `number`

#### Defined in

[game.ts:10](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/game.ts#L10)

***

### tileBag

> **tileBag**: [`TileBag`](TileBag.md)

#### Defined in

[game.ts:15](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/game.ts#L15)

## Methods

### checkMove()

> **checkMove**(`play`, `boardStateOnly`): `IMoveResult`

#### Parameters

• **play**: [`UpwordsPlay`](../type-aliases/UpwordsPlay.md)

• **boardStateOnly**: `boolean` = `false`

#### Returns

`IMoveResult`

#### Defined in

[game.ts:66](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/game.ts#L66)

***

### drawSpecificTiles()

> **drawSpecificTiles**(`playerId`, `tiles`): `boolean`

#### Parameters

• **playerId**: `number`

• **tiles**: `string`

#### Returns

`boolean`

#### Defined in

[game.ts:78](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/game.ts#L78)

***

### getBoard()

> **getBoard**(): [`UpwordsBoard`](UpwordsBoard.md)

#### Returns

[`UpwordsBoard`](UpwordsBoard.md)

#### Defined in

[game.ts:125](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/game.ts#L125)

***

### getScore()

> **getScore**(`player`): `number`

#### Parameters

• **player**: `number`

#### Returns

`number`

#### Defined in

[game.ts:140](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/game.ts#L140)

***

### getTileBag()

> **getTileBag**(): [`TileBag`](TileBag.md)

#### Returns

[`TileBag`](TileBag.md)

#### Defined in

[game.ts:136](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/game.ts#L136)

***

### getTiles()

> **getTiles**(`player`): [`TileRack`](TileRack.md)

#### Parameters

• **player**: `number`

#### Returns

[`TileRack`](TileRack.md)

#### Defined in

[game.ts:131](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/game.ts#L131)

***

### getUBF()

> **getUBF**(): [`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

#### Returns

[`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

#### Defined in

[game.ts:120](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/game.ts#L120)

***

### isFinished()

> **isFinished**(): `boolean`

#### Returns

`boolean`

#### Defined in

[game.ts:34](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/game.ts#L34)

***

### playMove()

> **playMove**(`play`): `void`

#### Parameters

• **play**: [`UpwordsPlay`](../type-aliases/UpwordsPlay.md)

#### Returns

`void`

#### Defined in

[game.ts:40](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/game.ts#L40)

***

### returnSpecificTiles()

> **returnSpecificTiles**(`playerId`, `tiles`): `boolean`

#### Parameters

• **playerId**: `number`

• **tiles**: `string`

#### Returns

`boolean`

#### Defined in

[game.ts:94](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/game.ts#L94)

***

### skipTurn()

> **skipTurn**(): `void`

#### Returns

`void`

#### Defined in

[game.ts:62](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/game.ts#L62)
