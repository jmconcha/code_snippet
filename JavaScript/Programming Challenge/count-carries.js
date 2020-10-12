// Date Created: October 12, 2020
// Author: MC
// Status: finished

// Problem: Create a program that will count the number of
//     addition carries of two positive numbers.

// Explanation:
// 111 <-- 3 carries        <-- no carries
//  999                         1000
// + 34                        +   9
// ----                         ----
// 1033                         1009

// Input format: The first line of input is a number N denoting the number of
//     non-negative integer pairs to be added. Each input pairs should have
//     the format: x y where x and y are the non-negative integers.

// Output format: Output the number of carries required in a simple addition.

// Sample Input:       Sample Output:
// 5                   
// 263 5               0
// 666 666             3
// 1000 9              0
// 98 899              2
// 4 0                 0

'use strict';

function countCarries(x, y) {
	if (x < 0 || y < 0 || isNaN(x) || isNaN(y) || (!x && !y))
		return;

	let carries = 0;
	let hasCarry = false;
	x = x.toString().split('').reverse().join('');
	y = y.toString().split('').reverse().join('');

	if (x.length > y.length)
		x = x.substr(0, y.length);
	else
		y = y.substr(0, x.length);

    for (let i = 0, length = x.length; i < x; i++) {
    	if ((hasCarry ? 1 : 0) + Number(x[i]) + Number(y[i]) > 9) {
    		carries++;
    		hasCarry = true;
    	}
    }

    return carries;
}

const output = countCarries(98, 899);
console.log(`Carries: ${output}`);