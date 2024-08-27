const express = require('express');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.createServer(app)

app.use('/', routes);

const PORT = server.address.PORT || 3005;

server.listen(PORT, () => {

    console.log(`Server active on http://localhost:${PORT}`);
})