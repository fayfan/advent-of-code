const fs = require('node:fs');

fs.readFile('./day-1-data.txt', 'utf8', (err, data) => {
    const rotations = data.toString();
    const rotationsArr = rotations.split('\n');
    

    const zeroCounter = rotationsArr => {
        let position = 50;
        let zeroCount = 0;

        // PART 1
        // for (let i = 0; i < rotationsArr.length; i++) {
        //     const rotationDirection = rotationsArr[i][0];
        //     const rotation = parseInt(rotationsArr[i].slice(1));

        //     rotationDirection === 'R'
        //         ? position = (position + rotation) % 100
        //         : position = (((position - rotation) % 100) + 100) % 100;

        //     if (position === 0) zeroCount++;
        // }

        // PART 2
        for (let i = 0; i < rotationsArr.length; i++) {
            const rotationDirection = rotationsArr[i][0];
            const rotation = parseInt(rotationsArr[i].slice(1));

            if (rotationDirection === 'R') {
                position += rotation;
                while (position > 99) {
                    zeroCount++;
                    position -= 100;
                }
            } else if (rotationDirection === 'L') {
                if (position === 0) position += 100;
                position -= rotation;
                if (position % 100 === 0) zeroCount++;
                while (position < 0) {
                    zeroCount++;
                    position += 100;
                }
            }
        }

        return zeroCount;
    };

    console.log(zeroCounter(rotationsArr));
});
