// Async Operation
const getId = async () => {
    // rejected promise
    // return Promise.reject(new Error('Failed to get ID'));

    // resolved promise
    return new Promise((resv, rej) => {
        setTimeout(() => {
            resv(123);
        }, 2000);
    });
}

// Asyn Error Wrapper
const asyncErrorWrapper = (fn) => {
    return (req, res, next) =>{
        Promise.resolve(fn(req, res, next)).catch(next);
    }
};

// ************************ Middleware ************************
// Pre Middleware
const authMiddleware = (req, res, next) => {
    console.log('Auth middleware executed');
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader);
    if(!authHeader) return res.status(401).json({ message: 'Unauthorized' });
    next();
} 

// Route handlers
const customHandler1 = async (req, res, next) => {
    console.log('Custom handler 1 executed');
    if(req.query.error) {
        return next(new Error('Simulated error'));
    }
    res.status(200);
    res.setHeader('Content-Type', 'application/json');

    /* 
        In below case, Rejected Promise is not passed to the error handling middleware, 
        it will cause server crash if Express version is below 5.x. 
    */
    // console.log('Fetching ID...');
    // let id = await getId();
    // console.log('ID received:', id);
    // res.write("Id is: " + id + "\n");
    // console.log('Custom handler 1 completed'); 
    // res.write("Hello from the custom handler 1!");
    // next();

    // ********************* Method1: handling by try catch block ***********************
    // try{
    //     console.log('Fetching ID...');
    //     let id = await getId();
    //     console.log('ID received:', id);
    //     res.write("Id is: " + id + "\n");
    //     console.log('Custom handler 1 completed'); 
    //     res.write("Hello from the custom handler 1!");
    //     next();
    // }
    // catch(err) {
    //     return next(err);
    // }

    // ********************* Method2: handling by promise .catch() ***********************
    getId().then(id => {
        console.log('ID received:', id);
        res.write("Id is: " + id + "\n");
        console.log('Custom handler 1 completed'); 
        res.write("Hello from the custom handler 1!");
        next();
    }).catch(next);
    
    /* 
        if next is function is called outside promise handlers, it will be executed immediately without waiting 
        for the promise to resolve or reject, which can lead to unexpected behavior. 
        Or we have to use await keyword to wait for the promise to resolve or reject before calling next() function.
    */
}

const customHandler2 = (req, res, next) => {
    console.log('Custom handler 2 executed');
    if(req.query.error) {
        return next(new Error('Simulated error'));
    }
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.write("Hello from the custom handler 2!");
    next();
}

// ********************* Method3: handling by async error wrapper ***********************
const router1Handler = asyncErrorWrapper(async (req, res, next) => {
    console.log('Router 1 handler executed');
    res.status(200);
    res.setHeader('Content-Type', 'application/json');

    let id = await getId();
    console.log('ID received:', id);
    res.write("Id is: " + id + "\n");
    res.write("Hello from the router 1 handler!");
    next('route'); 
    /* 
        next('route') - skip remaining handlers in the current route and move to the next route
        postMiddleware will be skipped for this route
    */ 
});

// Post Middleware
const postMiddleware = (req, res, next) => {
    console.log('Post middleware executed');
    res.write(" This is the post middleware.");
    res.end();
}

// Error handling middleware
const errHandler = (err, req, res, next) => {
    console.error('Error occurred:', err);
    res.status(500).json({ message: 'Internal Server Error' });
}

// Special handler for next('route') scenario
const specialHandler = (req, res, next) => {
    res.write(" This is the special handler for next('route') scenario.");
    res.end();
};

module.exports = {
    authMiddleware,
    customHandler1,
    customHandler2,
    router1Handler,
    postMiddleware,
    errHandler,
    specialHandler
}