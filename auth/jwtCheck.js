const express = require('express');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

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

module.exports = jwtCheck