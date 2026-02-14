const http = require('http');

/*
    Print Functions
*/
const starLine1 = "_____________________________________________\n";
const starLine2 = "\n******************************************\n";
const printStart = () =>{
    console.log(starLine1);
    console.log("| - - - - Custom Express initialized - - - - |");
    console.log(starLine1);
};
const printRoutes = (routes) => {
    console.log("\n/ Registered Routes:");
    routes.forEach(route => {
        console.log(`/ Method: ${route.method}, Path: ${route.path}, Handlers: ${route.handlerArray.length}`);
    });
    console.log(starLine2);
};

/*
    For a given route object, execute all the handlers in sequence. If any handler ends the response, stop executing further handlers.
    Return true if response is ended, otherwise false.
*/
const executeHandlers = (routeObject, req, res, type) => {
    let idx = 0;
    let totalHandlers = routeObject.handlerArray.length;
    function runNextHandler() {
        if(idx >= totalHandlers) return;
        const handler = routeObject.handlerArray[idx++];
        handler(req, res, runNextHandler);
        if(res.headersSent) return true;
    }
    runNextHandler();
    return res.headersSent;
}

/*
    If no route is matched for the incoming request, this handler will be executed to send a 404 response.
*/ 
const RouteNotFoundHandler = (req, res) => {
    if(res.headersSent) return;
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Route Not Found');
};

/*
    Main Handler for Application which will be used as callback for http.createServer. 
    This handler will check the incoming request against the registered routes and execute the appropriate handlers in sequence. 
    If no route matches, it will execute the RouteNotFoundHandler.
    For use() method, Default HTTP Method - 'NONE' and Default Path - 'NONE'
*/
const CustomExpressHandler = (routes) => {
    return (req, res) => {
        const {method, url} = req;
        console.log(`Received request: ${method} ${url}`);
        let reqEnd = false;
        for(let route of routes){
            let routeMethod = route.method;
            let routePath = route.path;
            // Global Middleware
            if(routeMethod === 'NONE' && routePath === 'NONE'){
                reqEnd = executeHandlers(route, req, res, "global middleware");
                if(reqEnd) break;
            }
            else{
                // Route-specific Middleware and Handler
                if(routeMethod === method && routePath === url){
                    reqEnd = executeHandlers(route, req, res, `route handler - ${method} ${url}`);
                    if(reqEnd) break;
                }
                else continue;
            }
            if(reqEnd) break;
        }
        if(!reqEnd) {RouteNotFoundHandler(req, res)};
    };
};

/*
    Main Custom Express Class to mimic Express Application
    Methods like use(), get(), post() are implemented to register middlewares and handlers.
    The listen() method starts the server and prints all the registered routes.
*/ 
class CustomExpress{
    constructor(){
        this.routes = [];
        this.mainHandler = CustomExpressHandler(this.routes);
        this.server = http.createServer(this.mainHandler);
        printStart();
    }

    use(middleware){
        this.routes.push({
            method: 'NONE',
            path: 'NONE',
            handlerArray: [middleware]
        });
    }

    get(path, ...handlers){
        this.routes.push({
            method: 'GET',
            path,
            handlerArray: handlers
        });
    }

    post(path, ...handlers){
        this.routes.push({
            method: 'POST',
            path,
            handlerArray: handlers
        });
    }

    listen(port=3000, callback){
        console.log(`/ Starting Custom Express Application`)
        console.log(`/ Provided port ${port}`);
        // Print all the registered routes
        printRoutes(this.routes);
        this.server.listen(port);
        if(callback) callback();
    }
}

module.exports = CustomExpress;