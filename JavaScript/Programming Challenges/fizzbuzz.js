// Date: October 6, 2020
// Author: MC
// Status: finished

// FIZZBUZZ
// Write a program that prints all the numbers from 1 to 100.
// For multiples of 3, instead of the number, print "Fizz", for multiples of 5 print "Buzz".
// For numbers which are multiples of both 3 and 5, print "FizzBuzz".

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

const output = fizzBuzz();
