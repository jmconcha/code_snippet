// Date: Octobe 8, 2020
// Author: MC

// CHALLENGE 1: ADD ALL NUMBERS
// Return a sum of all parameters entered regardless of the amount of numbers - NO ARRAYS
// ex. addAll(2,5,6,7) === 20

function addAll(...nums) {
    if (!nums.length)
	return;

    return nums.reduce((accum, val) => accum + val);
}



// CHALLENGE 2: SUM ALL PRIMES
// Pass in a number to loop up to and add all of the prime numbers. A prime number is a whole number greater than 1 whose only factors are 1 and itself
// ex. sumAllPrimes(10) == 17

function sumAllPrimes(range) {
    if (isNaN(range) || range < 1)
        return;

    if (range === 1)
	return 1;

    let sum = 0;

    function checkPrime(i) {
        for (let j = 2; j < i; j++) {
	    if (!(i % j))
		return false;
	}

	return true;
    }

    for (let i = 2; i < range + 1; i++) {
	if (checkPrime(i))
	    sum += i;
    }

    return sum;
}

// CHALLENGE 3: SEEK & DESTROY
// Remove from the array whatever is in the following arguments. Return the leftover numbers in an array
// ex. seekAndDestroy([2, 3, 4, 6, 6, 'hello'], 2, 6) == [3, 4, 'hello']

function seekAndDestroy(arr, ...remove) {
    if (!(arr.length && remove.length))
	return;

    return arr.filter(val => !remove.includes(val));
}

// CHALLENGE 4: SORT BY HEIGHT
// Some people are standing in a row in a park. There are trees between them which cannot be moved. Your task is to rearrange the people by their heights in a non-descending order without moving the trees.
// ex.
// a = [-1, 150, 190, 170, -1, -1, 160, 180]
// sortByHeight(a) == [-1, 150, 160, 170, -1, -1, 180, 190]

function sortByHeight(arr) {
    if (!arr.length)
	return;

    let counter = 0;
    const people = arr.filter(val => val !== -1);
    people.sort();

    return arr.map((val, index) => {
        if (val !== -1) {
	    return people[counter++];
	}
	
	return -1;
    });
}

// CHALLENGE 5: MISSING LETTERS
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

// CHALLENGE 6: EVEN & ODD SUMS
// Take in an array and return an array of the sums of even and odd numbers
// ex.
// evenOddSums([50, 60, 60, 45, 71]) == [170, 116]

function evenOddSums(arr) {
    if (!arr.length)
	return;

    let evenSum = oddSum = 0;

    for (let val of arr) {
        if (val % 2)
	    oddSum += val;
	else
	    evenSum += val;
    }

    return [evenSum, oddSum];
}


//const output = addAll(1,2,3,4,5);
//const output = sumAllPrimes(10);
//const output = seekAndDestroy([2, 3, 4, 6, 6, 'hello'], 2, 6);
//const output = sortByHeight([-1, 150, 190, 170, -1, -1, 160, 180]);
//const output = missingLetters('abcefhkm');
//const output = evenOddSums([50, 60, 60, 45, 71]);

//console.log(output);
