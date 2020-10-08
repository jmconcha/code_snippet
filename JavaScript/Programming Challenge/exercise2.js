// Date: October 7, 2020
// Author: MC

// CHALLENGE 1: LONGEST WORD
// Return the longest word of a string
// ex. longestWord('Hi there, I love Javascript') === 'JavaScript.'

function longestWord(sen) {
    // Solution: Return an array if multiple words, otherwise return a string
    if (!sen)
	return;

    const words = sen.split(' ');
    const wordLength = {};
    let longest = 0;

    for (let word of words) {
        if (wordLength[word.length]) {
	    wordLength[word.length].push(word);
	} else {
	    if (word.length > longest)
		longest = word.length;
	    wordLength[word.length] = [word];
	}
    }

    return wordLength[longest].length > 1 ?
        wordLength[longest] : wordLength[longest][0];
}



// CHALLENGE 2: ARRAY CHUNKING
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



// CHALLENGE 3: FLATTEN ARRAY
// Take an array of arrays and flatten to a single array
// ex. [[1, 2], [3, 4], [5, 6], [7]] = [1, 2, 3, 4, 5, 6, 7]

function flattenArray(arrays) {
    if (!arrays.length)
	return;

    return arrays.reduce((accum, val) => accum.concat(val));
}



// CHALLENGE 4: ANAGRAM
// Return true if anagram and false if not
// ex. 'elbow' === 'below'
// ex. 'Dormitory' === 'dirty room##'

function isAnagram(str1, str2) {
    if (!(str1 && str2))
	return;    
}



// CHALLENGE 5: LETTER CHANGES
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

// Call Function
//const output = longestWord('Hello there, I love JavaScript.');
//const output = chunkArray([1, 2, 3, 4, 5, 6, 7], 2);
//const output = flattenArray([[1, 2, 3], [4, 5, 6]]);
//const output = isAnagram('elbow', 'below');
//const output = letterChanges('hello there z Z');

//console.log(output);
