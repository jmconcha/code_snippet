// Date: October 6, 2020
// Author: MC
// Status: finished

// MAX CHARACTER
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

const output = maxCharacter('mississippi');
console.log(output);