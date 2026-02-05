// DIfferent Execution Order of Event Queues by Event Loop based on Priorities
const fs = require('fs');
const checkValidity = require("./check");

const originalLog = console.log;
if (process.stdout.setDefaultEncoding) {
    process.stdout.setDefaultEncoding('utf8');
}

fs.writeFileSync('./res.txt', '', { encoding: 'utf8' })
console.log = function(...args) {
    const output = args.join(' ') + '\n';
    fs.appendFileSync('res.txt', output, 'utf8');
};

// --------------------- test ----------------------

console.log("start");

fs.readFile("input.txt", "utf-8", ((err, data)=>{
    console.log("Poll Phase");
    setTimeout(()=>console.log("Timer Queue"));
    setImmediate(()=> console.log("Check Queue"));
}));

Promise.resolve().then(()=>{
    console.log("Micro task Queue");
});

process.nextTick(()=>{
    console.log("NextTick Queue");
});

console.log("end");

// -------------------- end ------------------------

setTimeout(()=>{
    console.log = originalLog;  
    checkValidity();
}, 2000);