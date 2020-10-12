// Date: October 6, 2020
// Author: MC
// Status: finished

// MISSING LETTERS
// Find the missing letter in the passed letter range and return it. If all letters are present, return undefined
// ex.
// missingLetters("abce") == "d"
// missingLetters("abcdefghjklmno") == "i"
// missingLetters("abcdefghijklmnopqrstuvwxyz") == undefined

function missingLetters(str) {
    if (!str)
	return;

    str = str.toLowerCase();
    const missingChars = [];

    for (let i = 0, length = str.length - 1; i < length; i++) {
        if (str[i].charCodeAt() + 1 !== str[i + 1].charCodeAt()) {
            missingChars.push(String.fromCharCode(str[i].charCodeAt() + 1));
	}
    }

    return missingChars.length ? missingChars : undefined;
}

const output = missingLetters('abcefhkm');
console.log(output);