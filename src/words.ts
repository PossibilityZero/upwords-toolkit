import { defaultTileCounts } from './tiles.js';
type Options = {
  minLength?: number;
  maxLength?: number;
  joinQu?: boolean;
  tileCounts?: { [key: string]: number };
};

type RemovedWord = {
  word: string;
  reason: string;
};

const defaultWordFilterOptions: Options = {
  minLength: 2,
  maxLength: 10,
  joinQu: true,
  tileCounts: defaultTileCounts
};

function prepareUpwordsWordList(
  inputWords: string[],
  options: Options
): { keptWords: string[]; removedWords: RemovedWord[] } {
  const keptWords: string[] = [];
  const removedWords: RemovedWord[] = [];
  inputWords.forEach((word) => {
    let include = true;
    let removeReason = '';
    if (options.joinQu && word.includes('q')) {
      if (word.includes('qu')) {
        word = word.replace('qu', 'q');
      } else {
        include = false;
        removeReason = 'q without u';
      }
    }
    if (options.minLength && word.length < options.minLength) {
      include = false;
      removeReason = 'too short';
    }
    if (options.maxLength && word.length > options.maxLength) {
      include = false;
      removeReason = 'too long';
    }
    if (options.tileCounts) {
      include = include && compareWordTileCount(word, options.tileCounts);
      if (!include) {
        removeReason = 'tile count exceeded';
      }
    }

    if (include) {
      keptWords.push(word);
    } else {
      removedWords.push({ word, reason: removeReason });
    }
  });
  return { keptWords, removedWords };
}

function compareWordTileCount(word: string, tileCounts: { [key: string]: number }): boolean {
  const wordLetters = new Map();
  word
    .split('')
    .map((l) => l.toUpperCase())
    .forEach((letter) => {
      wordLetters.set(letter, (wordLetters.get(letter) || 0) + 1);
    });
  let include = true;
  wordLetters.forEach((count, letter) => {
    const tileCount = tileCounts[letter] || 0;
    if (count > tileCount) {
      include = false;
    }
  });
  return include;
}

export { prepareUpwordsWordList, defaultTileCounts, defaultWordFilterOptions };
