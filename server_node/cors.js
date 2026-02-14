const http = require('http');
const url = require('url');

const server = http.createServer((req, res)=>{
    // set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if(req.method === 'OPTIONS'){
        res.writeHead(204);
        res.end();
        return;
    }
    
    const parsedUrl = url.parse(req.url, true);
    res.end();
})

server.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})