let fs = require('fs');

fs.readFile('users.txt', (err, data) => {
    if (err) throw err;

    console.log(data);
});