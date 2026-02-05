const fs = require("fs");

const checkValidity = () => {
    console.log("\n - - -- -- - - Validating Test - - - - - - -- -  \n")
    let ans = fs.readFileSync("input.txt", 'utf-8');
    let res = fs.readFileSync("res.txt", 'utf-8');
    
    // Split into lines
    let ansLines = ans.split('\n').map(line => line.trim());
    let resLines = res.split('\n').map(line => line.trim());
    
    console.log("Input lines:", ansLines);
    console.log("Result lines:", resLines);
    
    // Compare line count
    if (ansLines.length !== resLines.length) {
        console.log(`❌ FAIL: Different number of lines (${ansLines.length} vs ${resLines.length})`);
    } else {
        let allMatch = true;
        
        for (let i = 0; i < ansLines.length; i++) {
            if (ansLines[i] !== resLines[i]) {
                console.log(`❌ FAIL: Line ${i + 1} differs:`);
                console.log(`  Expected: "${ansLines[i]}"`);
                console.log(`  Got:      "${resLines[i]}"`);
                allMatch = false;
            }
        }
        
        if (allMatch) {
            console.log("✅ PASS: All lines match");
        }
    }
};

module.exports = checkValidity;