const server = require('./api/server.js');
const jwtCheck = require('./auth/jwtCheck')
const axios = require('axios')


var port = process.env.PORT || 8080;


server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));
