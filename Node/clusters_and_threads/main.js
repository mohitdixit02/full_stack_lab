const nodeWorker = require("./worker_threads");
const os = require("os");

const numCPUs = os.cpus().length;
console.log(`Number of CPU cores: ${numCPUs}`);

const nums = [40, 30, 15, 29, 26];

const runTasks = async () => {
    for(let i=0; i<nums.length; i++){
        nodeWorker(nums[i]).then(res=>{
            console.log(res);
        })
    }
}

runTasks();