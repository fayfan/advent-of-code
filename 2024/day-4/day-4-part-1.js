const fs = require('node:fs');

fs.readFile('./day-4-example.txt', 'utf8', (err, data) => {
  const dataStr = data.toString();
  const wordSearch = dataStr.split('\n');
  let xmasCount = 0;

  const horizontalLettersChecker = (iIndex, jIndex, xmasIndex) => {
    if (jIndex > -1 && jIndex < wordSearch[0].length) {
      if (wordSearch[iIndex][jIndex] === 'XMAS'[xmasIndex]) {
        xmasIndex++;
        if (xmasIndex === 4) {
          xmasCount++;
          return false;
        }
        return xmasIndex;
      } else {
        return false;
      }
    }
  };

  const verticalLettersChecker = (iIndex, jIndex, xmasIndex) => {
    if (iIndex > -1 && iIndex < wordSearch.length) {
      if (wordSearch[iIndex][jIndex] === 'XMAS'[xmasIndex]) {
        xmasIndex++;
        if (xmasIndex === 4) {
          xmasCount++;
          return false;
        }
        return xmasIndex;
      } else {
        return false;
      }
    }
  };

  const diagonalLettersChecker = (iIndex, jIndex, xmasIndex) => {
    if (
      iIndex > -1 &&
      iIndex < wordSearch.length &&
      jIndex > -1 &&
      jIndex < wordSearch[0].length
    ) {
      if (wordSearch[iIndex][jIndex] === 'XMAS'[xmasIndex]) {
        xmasIndex++;
        if (xmasIndex === 4) {
          xmasCount++;
          return false;
        }
        return xmasIndex;
      } else {
        return false;
      }
    }
  };

  const leftLettersChecker = (iIndex, jIndex, xmasIndex) => {
    jIndex--;
    const horizontalLetterResult = horizontalLettersChecker(
      iIndex,
      jIndex,
      xmasIndex
    );
    if (horizontalLetterResult) {
      leftLettersChecker(iIndex, jIndex, horizontalLetterResult);
    }
  };

  const rightLettersChecker = (iIndex, jIndex, xmasIndex) => {
    jIndex++;
    const horizontalLetterResult = horizontalLettersChecker(
      iIndex,
      jIndex,
      xmasIndex
    );
    if (horizontalLetterResult) {
      rightLettersChecker(iIndex, jIndex, horizontalLetterResult);
    }
  };

  const topLettersChecker = (iIndex, jIndex, xmasIndex) => {
    iIndex--;
    const verticalLetterResult = verticalLettersChecker(
      iIndex,
      jIndex,
      xmasIndex
    );
    if (verticalLetterResult) {
      topLettersChecker(iIndex, jIndex, verticalLetterResult);
    }
  };

  const bottomLettersChecker = (iIndex, jIndex, xmasIndex) => {
    iIndex++;
    const verticalLetterResult = verticalLettersChecker(
      iIndex,
      jIndex,
      xmasIndex
    );
    if (verticalLetterResult) {
      bottomLettersChecker(iIndex, jIndex, verticalLetterResult);
    }
  };

  const topLeftLettersChecker = (iIndex, jIndex, xmasIndex) => {
    iIndex--;
    jIndex--;
    const diagonalLetterResult = diagonalLettersChecker(
      iIndex,
      jIndex,
      xmasIndex
    );
    if (diagonalLetterResult) {
      topLeftLettersChecker(iIndex, jIndex, diagonalLetterResult);
    }
  };

  const topRightLettersChecker = (iIndex, jIndex, xmasIndex) => {
    iIndex--;
    jIndex++;
    const diagonalLetterResult = diagonalLettersChecker(
      iIndex,
      jIndex,
      xmasIndex
    );
    if (diagonalLetterResult) {
      topRightLettersChecker(iIndex, jIndex, diagonalLetterResult);
    }
  };

  const bottomLeftLettersChecker = (iIndex, jIndex, xmasIndex) => {
    iIndex++;
    jIndex--;
    const diagonalLetterResult = diagonalLettersChecker(
      iIndex,
      jIndex,
      xmasIndex
    );
    if (diagonalLetterResult) {
      bottomLeftLettersChecker(iIndex, jIndex, diagonalLetterResult);
    }
  };

  const bottomRightLettersChecker = (iIndex, jIndex, xmasIndex) => {
    iIndex++;
    jIndex++;
    const diagonalLetterResult = diagonalLettersChecker(
      iIndex,
      jIndex,
      xmasIndex
    );
    if (diagonalLetterResult) {
      bottomRightLettersChecker(iIndex, jIndex, diagonalLetterResult);
    }
  };

  for (let i = 0; i < wordSearch.length; i++) {
    for (let j = 0; j < wordSearch[0].length; j++) {
      if (wordSearch[i][j] === 'X') {
        leftLettersChecker(i, j, 1);
        rightLettersChecker(i, j, 1);
        topLettersChecker(i, j, 1);
        bottomLettersChecker(i, j, 1);
        topLeftLettersChecker(i, j, 1);
        topRightLettersChecker(i, j, 1);
        bottomLeftLettersChecker(i, j, 1);
        bottomRightLettersChecker(i, j, 1);
      }
    }
  }

  console.log('XMAS Count:', xmasCount);
});
