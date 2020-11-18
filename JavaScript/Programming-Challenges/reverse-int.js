// Date: October 6, 2020
// Modifed: November 10, 2020
// Author: MC
// Status: finished

// REVERSE AN INTEGER
// Return an integer in reverse
// ex. reverseInt(341) === 143

// Description: Given a 32-bit signed integer, reverse digits of an integer.

// Note: Assume we are dealing with an environment that could only store integers
// within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose of this problem,
// assume that your function returns 0 when the reversed integer overflows.


'use strict';

const reverse = function (n) {
    if (n == 0)
        return 0;

    const sign = n < 0;
    let reverseN = 0;
    n = Math.abs(n);

    while (n) {
        reverseN = reverseN * 10 + n % 10;
        n = Math.floor(n / 10);
    }

    return reverseN > 0x7FFFFFFF ? 0 : sign ? -reverseN : reverseN;
}


let output = reverse(321);
console.log(output);

output = reverse(-134);
console.log(output);

output = reverse(0);
console.log(output);

output = reverse(7463847412);
console.log(output);

output = reverse(-7463847412);
console.log(output);

output = reverse(8463847412);
console.log(output);

output = reverse(-8463847412);
console.log(output);
