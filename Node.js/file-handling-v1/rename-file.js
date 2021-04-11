let fs = require('fs');

fs.rename('users.txt', 'countries.txt', (err) => {
    if (err) throw err;

    console.log('File renamed.');
});