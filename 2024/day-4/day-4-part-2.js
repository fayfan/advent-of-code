const fs = require('node:fs');

fs.readFile('./day-4-data.txt', 'utf8', (err, data) => {
  const dataStr = data.toString();
  const wordSearch = dataStr.split('\n');
  let xmasCount = 0;

  const rightLettersChecker = (iIndex, jIndex, mOrS) => {
    if (mOrS === 'M') {
      return wordSearch[iIndex][jIndex + 2] === 'S';
    } else if (mOrS === 'S') {
      return wordSearch[iIndex][jIndex + 2] === 'M';
    }
    return false;
  };

  const bottomLettersChecker = (iIndex, jIndex, mOrS) => {
    if (mOrS === 'M') {
      return wordSearch[iIndex + 2][jIndex] === 'S';
    } else if (mOrS === 'S') {
      return wordSearch[iIndex + 2][jIndex] === 'M';
    }
    return false;
  };

  const bottomRightLettersChecker = (iIndex, jIndex, mOrS) => {
    if (wordSearch[iIndex + 1][jIndex + 1] === 'A') {
      if (mOrS === 'M') {
        return wordSearch[iIndex + 2][jIndex + 2] === 'S';
      } else if (mOrS === 'S') {
        return wordSearch[iIndex + 2][jIndex + 2] === 'M';
      }
    }

    return false;
  };

  for (let i = 0; i < wordSearch.length; i++) {
    for (let j = 0; j < wordSearch[0].length; j++) {
      if (
        i + 2 < wordSearch.length &&
        j + 2 < wordSearch[0].length &&
        (wordSearch[i][j] === 'M' || wordSearch[i][j] === 'S')
      ) {
        rightLettersChecker(i, j, wordSearch[i + 2][j]) &&
        bottomLettersChecker(i, j, wordSearch[i][j + 2]) &&
        bottomRightLettersChecker(i, j, wordSearch[i][j])
          ? xmasCount++
          : {};
      }
    }
  }

  console.log('X-MAS Count:', xmasCount);
});
