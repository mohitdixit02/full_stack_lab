const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');

const privateKey = fs.readFileSync('private-key.pem', 'utf8');
const certificate = fs.readFileSync('certificate.pem', 'utf8');
const credentials = {
    key: privateKey,
    cert: certificate
}

// Redirect HTTP to HTTPS
const httpServer = http.createServer((req, res)=>{
    res.writeHead(301, {'Location': 'https://localhost:3000' + req.url});
    res.end();
});

httpServer.listen(80, ()=>{
    console.log('HTTP Server is running on port 80');
})

const server = https.createServer(credentials, (req, res)=>{
    const url = req.url;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Hello, World!</h1>');
})

server.listen(3000, ()=>{
    console.log('HTTPS Server is running on port 3000');
})

