const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
    static: './build',
});

server.use(middlewares);
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/products': '/products'
}));
server.use(router);

module.exports = server; 