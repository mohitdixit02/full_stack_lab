const express = require('express');
const app = express();
const router = express.Router();
const router2 = express.Router();
const {
    authMiddleware,
    customHandler1,
    customHandler2,
    router1Handler,
    postMiddleware,
    errHandler,
    specialHandler,
} = require('./service');

// ******************* Router vs Route *******************
// Routes binded to router2 object
router2.get('/:id', // always executed skipping "/test" route due to sequence of route definitions
    authMiddleware, // middleware chain (route handler stack)
    customHandler1, 
    postMiddleware
);
router2.get('/test', 
    authMiddleware, 
    customHandler2, 
    postMiddleware
);

// Registering one router inside another router
router.use('/api', router2);

// Binding the route to the router
router.get('/hello',
    authMiddleware,
    router1Handler, 
    postMiddleware
);

app.use(router);
app.use(errHandler); // global err handler / application middleware
app.use(specialHandler) // added for next('route') scenerio to end response

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
