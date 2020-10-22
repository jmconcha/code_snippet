// Date: October 7, 2020
// Author: MC
// Status: finished

// LETTER CHANGES
// Change every letter of the string to the one that follows it and capitalize the vowels
// Z should turn to A
// ex. 'hello there' === 'Ifmmp UIfsf'

function letterChanges(str) {
    if (!str)
	return;

    let res = '';

    for (let letter of str) {
	switch (letter) {
	    case 'd':
	    case 'h':
	    case 'n':
	    case 't':
		res += String.fromCharCode((letter.charCodeAt() + 1) - 32);
		break;
	   case 'z':
	   case 'Z':
		res += 'A';
		break;
	   case ' ':
		res += ' ';
		break;
	    default:
		res += String.fromCharCode(letter.charCodeAt() + 1);
	}
    }

    return res;
}

const output = letterChanges('hello there z Z');
console.log(output);