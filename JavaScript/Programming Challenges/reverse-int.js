// Date: October 6, 2020
// Author: MC
// Status: finished

// REVERSE AN INTEGER
// Return an integer in reverse
// ex. reverseInt(341) === 143

function reverseInt(int) {
	if (isNaN(int))
		return;

	return String(int).split('').reverse().join('');
}

const output = reverseInt(341);
console.log(output);