// Date: October 6, 2020
// Author: MC
// Status: finished

// VALIDATE A PALINDROME
// Return true if palindrome and false if not
// ex. isPalindrome('racecar') === 'true', isPalindrome('hello') == false

function isPalindrome(str) {
	if (!str)
		return;

	return (str.split('').reverse().join('') === str);
}

const output = isPalindrome('racecar');
console.log(output);