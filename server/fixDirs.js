const fs = require('fs');
const path = require('path');

const dirs = [
    path.join(__dirname, 'uploads'),
    path.join(__dirname, 'uploads/gallery')
];

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log('Created:', dir);
    } else {
        console.log('Exists:', dir);
    }
});
