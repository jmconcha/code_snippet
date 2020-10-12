// Date: Octobe 8, 2020
// Author: MC
// Status: finished

// EVEN & ODD SUMS
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

const output = evenOddSums([50, 60, 60, 45, 71]);
console.log(output);
