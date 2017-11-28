const http = require('http');
const express = require('express');
const middleware = require('./middleware');

let server = null;

module.exports.start = (port) => {
    const app = express();
    app.set('port', port);

    app.get('/', middleware.setUser, (req, res) => {
        res.send();
    });

    server = http.createServer(app).listen(app.get('port'));
    return server;
};

module.exports.close = () => {
    if (server && server.close) server.close();
};