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

[board.ts:315](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/board.ts#L315)

## Methods

### checkPlay()

> **checkPlay**(`play`): `IMoveResult`

#### Parameters

• **play**: [`UpwordsPlay`](../type-aliases/UpwordsPlay.md)

#### Returns

`IMoveResult`

#### Defined in

[board.ts:380](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/board.ts#L380)

***

### getPreviousMove()

> **getPreviousMove**(`numberOfMovesBack`): `IMoveResult`

#### Parameters

• **numberOfMovesBack**: `number` = `1`

#### Returns

`IMoveResult`

#### Defined in

[board.ts:384](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/board.ts#L384)

***

### getUBF()

> **getUBF**(): [`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

#### Returns

[`IUpwordsBoardFormat`](../type-aliases/IUpwordsBoardFormat.md)

#### Defined in

[board.ts:325](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/board.ts#L325)

***

### playTiles()

> **playTiles**(`play`, `checkOnly`): `IMoveResult`

#### Parameters

• **play**: [`UpwordsPlay`](../type-aliases/UpwordsPlay.md)

• **checkOnly**: `boolean` = `false`

#### Returns

`IMoveResult`

#### Defined in

[board.ts:362](https://github.com/PossibilityZero/upwords-toolkit/blob/9fee09184064801be12a1db27ac8db805f22d623/src/board.ts#L362)
