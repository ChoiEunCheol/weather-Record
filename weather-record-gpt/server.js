const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 8080;

const weatherModule = require('./weatherModule'); // 모듈 파일 불러오기

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
    } else if (url === '/weather-data') {
        // 날씨 데이터 업데이트 및 클라이언트에게 제공
        updateWeatherData(); // 업데이트 함수를 구현해야 합니다
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(getWeatherData()));
    } else {
        // 404 에러 처리
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`웹 서버가 포트 ${PORT}에서 실행 중입니다.`);
});
