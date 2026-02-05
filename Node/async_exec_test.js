// Different Scenarios of Async Await Execution Order based on the Node Event Queue

const fs = require('fs');
const checkValidity = require("./check");
// const { performance } = require("perf_hooks");

const originalLog = console.log;
if (process.stdout.setDefaultEncoding) {
    process.stdout.setDefaultEncoding('utf8');
}

fs.writeFileSync('res.txt', '', { encoding: 'utf8' })
console.log = function(...args) {
    const output = args.join(' ') + '\n';
    fs.appendFileSync('res.txt', output, 'utf8');
};

// Checking the Execution Order of Async/Awaits functions by Node.js
// setTimeout(()=>{console.log("timer 1")}, 0); // 


// --------------------------- test -------------------------------
console.log("start"); // 1

async function t3(){
    console.log("t3 entry"); // 4
    Promise.resolve().then(()=>{
        console.log("then3"); // 8
    });
    console.log("s3"); // 5
}

async function t2(){
    console.log("t2 entry"); // 3
    await t3();
    await Promise.resolve().then(()=>{
        console.log("then2"); // 10
    });
    console.log("s2"); // 12
}

async function t1(){
    console.log("entry 1"); // 2
    t2();
    console.log("check phase"); // 6
    await Promise.resolve().then(()=>{
        console.log("then 1"); // 9
    });
    console.log("s1"); // 11

}
t1();

console.log("end"); // 7


// ----------------------------------------------------------------------

setTimeout(()=>{
    console.log = originalLog;
    checkValidity();
}, 2000);