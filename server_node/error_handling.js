const http = require('http');
const url = require('url');

const server = http.createServer((req, res)=>{
    // ******************* Error Handling (Try Catch) *******************
    try{
        throw new Error("This is a custom error");
    }
    catch(error){
        console.error("Error handled by try-catch: ", error.message);
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 500;
        res.write("Error handled by try-catch: " + error.message);
        res.end();
    }
    
    // ******************* Error Handling (Event Listeners) *******************
    req.on('data', ()=>{
        req.emit('error', new Error("Simulated error during data reception"));
    })
    
    req.on('error', (error)=>{
        console.error("Request error handled by event listener: ", error.message);
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 400;
        res.write("Error handled by event listener: " + error.message);
        res.end();
    });
});

server.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})