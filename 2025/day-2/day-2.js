const fs = require('node:fs');

fs.readFile('./day-2-data.txt', 'utf8', (err, data) => {
    const idRanges = data.toString();
    const idRangesArr = idRanges.split(',');

    const invalidIdTotaler = idRangesArr => {
        let invalidIdTotal = 0;

        for (const idRange of idRangesArr) {
            const rangeStart = +idRange.split('-')[0];
            const rangeEnd = +idRange.split('-')[1];

            for (let id = rangeStart; id <= rangeEnd; id++) {
                const idString = id.toString();
                
                // PART 1
                // if (idString.length % 2 === 0) {
                //     if (idString.slice(0, idString.length / 2) === idString.slice(idString.length / 2)) {
                //         invalidIdTotal += id;
                //     }
                // }

                // PART 2
                const invalidIdsArr = [];

                for (let i = 1; i <= idString.length / 2; i++) {
                    const idChunk = idString.slice(0, i);
                    let idChunkMatches = 1;

                    for (let j = i; j <= idString.length - i; j += i) {
                        if (idString.slice(j, j + i) === idChunk) {
                            idChunkMatches++;
                        }
                    }

                    if (idChunkMatches === idString.length / i && !invalidIdsArr.includes(id)) {
                        invalidIdTotal += id;
                        invalidIdsArr.push(id);
                    }
                }
            }
        }

        return invalidIdTotal;
    };

    console.log(invalidIdTotaler(idRangesArr));
});
