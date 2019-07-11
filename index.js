const server = require('./server.js');
const port = process.env.PORT || 1100;
server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));