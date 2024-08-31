[**upwords-toolkit**](../README.md) • **Docs**

***

[upwords-toolkit](../globals.md) / UpwordsGame

# Class: UpwordsGame

## Constructors

### new UpwordsGame()

> **new UpwordsGame**(`playerCount`): [`UpwordsGame`](UpwordsGame.md)

#### Parameters

• **playerCount**: `number` = `1`

#### Returns

[`UpwordsGame`](UpwordsGame.md)

#### Defined in

[game.ts:12](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/game.ts#L12)

## Properties

### currentPlayer

> **currentPlayer**: `number`

#### Defined in

[game.ts:7](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/game.ts#L7)

***

### playerCount

> **playerCount**: `number`

#### Defined in

[game.ts:6](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/game.ts#L6)

***

### tileBag

> **tileBag**: [`TileBag`](TileBag.md)

#### Defined in

[game.ts:9](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/game.ts#L9)

## Methods

### getBoard()

> **getBoard**(): [`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

#### Returns

[`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

#### Defined in

[game.ts:32](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/game.ts#L32)

***

### getScore()

> **getScore**(`player`): `number`

#### Parameters

• **player**: `number`

#### Returns

`number`

#### Defined in

[game.ts:46](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/game.ts#L46)

***

### getTileBag()

> **getTileBag**(): [`TileBag`](TileBag.md)

#### Returns

[`TileBag`](TileBag.md)

#### Defined in

[game.ts:42](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/game.ts#L42)

***

### getTiles()

> **getTiles**(`player`): [`TileRack`](TileRack.md)

#### Parameters

• **player**: `number`

#### Returns

[`TileRack`](TileRack.md)

#### Defined in

[game.ts:37](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/game.ts#L37)

***

### playMove()

> **playMove**(`play`): `void`

#### Parameters

• **play**: [`IUpwordsPlay`](../interfaces/IUpwordsPlay.md)

#### Returns

`void`

#### Defined in

[game.ts:23](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/game.ts#L23)
