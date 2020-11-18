// Date Created: October 12, 2020
// Author: MC
// Status: finished

// Problem: Given a list of integers determine how many sum of
//     unique pairs ('combinations') will be equal to a specific target
//
// example: array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// Input: 10
// Output: 4 --> (1, 9), (2, 8), (3, 7), (4, 6)
//
// Input: 6
// Output: 2 --> (1, 5), (2, 4)

'use strict';

function findTheSum(arr, sum) {
    if (!arr.length || !sum)
	return;

    const sortedArr = arr.sort((a, b) => a - b);
    const uniquePairs = [];
    let uniquePairsCount = 0;
    let left = 0;
    let right = sortedArr.length - 1;

    while (left < right) {
        if (sortedArr[left] + sortedArr[right] === sum) {
            let x = sortedArr.splice(left, 1)[0];
            let y = sortedArr.splice(--right, 1)[0];

            left = 0;
            uniquePairsCount++;
            uniquePairs.push([x, y]);
        }
        else if (sortedArr[left] + sortedArr[right] < sum) {
            left++;
        } else {
            right--;
        }
    }

    return {uniquePairs, uniquePairsCount};
}

function display(data) {
    let format = `${data['uniquePairsCount']} --> `;

    for (let val of data['uniquePairs']) {
        format += `(${val[0]}, ${val[1]}), `;
    }

    console.log(format.slice(0, -2));
}

const output = findTheSum([1, 2, 3, 4, 5, 6, 7, 8, 9], 10);
display(output);
