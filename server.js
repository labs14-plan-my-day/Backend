//Imports
const express = require('express');
const server = express(); 
const cors = require('cors')

const DummyRouter = require('./dummy/dummy-router.js')


server.use(cors())
server.use(express.json())


server.use('/dummy', DummyRouter)

server.get('/', (req, res) => {
    res.status(200).json({message:`server listening`});
});


module.exports = server