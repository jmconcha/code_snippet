// Date: October 6, 2020
// Author: MC

// CHALLENGE 1: REVERSE A STRING
// Return a string in reverse
// ex. reverseString('hello') === 'olleh'

function reverseString(str) {
	if (!str)
		return;

	return str.split('').reverse().join('');
}



// CHALLENGE 2: VALIDATE A PALINDROME
// Return true if palindrome and false if not
// ex. isPalindrome('racecar') === 'true', isPalindrome('hello') == false

function isPalindrome(str) {
	if (!str)
		return;

	return (str.split('').reverse().join('') === str);
}



// CHALLENGE 3: REVERSE AN INTEGER
// Return an integer in reverse
// ex. reverseInt(341) === 143

function reverseInt(int) {
	if (isNaN(int))
		return;

	return String(int).split('').reverse().join('');
}



// CHALLENGE 4: CAPITALIZE LETTERS
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



// CHALLENGE 5: MAX CHARACTER
// Return the character that is most common in a string
// ex. maxCharacter('javascript') == 'a'

function maxCharacter(str) {
	if (!str)
		return;

	const letters = str.split('');
	const lttrQuan = {};
	let maxCharacter = '';

	for (let val of letters) {
		if (lttrQuan[val]) {
			lttrQuan[val]++;
		} else {
			lttrQuan[val] = 1;
		}
	}
	
	for (let key in lttrQuan) {
		if (!maxCharacter) {
			maxCharacter = key;
			continue;
		}

		if (lttrQuan[key] > lttrQuan[maxCharacter]) {
			maxCharacter = key;
		}
	}

	return maxCharacter;
}



// CHALLENGE 6: FIZZBUZZ
// Write a program that prints all the numbers from 1 to 100. For multiples of 3, instead of the number, print "Fizz", for multiples of 5 print "Buzz". For numbers which are multiples of both 3 and 5, print "FizzBuzz".

function fizzBuzz() {
	for (let i = 1; i < 101; i++) {
		if (!(i % 15)) {
			console.log('FizzBuz');
		}
		else if (!(i % 3)) {
			console.log('Fizz');
		}
		else if (!(i % 5)) {
			console.log('Buzz');
		} else {
			console.log(i);
		}
	}
}



// Call Function
// const output = reverseString('hello');
// const output = isPalindrome('racecar');
// const output = reverseInt(341);
// const output = capitalizeLetters('i love javascript');
// const output = maxCharacter('mississippi');
//const output = fizzBuzz();

//console.log(output);
