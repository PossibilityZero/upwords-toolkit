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

[board.ts:308](https://github.com/PossibilityZero/upwords-toolkit/blob/88bd741b283b4e85f6340d5666373c00631373bd/src/board.ts#L308)

## Methods

### checkPlay()

> **checkPlay**(`play`): `IMoveResult`

#### Parameters

• **play**: [`UpwordsPlay`](../type-aliases/UpwordsPlay.md)

#### Returns

`IMoveResult`

#### Defined in

[board.ts:365](https://github.com/PossibilityZero/upwords-toolkit/blob/88bd741b283b4e85f6340d5666373c00631373bd/src/board.ts#L365)

***

### getPreviousMove()

> **getPreviousMove**(`numberOfMovesBack`): `IMoveResult`

#### Parameters

• **numberOfMovesBack**: `number` = `1`

#### Returns

`IMoveResult`

#### Defined in

[board.ts:369](https://github.com/PossibilityZero/upwords-toolkit/blob/88bd741b283b4e85f6340d5666373c00631373bd/src/board.ts#L369)

***

### getUBF()

> **getUBF**(): [`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

#### Returns

[`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

#### Defined in

[board.ts:319](https://github.com/PossibilityZero/upwords-toolkit/blob/88bd741b283b4e85f6340d5666373c00631373bd/src/board.ts#L319)

***

### playTiles()

> **playTiles**(`play`, `checkOnly`): `IMoveResult`

#### Parameters

• **play**: [`UpwordsPlay`](../type-aliases/UpwordsPlay.md)

• **checkOnly**: `boolean` = `false`

#### Returns

`IMoveResult`

#### Defined in

[board.ts:347](https://github.com/PossibilityZero/upwords-toolkit/blob/88bd741b283b4e85f6340d5666373c00631373bd/src/board.ts#L347)
