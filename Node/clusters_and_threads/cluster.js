// Implementation of the Cluster module in Node.js
const cluster = require("cluster");
const os = require("os");
const http = require("http");

const numCPUs = os.cpus().length;
console.log(`Number of CPU cores: ${numCPUs}`);

if(cluster.isPrimary){
    console.log(`Master process is running with PID: ${process.pid}`);

    // Fork workers
    for(let i = 0; i < 4; i++){
        cluster.fork();
    }

    // Listen for dying workers
    cluster.on('exit', (worker, code, signal)=>{
        console.log(`Worker ${worker.process.pid} died with code: ${code}, signal: ${signal}`);
        console.log('Starting a new worker...');
        cluster.fork();
    });
}
else{
    console.log(`Worker process started with PID: ${process.pid}`);

    // HTTP Server for each worker
    http.createServer((req, res)=>{
        // Simulate some work
        setTimeout(() => {
            res.writeHead(200, {
                'Content-Type': 'text/plain',
                'Connection': 'close'
            });
            res.end(`Hello from worker ${process.pid}\n`);
            console.log(`Worker ${process.pid} completed a request.`);
        }, 3000);
    }).listen(3000);

    console.log(`Worker ${process.pid} is listening on port 3000`);
}
