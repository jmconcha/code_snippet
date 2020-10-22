// Date: Octobe 8, 2020
// Author: MC
// Status: finished

// SORT BY HEIGHT
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

    return arr.map((val) => {
        if (val !== -1) {
            return people[counter++];
        }

        return -1;
    });
}

const output = sortByHeight([-1, 150, 190, 170, -1, -1, 160, 180]);
console.log(output);