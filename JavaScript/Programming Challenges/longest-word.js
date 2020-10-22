// Date: October 7, 2020
// Author: MC
// Status: finished

// LONGEST WORD
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

const output = longestWord('Hello there, I love JavaScript.');
console.log(output);