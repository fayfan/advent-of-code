const fs = require('node:fs');

fs.readFile('./day-5-data.txt', 'utf8', (err, data) => {
  const dataStr = data.toString();
  const rulesAndUpdatesArr = dataStr.split(/\n\n\s*/);
  const rulesStr = rulesAndUpdatesArr[0];
  const rulesArr = rulesStr.split('\n');
  const leftColRulesArr = [];
  const rightColRulesArr = [];
  const updatesStr = rulesAndUpdatesArr[1];
  const updatesStrsArr = updatesStr.split('\n');
  const updatesArrsArr = [];
  const incorrectlyOrderedUpdatesIndicesArr = [];
  let sum1 = 0;
  let sum2 = 0;

  rulesArr.forEach(ele => {
    const numsArr = ele.split('|');
    leftColRulesArr.push(parseInt(numsArr[0]));
    rightColRulesArr.push(parseInt(numsArr[1]));
  });

  updatesStrsArr.forEach(updateStr =>
    updatesArrsArr.push(updateStr.split(','))
  );

  for (let i = 0; i < updatesArrsArr.length; i++) {
    const update = [];
    updatesArrsArr[i].forEach(ele => update.push(parseInt(ele)));

    for (let j = 0; j < update.length; j++) {
      for (let k = 0; k < leftColRulesArr.length; k++) {
        if (leftColRulesArr[k] === update[j]) {
          if (update.includes(rightColRulesArr[k])) {
            if (j > update.indexOf(rightColRulesArr[k])) {
              incorrectlyOrderedUpdatesIndicesArr.push(i);
              j = update.length;
              k = leftColRulesArr.length;
            }
          }
        } else if (rightColRulesArr[k] === update[j]) {
          if (update.includes(leftColRulesArr[k])) {
            if (j < update.indexOf(leftColRulesArr[k])) {
              incorrectlyOrderedUpdatesIndicesArr.push(i);
              j = update.length;
              k = rightColRulesArr.length;
            }
          }
        }
      }
    }
  }

  // Part 1
  for (let i = 0; i < updatesArrsArr.length; i++) {
    if (!incorrectlyOrderedUpdatesIndicesArr.includes(i)) {
      const update = [];
      updatesArrsArr[i].forEach(ele => update.push(parseInt(ele)));
      sum1 += update[(update.length - 1) / 2];
    }
  }

  console.log('Sum 1:', sum1);

  // Part 2
  for (const index of incorrectlyOrderedUpdatesIndicesArr) {
    const update = [];
    updatesArrsArr[index].forEach(ele => update.push(parseInt(ele)));

    for (let j = 0; j < update.length; j++) {
      for (let k = 0; k < leftColRulesArr.length; k++) {
        if (leftColRulesArr[k] === update[j]) {
          if (update.includes(rightColRulesArr[k])) {
            if (j > update.indexOf(rightColRulesArr[k])) {
              const splicedPage = update.splice(j, 1)[0];
              update.splice(
                update.indexOf(rightColRulesArr[k]),
                0,
                splicedPage
              );
              j = 0;
              k = 0;
            }
          }
        } else if (rightColRulesArr[k] === update[j]) {
          if (update.includes(leftColRulesArr[k])) {
            if (j < update.indexOf(leftColRulesArr[k])) {
              const splicedPage = update.splice(j, 1)[0];
              update.splice(
                update.indexOf(leftColRulesArr[k]) + 1,
                0,
                splicedPage
              );
              j = 0;
              k = 0;
            }
          }
        }
      }
    }
    sum2 += update[(update.length - 1) / 2];
  }

  console.log('Sum 2:', sum2);
});
