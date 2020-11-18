// Date: October 6, 2020
// Author: MC
// Status: finished

// CAPITALIZE LETTERS
// Return a string with the first letter of every word capitalized
// ex. capitalizeLetters('i love javascript') === 'I Love Javascript'

function capitalizeLetters(str) {
	if (!str)
		return;

	const strArr = str.split(' ');
	const res = strArr.map((val) => {
		return val[0].toUpperCase() + val.substring(1, val.length);
	});

	return res.join(' ');
}

const output = capitalizeLetters('i love javascript');
console.log(output);