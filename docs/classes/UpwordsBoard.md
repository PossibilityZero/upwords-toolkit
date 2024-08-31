[**upwords-toolkit**](../README.md) • **Docs**

***

[upwords-toolkit](../globals.md) / UpwordsBoard

# Class: UpwordsBoard

## Constructors

### new UpwordsBoard()

> **new UpwordsBoard**(`wordList`, `initialUBF`?): [`UpwordsBoard`](UpwordsBoard.md)

#### Parameters

• **wordList**: `string`[]

• **initialUBF?**: [`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

#### Returns

[`UpwordsBoard`](UpwordsBoard.md)

#### Defined in

[board.ts:306](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/board.ts#L306)

## Methods

### checkPlay()

> **checkPlay**(`play`): `IMoveResult`

#### Parameters

• **play**: [`IUpwordsPlay`](../interfaces/IUpwordsPlay.md)

#### Returns

`IMoveResult`

#### Defined in

[board.ts:363](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/board.ts#L363)

***

### getPreviousMove()

> **getPreviousMove**(`numberOfMovesBack`): `IMoveResult`

#### Parameters

• **numberOfMovesBack**: `number` = `1`

#### Returns

`IMoveResult`

#### Defined in

[board.ts:367](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/board.ts#L367)

***

### getUBF()

> **getUBF**(): [`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

#### Returns

[`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

#### Defined in

[board.ts:317](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/board.ts#L317)

***

### playTiles()

> **playTiles**(`play`, `checkOnly`): `IMoveResult`

#### Parameters

• **play**: [`IUpwordsPlay`](../interfaces/IUpwordsPlay.md)

• **checkOnly**: `boolean` = `false`

#### Returns

`IMoveResult`

#### Defined in

[board.ts:345](https://github.com/PossibilityZero/upwords-toolkit/blob/2744cc267ac0331cbdb84fe8b6ecb1e227425c44/src/board.ts#L345)
