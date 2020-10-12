// Date: Octobe 8, 2020
// Author: MC
// Status: finished

// ADD ALL NUMBERS
// Return a sum of all parameters entered regardless of the amount of numbers - NO ARRAYS
// ex. addAll(2,5,6,7) === 20

function addAll(...nums) {
    if (!nums.length)
        return;

    return nums.reduce((accum, val) => accum + val);
}

const output = addAll(1, 2, 3, 4, 5);
console.log(output);