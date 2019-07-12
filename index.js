var express = require('express');
const server = require('./api/server.js');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var port = process.env.PORT || 8080;


var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://plan-my-day.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://plan-my-day',
    issuer: 'https://plan-my-day.auth0.com/',
    algorithms: ['RS256']
});

server.use(jwtCheck);

server.get('/authorized', (req, res)=>{
    res.send('Secured Resource');
});

server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));

