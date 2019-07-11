//Imports
const server = express(); 
const express = require('express');


server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({message:`server listening`});
});

module.exports = server