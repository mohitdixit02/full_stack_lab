// Calback use without promise - Callback Hell
const showDetails = (id, newName, callback) => {
    setTimeout(() => {
        console.log('Showing Details requested...');
        console.log("ID received:", id);
        console.log("New Name received:", newName);
        callback(id, newName);
    }, 2000);
}

const getUserName = (id, newName, callback) =>{
    setTimeout(() => {
        console.log('Reading a user from database...');
        console.log("Name: ", "John Doe");
        callback({id: id, name: 'John Doe'}, newName);
    }, 2000);
}

const completeProcess = () => {
    setTimeout(() => {
        console.log('Process completed successfully!');
    }, 2000);
}

const setNewName = (details, newName, callback) => {
    setTimeout(() => {
        details.name = newName;
        console.log('User updated:', details);
        callback();
    }, 2000);
}

const updateUser = async (id, newName, callback) =>{
    console.log('Updating the user..');
    callback(id, newName);
}

updateUser(1, 'Anil Kumar', (id, newName)=>{
    showDetails(id, newName, (id, newName)=>{
        getUserName(id, newName, (details, newName)=>{
            setNewName(details, newName, ()=>{
                completeProcess();
            });
        });
    });
});

// Implementation using Promise
const updateUserV2 = (id, newName) => {
    return new Promise((resv, rej) => {
        console.log('Updating the user..');
        resv({id, newName});
    });
};

const showDetailsV2 = (id, newName) => {
    return new Promise((resv, rej) => {
        setTimeout(() => {
            console.log('Showing Details requested...');
            console.log("ID received:", id);
            console.log("New Name received:", newName);
            resv({id, newName});
        }, 2000);
    });
}

const getUserNameV2 = (id, newName) => {
    return new Promise((resv, rej) => {
        setTimeout(() => {
            console.log('Reading a user from database...');
            console.log("Name: ", "John Doe");
            let details = {id: id, name: 'John Doe'};
            resv({details, newName});
        }, 2000);
    });
};

const setNewNameV2 = (details, newName) => {
    console.log(details);
    return new Promise((resv, rej) => {
        setTimeout(() => {
            details.name = newName;
            console.log('User updated:', details);
            resv();
        }, 2000);
    });
}

const completeProcessV2 = () => {
    return new Promise((resv, rej) => {
        setTimeout(() => {
            console.log('Process completed successfully!');
            resv();
        }, 2000);
    });
};

updateUserV2(1, 'Anil Kumar')
    .then(({id, newName})=> showDetailsV2(id, newName))
    .then(({id, newName})=> getUserNameV2(id, newName))
    .then(({details, newName})=> setNewNameV2(details, newName))
    .then(()=> completeProcessV2())
