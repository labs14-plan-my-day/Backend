
var express = require('express');
const server = require('./api/server.js');
const jwtCheck = require('./auth/jwtCheck')

var port = process.env.PORT || 8080;


server.use(jwtCheck);

server.get('/authorized', (req, res)=>{
    res.send('Secured Resource');
});

server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));
