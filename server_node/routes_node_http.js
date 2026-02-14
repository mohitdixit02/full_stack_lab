const http = require('http');
const url = require('url');

const server = http.createServer((req, res)=>{
    const url = req.url;
    if(req.method === 'GET'){
        if(url === '/'){
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('Welcome to the Home Page!');
            res.end();
        }
        else if(url === '/about'){
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('Welcome to the About Page!');
            res.end();
        }
        else{
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write('Page Not Found');
            res.end();
        }
    }
    else{
        res.writeHead(405, {'Content-Type': 'text/plain'});
        res.write('Method Not Allowed');
        res.end();
    }
})

server.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})