const fs = require('node:fs');

// Part 1
fs.readFile('./day-2-data.txt', 'utf8', (err, data) => {
  const dataStr = data.toString();
  const reportsArr = dataStr.split('\n');
  let safeReportCount = 0;

  for (let i = 0; i < reportsArr.length; i++) {
    const levelsStrArr = reportsArr[i].split(' ');
    const levelsArr = levelsStrArr.map(levelStr => parseInt(levelStr));
    let firstLevelIncreasing;

    for (let j = 0; j < levelsArr.length - 1; j++) {
      if (j === 0) {
        firstLevelIncreasing = levelsArr[j + 1] > levelsArr[j] ? true : false;
      }

      const thisLevelIncreasing =
        levelsArr[j + 1] > levelsArr[j] ? true : false;

      const levelsDiff = Math.abs(levelsArr[j + 1] - levelsArr[j]);

      if (
        firstLevelIncreasing !== thisLevelIncreasing ||
        levelsDiff < 1 ||
        levelsDiff > 3
      ) {
        j = levelsArr.length;
      }

      if (j === levelsArr.length - 2) {
        safeReportCount++;
      }
    }
  }

  console.log('Safe Report Count:', safeReportCount);
});

// Part 2
fs.readFile('./day-2-data.txt', 'utf8', (err, data) => {
  const dataStr = data.toString();
  const reportsArr = dataStr.split('\n');
  let updatedSafeReportCount = 0;

  for (let i = 0; i < reportsArr.length; i++) {
    const levelsStrArr = reportsArr[i].split(' ');
    let levelsArr = levelsStrArr.map(levelStr => parseInt(levelStr));
    const originalLevelsArr = levelsArr;
    let firstLevelIncreasing;
    let sliceIndex = 0;
    let j = 0;

    while (j < levelsArr.length - 1) {
      if (j === 0) {
        firstLevelIncreasing = levelsArr[j + 1] > levelsArr[j] ? true : false;
      }

      const thisLevelIncreasing =
        levelsArr[j + 1] > levelsArr[j] ? true : false;

      const levelsDiff = Math.abs(levelsArr[j + 1] - levelsArr[j]);

      if (
        firstLevelIncreasing !== thisLevelIncreasing ||
        levelsDiff < 1 ||
        levelsDiff > 3
      ) {
        if (sliceIndex < originalLevelsArr.length) {
          levelsArr = [
            ...originalLevelsArr.slice(0, sliceIndex),
            ...originalLevelsArr.slice(sliceIndex + 1),
          ];
          j = -1;
          sliceIndex++;
        } else {
          j = levelsArr.length;
        }
      }

      if (j === levelsArr.length - 2) {
        updatedSafeReportCount++;
      }

      j++;
    }
  }

  console.log('Updated Safe Report Count:', updatedSafeReportCount);
});
