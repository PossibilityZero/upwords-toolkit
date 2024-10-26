import { prepareUpwordsWordList, defaultTileCounts } from './words';

describe('Wordlist Helpers', () => {
  describe('prepareUpwordsWordList', () => {
    it('should return the original list if no constraints are given', () => {
      const inputWordList = ['a', 'list', 'of', 'words'];
      const output = prepareUpwordsWordList(inputWordList, {});
      expect(output.keptWords).toEqual(expect.arrayContaining(inputWordList));
    });

    describe('minLength / maxLength', () => {
      it('should remove words that are too short', () => {
        const inputWordList = ['a', 'list', 'of', 'words'];
        const output = prepareUpwordsWordList(inputWordList, { minLength: 2 });
        expect(output.keptWords).toHaveLength(3);
        expect(output.keptWords).toEqual(expect.arrayContaining(['list', 'of', 'words']));
        expect(output.removedWords).toHaveLength(1);
        const expectedRemovedWord = { word: 'a', reason: 'too short' };
        expect(output.removedWords).toEqual(expect.arrayContaining([expectedRemovedWord]));
      });

      it('should remove words that are too long', () => {
        const inputWordList = ['a', 'list', 'of', 'longer', 'words'];
        const output = prepareUpwordsWordList(inputWordList, { minLength: 2, maxLength: 5 });
        expect(output.keptWords).toHaveLength(3);
        expect(output.keptWords).toEqual(expect.arrayContaining(['list', 'of', 'words']));
        expect(output.removedWords).toHaveLength(2);
        const expectedRemovedWord = { word: 'longer', reason: 'too long' };
        expect(output.removedWords).toEqual(expect.arrayContaining([expectedRemovedWord]));
      });
    });

    describe('joinQu', () => {
      it('should join letters that are specified', () => {
        const inputWordList = ['queen', 'quiz'];
        const output = prepareUpwordsWordList(inputWordList, { joinQu: true });
        expect(output.keptWords).toHaveLength(2);
        expect(output.keptWords).toEqual(expect.arrayContaining(['qeen', 'qiz']));
        expect(output.removedWords).toHaveLength(0);
      });

      it('should remove words that have a Q without a U', () => {
        const inputWordList = ['burqa', 'qat', 'queen'];
        const output = prepareUpwordsWordList(inputWordList, { joinQu: true });
        expect(output.keptWords).toHaveLength(1);
        expect(output.keptWords).toEqual(expect.arrayContaining(['qeen']));
        expect(output.removedWords).toHaveLength(2);
        const expectedRemovedWord1 = { word: 'burqa', reason: 'q without u' };
        const expectedRemovedWord2 = { word: 'qat', reason: 'q without u' };
        expect(output.removedWords).toEqual(
          expect.arrayContaining([expectedRemovedWord1, expectedRemovedWord2])
        );
      });

      it('should calculate word length after joining Q and U', () => {
        const inputWordList = ['queen', 'quiz'];
        const output = prepareUpwordsWordList(inputWordList, { joinQu: true, maxLength: 4 });
        expect(output.keptWords).toHaveLength(2);
        expect(output.keptWords).toEqual(expect.arrayContaining(['qeen', 'qiz']));
        expect(output.removedWords).toHaveLength(0);
      });
    });

    describe('gameTileBalance', () => {
      it('should have the default tile count', () => {
        expect(defaultTileCounts).toBeDefined();
      });

      it('should remove words that have too many of a letter', () => {
        const inputWordList = ['zipper', 'pizza'];
        const tileCounts = {
          A: 5,
          E: 5,
          I: 5,
          P: 2,
          R: 3,
          Z: 1
        };
        const output = prepareUpwordsWordList(inputWordList, {
          tileCounts
        });
        expect(output.keptWords).toHaveLength(1);
        expect(output.keptWords).toEqual(expect.arrayContaining(['zipper']));
        const expectedRemovedWord = { word: 'pizza', reason: 'tile count exceeded' };
        expect(output.removedWords).toHaveLength(1);
        expect(output.removedWords).toEqual(expect.arrayContaining([expectedRemovedWord]));
      });
    });
  });
});
