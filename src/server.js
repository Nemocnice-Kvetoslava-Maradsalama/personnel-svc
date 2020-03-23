'use strict';

const express = require('express');

const server = express();
server.get('/', (req, res) => {
    res.send('Hello World');
});

const port = 8080;
const host = '0.0.0.0';
server.listen(port, host);

console.log(`Server up on http://${host}:${port}`);