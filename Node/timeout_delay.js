const fs = require('fs');
const { performance } = require("perf_hooks");

const originalReadFile = fs.readFile;
fs.readFile = function(filename, encoding, callback) {
    console.log("Starting slow file read...");
    setTimeout(() => {
        originalReadFile(filename, encoding, callback);
    }, 6000);
};

let start_t = performance.now();
setTimeout(()=>{
    console.log("Timer Expected Time: ", "0ms", ", Print at: ", (performance.now() - start_t).toFixed(3) + "ms");
}, 0);
setTimeout(()=>{
    console.log("Timer Expected Time: ", "100ms", ", Print at: ", (performance.now() - start_t).toFixed(3) + "ms");
}, 100);
setTimeout(()=>{
    console.log("Timer Expected Time: ", "300ms", ", Print at: ", (performance.now() - start_t).toFixed(3) + "ms");
}, 300);
// fs.readFile('res.txt', 'utf-8', (err, data)=>{})
end_t = performance.now();
console.log("time for file read: ", (end_t - start_t).toFixed(3));