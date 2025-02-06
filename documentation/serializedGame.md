# UpwordsGame serialized format

UpwordsGame can be serialized for storage.

## v1

In v1 we store the game state (board UBF, tileBag, current player, and each player's tiles) in a JSON object.

## v2

In v2, we store game metadata (manualTiles, playerCount) and the turn history. The turn history format will be updated to hold all information about moves played and tile state, so that when a serialized game is loaded it can be replayed from the beginning to reach the same state.

v1 and v2 are incompatible, and because the package is still pre-v1.0, backwards compatibility is ignored.

### v2 Format

A serialized game in v2 will be stored as a JSON string:

```
{
  version: 'v2.0',
  manualTiles: <boolean>,
  playerCount: <number>,
  gameHistory: (PlayRecord|SkipRecord|TileStateRecord)[],
}
```

### v2 Metadata

manualTiles: Whether the UpwordsGame should automatically draw tiles after turns
playerCount: The number of players

### v2 Game History

The game history will be stored as an array of alternating `PlayRecord` (or `SkipRecord`) and `TileStateRecord` objects.

The last object in the array will always be a `TileStateRecord`, and it will reflect the latest game state. Any tile operations (drawing, returning, reserving) are reflected by _editing_ the most recent `TileStateRecord`. In effect, each `TileStateRecord` will store the tile state immediately before the following `PlayRecord`.

#### PlayRecord

```
{
  type: 'play',
  play: UpwordsPlay | null,
  player: <number>,
  points: <number>
}
```

#### SkipRecord

```
{
  type: 'skip',
  player: <number>
}
```

#### TileStateRecord

```
{
  type: 'tileState',
  tileBag: <string>,
  reservedTiles: <string>,
  racks: [
    {
      playerId: <number>,
      tiles: <string>
    }, ...
  ]
}
```
