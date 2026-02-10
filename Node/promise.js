// Promise Setup
const mockFetchData = (id, resv) => {
    console.log('Fetching data from database...');
    console.log("ID received:", id);
    if(resv) return {id: id, name: 'John Doe'};
    else return null;
}

const prm1 = new Promise((resv, rej)=>{
    let details = mockFetchData(1, true);
    if(details) resv(details);
    else rej('Error fetching data');
})

// Method 1
prm1.then(
    (data) => console.log("Promise resolved with data:", data),
    (error) => console.log("Promise rejected with error:", error)
);

// Method 2
prm1.then(
    (data)=> console.log("Promise resolved with data:", data)
).catch(
    (err)=> console.log("Promise rejected with error:", err)
);