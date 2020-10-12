// Date: Octobe 8, 2020
// Author: MC
// Status: finished

// SUM ALL PRIMES
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

const output = sumAllPrimes(10);
console.log(output);