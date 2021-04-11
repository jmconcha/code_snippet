const fs = require('fs');
const readline = require('readline');

function userInput(userPrompt) {
	return new Promise((resolve, reject) => {
		const read = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

		read.question(userPrompt, (userIn) => {
			read.close();
			resolve(userIn);
		});
	});
}

function checkUserInput(userIn) {
	switch (userIn.toLowerCase()) {
		case 'c':
			createFile();
			break;
		case 'r':
			readFile();
			break;
		case 'w':
			writeFile();
			break;
		case 'u':
			updateFile();
			break;
		case 'd':
			deleteFile();
			break;
		case 'rn':
			renameFile();
			break;
		default:
			console.log('Invalid Input');
			return true;

	}
}

async function createFile() {
	let fn = await userInput('File Name: ');

	fs.open(fn, 'w', err => {
		if (err) throw err;

		console.log('File Successfully Created');
	});
}

async function writeFile() {
	let fn = await userInput('File Name: ');
	let fileContent = await userInput('File Content: ');

	fs.writeFile(fn, fileContent + '\n', err => {
		if (err) throw err;

		console.log('File Successfully Written');
	});
}

async function readFile() {
	let fn = await userInput('File Name: ');

	fs.readFile(fn, (err, data) => {
		if (err) throw err;

		console.log(data);
	});
}

async function updateFile() {
	let fn = await userInput('File Name: ');
	let fileContent = await userInput('File Content: ');

	fs.appendFile(fn, fileContent + '\n', err => {
		if (err) throw err;

		console.log('File Successfully Updated');
	});
}

async function deleteFile() {
	let fn = await userInput('File Name: ');

	fs.unlink(fn, err => {
		if (err) throw err;

		console.log('File Successfully Deleted');
	});
}

async function renameFile() {
	let fn = await userInput('File Name: ');
	let newFN = await userInput('New Name: ');

	fs.rename(fn, newFN, err => {
		if (err) throw err;

		console.log('File Successfully Renamed');
	});
}


async function init() {
	let userIn;
	let cont;

	do {
		do {
			userIn = await userInput(
				'<c> to create file\n<r> to read file\n<w> to write file\n<u> to update file\n<d> to delete file\n<rn> to rename file\nInput: '
			);
		} while (checkUserInput(userIn));

		cont = await userInput('Continue? [ yes | no ]: ');
	} while (cont === 'yes');
}

init();