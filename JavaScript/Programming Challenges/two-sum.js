// Date: October 22, 2020
// Author: MC
// Status: finished

// Two Sum
// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.


'use strict';

function twoSum(nums, target) {
    const sortedNumsIndices = nums.map((val, i) => i)
        .sort((a, b) => nums[a] - nums[b]);

    let l = 0, r = nums.length - 1, sum = 0;

    while (l !== r) {
        sum = nums[sortedNumsIndices[l]] + nums[sortedNumsIndices[r]];

        if (sum === target)
            return [sortedNumsIndices[l], sortedNumsIndices[r]];
        else if (sum < target)
            l++;
        else
            r--;
    }
}


const output = twoSum([10, -1, -8, 3, 5], 8);
console.log(output);