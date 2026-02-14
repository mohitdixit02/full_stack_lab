const http = require('http');
const url = require('url');

const server = http.createServer((req, res)=>{
    // ****************** Request Object ***********************
    console.log("Received request - ");
    console.log("Request Headers: ", req.headers);
    console.log("Request Method: ", req.method);
    console.log("Request URL: ", req.url);
    const urlData = url.parse(req.url, true);
    console.log("Parsed URL: ", urlData);

    // ****************** Event Listeners ***********************
    const bodyStream = [];
    req.on('data', (chunk)=>{
        console.log(chunk.toString());
        bodyStream.push(chunk);
    })
    .on('end', ()=>{
        const bufferBody = Buffer.concat(bodyStream).toString();;
        console.log("Request Body: ", bufferBody);
    })
    console.log("Request processing completed"); // printed before the body is fully received due to the asynchronous nature of the 'data' event

    // ****************** Response Object ***********************
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello');
    res.write('World');
    res.write('!');
    res.end('Hello, World!');
})

server.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})