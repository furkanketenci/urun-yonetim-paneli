const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, '../db.json'));
const middlewares = jsonServer.defaults({
    static: path.resolve(__dirname, '../build'),
});

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

server.use((req, res, next) => {
    try {
        next();
    } catch (err) {
        console.error('JSON Server Error:', err);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
});

server.use(middlewares);

server.use(jsonServer.rewriter({
    '/api/*': '/$1'
}));

server.use(router);

// Hata yakalama
server.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
});

server.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

module.exports = server; 