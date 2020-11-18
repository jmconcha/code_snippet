// Date: October 7, 2020
// Author: MC
// Status: finished

// ARRAY CHUNKING
// Split an array into chunked arrays of a specific length
// ex. chunkArray([1, 2, 3, 4, 5, 6, 7], 3) === [[1, 2, 3],[4, 5, 6],[7]]
// ex. chunkArray([1, 2, 3, 4, 5, 6, 7], 2) === [[1, 2],[3, 4],[5, 6],[7]]

function chunkArray(arr, len) {
    if (!(arr.length && len))
	return;

    const chunkedArrays = [];
    const length = arr.length;
    let counter = 0;

    do {
        chunkedArrays.push(arr.slice(counter, counter + len));
	counter += len;
    } while (counter < length);

    return chunkedArrays;
}

const output = chunkArray([1, 2, 3, 4, 5, 6, 7], 2);
console.log(output);