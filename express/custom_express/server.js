const CustomExpress = require('./express');
const app = new CustomExpress();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        next();
    } else {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Unauthorized');
    }
};

const handlerMiddleware = (req, res, next) => {
    console.log('Handler Middleware Executed');
    res.setHeader('Content-Type', 'text/plain');
    res.write("Writing text\n");
    next();
};

const handler = (req, res) => {
    console.log('Handler Executed');
    res.statusCode = 200;
    res.end('Hello from Handler !!');
};

app.use(authMiddleware);
app.get('/hello', handlerMiddleware, handler);
app.get('/welcome', handler);

app.listen(8000, () => {
    console.log('Custom Express server is running on port 8000');
});