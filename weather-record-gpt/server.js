const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 8080;

const server = http.createServer((req, res) => {
    const { url } = req;

    if (url === '/') {
        // 루트 경로일 경우 index.html 파일 제공
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (url === '/weather.js') {
        // weather.js 파일 제공
        const filePath = path.join(__dirname, 'weather.js');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
        });
    } else {
        // 404 에러 처리
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
