// Date: Octobe 8, 2020
// Author: MC
// Status: finished

// SEEK & DESTROY
// Remove from the array whatever is in the following arguments. Return the leftover numbers in an array
// ex. seekAndDestroy([2, 3, 4, 6, 6, 'hello'], 2, 6) == [3, 4, 'hello']

function seekAndDestroy(arr, ...remove) {
    if (!(arr.length && remove.length))
	return;

    return arr.filter(val => !remove.includes(val));
}

const output = seekAndDestroy([2, 3, 4, 6, 6, 'hello'], 2, 6);
console.log(output);