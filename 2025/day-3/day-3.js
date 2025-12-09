const fs = require('node:fs');

fs.readFile('./day-3-data.txt', 'utf8', (err, data) => {
    const banks = data.toString();
    const banksArr = banks.split('\n');

    const joltagesFinder = (banksArr, joltageLength) => {
        const finalJoltages = [];

        for (const bank of banksArr) {
            let joltagesArr = bank.split('');
            const finalJoltage = [joltagesArr[0]];
            const joltageIndices = [0];
            let currJoltageIndex = 0;

            while (currJoltageIndex < joltageLength) {
                for (let i = joltageIndices[currJoltageIndex]; i < joltagesArr.length - joltageLength + joltageIndices.length; i++) {
                        if (finalJoltage[currJoltageIndex] < joltagesArr[i]) {
                            finalJoltage[currJoltageIndex] = joltagesArr[i];
                            joltageIndices[currJoltageIndex] = i;
                        };
                }

                if (currJoltageIndex < joltageLength - 1) {
                    finalJoltage.push('1');
                    joltageIndices.push(joltageIndices[currJoltageIndex] + 1);
                }

                currJoltageIndex++;
            }

            finalJoltages.push(finalJoltage.join(''));
        }

        const joltagesSum = finalJoltages.reduce((acc, curr) => +acc + +curr);
        return joltagesSum;
    };

    console.log(joltagesFinder(banksArr, 12));
});
