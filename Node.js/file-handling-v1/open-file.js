let fs = require('fs');

fs.open('users.txt', 'w', (err) => {
    if (err) throw err;

    console.log('File created.');
});