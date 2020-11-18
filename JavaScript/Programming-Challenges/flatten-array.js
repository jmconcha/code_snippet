// Date: October 7, 2020
// Author: MC
// Status: finished

// FLATTEN ARRAY
// Take an array of arrays and flatten to a single array
// ex. [[1, 2], [3, 4], [5, 6], [7]] = [1, 2, 3, 4, 5, 6, 7]

function flattenArray(arrays) {
    if (!arrays.length)
	return;

    return arrays.reduce((accum, val) => accum.concat(val));
}

const output = flattenArray([[1, 2, 3], [4, 5, 6]]);
console.log(output);