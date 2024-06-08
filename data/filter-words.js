import fs from 'fs';

// Read the file
fs.readFile('./twl06.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const letterCount = {
    A: 7,
    B: 3,
    C: 4,
    D: 5,
    E: 8,
    F: 3,
    G: 3,
    H: 3,
    I: 7,
    J: 1,
    K: 2,
    L: 5,
    M: 5,
    N: 5,
    O: 7,
    P: 3,
    Q: 1,
    R: 5,
    S: 6,
    T: 5,
    U: 5,
    V: 1,
    W: 2,
    X: 1,
    Y: 2,
    Z: 1
  };

  // Split the file content into an array of words
  const words = data.split('\n');

  // Filter the words based on your condition
  const filteredWords = words.filter((word) => {
    let include = true;
    let reason = 0;
    if (word.length > 10) {
      reason = 'Too long';
      include = false;
    } else if (word.search(/q[^u]/) >= 0) {
      reason = 'Q without U';
      include = false;
    } else {
      const wordLetters = word.split('');
      for (let i = 0; i < wordLetters.length; i++) {
        const letter = wordLetters[i].toUpperCase();
        if (
          letterCount[letter] &&
          wordLetters.filter((l) => l.toUpperCase() === letter).length > letterCount[letter]
        ) {
          include = false;
          reason = 'Character balance';
          break;
        }
      }
    }
    if (!include) {
      console.log(`${reason}: ${word}`);
    }
    return include;
  });

  // Write the filtered words to a new file
  fs.writeFile('./dictionary-filtered.txt', filteredWords.join('\n'), 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Filtered words have been written to dictionary-filtered.txt');
  });
});
