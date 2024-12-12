const fs = require('node:fs');

fs.readFile('./day-3-data.txt', 'utf8', (err, data) => {
  const dataStr = data.toString();
  const regexp1 = /mul\(\d+,\d+\)/g;

  // Part 1
  const multiArrComplete1 = [...dataStr.matchAll(regexp1)];
  const multiArr1 = [];
  let sum1 = 0;

  multiArrComplete1.forEach(ele => multiArr1.push(ele[0]));

  multiArr1.forEach(ele => {
    const splitEle = ele.split(',');
    const num1 = parseInt(splitEle[0].slice(4));
    const num2 = parseInt(splitEle[1].slice(0, splitEle[1].length - 1));
    sum1 += num1 * num2;
  });

  console.log('Sum 1:', sum1);

  // Part 2
  const regexp2 = /(mul\(\d+,\d+\))|(do\(\))|(don\'t\(\))/g;
  const multiArrComplete2 = [...dataStr.matchAll(regexp2)];
  const multiArr2 = [];
  let sum2 = 0;
  let includeInCount = true;

  multiArrComplete2.forEach(ele => multiArr2.push(ele[0]));

  for (let i = 0; i < multiArr2.length; i++) {
    if (includeInCount) {
      if (multiArr2[i].match(/mul\(\d+,\d+\)/g)) {
        const splitEle = multiArr2[i].split(',');
        const num1 = parseInt(splitEle[0].slice(4));
        const num2 = parseInt(splitEle[1].slice(0, splitEle[1].length - 1));
        sum2 += num1 * num2;
      }
    }

    if (multiArr2[i].match(/do\(\)/g)) {
      includeInCount = true;
    } else if (multiArr2[i].match(/don\'t\(\)/g)) {
      includeInCount = false;
    }
  }

  console.log('Sum 2:', sum2);
});
