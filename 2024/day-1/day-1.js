const fs = require('node:fs');

fs.readFile('./day-1-data.txt', 'utf8', (err, data) => {
  const locationIdsStr = data.toString();
  const locationIdsArr = locationIdsStr.split('\n');
  const leftLocationIdsArr = [];
  const rightLocationIdsArr = [];
  const distancesArr = [];

  locationIdsArr.forEach(locationIds => {
    const locationIdPairsArr = locationIds.split('   ');
    leftLocationIdsArr.push(locationIdPairsArr[0]);
    rightLocationIdsArr.push(locationIdPairsArr[1]);
  });

  // Part 1
  leftLocationIdsArr.sort();
  rightLocationIdsArr.sort();

  for (let i = 0; i < leftLocationIdsArr.length; i++) {
    distancesArr.push(Math.abs(rightLocationIdsArr[i] - leftLocationIdsArr[i]));
  }

  const totalDistance = distancesArr.reduce((acc, curr) => acc + curr, 0);

  console.log('Total Distance:', totalDistance);

  // Part 2
  const locationIdCountsArr = [];

  leftLocationIdsArr.forEach(leftLocationId => {
    const locationIdCount = rightLocationIdsArr.filter(
      rightLocationId => rightLocationId === leftLocationId
    ).length;
    locationIdCountsArr.push(locationIdCount);
  });

  const similarityScore = locationIdCountsArr.reduce(
    (acc, curr, index) => acc + curr * leftLocationIdsArr[index],
    0
  );

  console.log('Similarity Score:', similarityScore);
});
