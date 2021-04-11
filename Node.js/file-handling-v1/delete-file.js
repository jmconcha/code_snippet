let fs = require('fs');

fs.unlink('users.txt', (err) => {
    if (err) throw err;

    console.log('File deleted.');
});