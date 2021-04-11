let fs = require('fs');

let input = process.argv.slice(2);

if (input.length) {
    fs.appendFile('users.txt', input.join('\n') + '\n', (err) => {
        if (err) throw err;

        console.log('Successfully written.');
    });
} else {
    console.log('No text to write.');
}