// Date: October 6, 2020
// Author: MC
// Status: finished

// REVERSE A STRING
// Return a string in reverse
// ex. reverseString('hello') === 'olleh'

function reverseString(str) {
	if (!str)
		return;

	return str.split('').reverse().join('');
}

const output = reverseString('hello');
console.log(output);