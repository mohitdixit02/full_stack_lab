const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");

const fibonacci = (n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

if(isMainThread){
    module.exports = function solveFibonacci(num){
        return new Promise((resv, rej)=>{
            console.log("Main thread is running...");
            const worker = new Worker(__filename, {
                workerData: {
                    workerId: `Worker-node-${num}`,
                    num: num
                }
            });

            // Parent Port listens for messages from the worker
            worker.on('message', (message)=>{
                console.log(`Message from ${message.workerId}: ${message.data}`);
                resv(message.data);
            });

            // Exit Event listener
            worker.on('exit', (code)=>{
                console.log(`Worker exited with code ${code}`);
            });
        });
    }
}
else{
    // Worker code
    const res = fibonacci(workerData.num);
    parentPort.postMessage({
        workerId: workerData.workerId,
        data: `Fibonacci of ${workerData.num} is ${res}`
    });
}