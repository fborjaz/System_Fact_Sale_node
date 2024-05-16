const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3002;

http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'public', req.url);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        }
    });
}).listen(PORT);
