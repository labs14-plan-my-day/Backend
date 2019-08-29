//Imports
const express = require('express');
const server = express(); 
const cors = require('cors')

const DummyRouter = require('../dummy/dummy-router.js')
const CommentsRouter = require('../comments/comments-router.js')
const AuthRouter = require('../auth/auth-router')
const TaskRouter = require('../tasks/task-router')
const HistoryRouter = require('../history/history-router.js')
const BookmarkRouter = require('../bookmarks/bookmarks-router.js')

server.use(cors())
server.use(express.json())


server.use('/auth', AuthRouter)
server.use('/tasks', TaskRouter)
server.use('/dummy', DummyRouter)
server.use('/comments', CommentsRouter)
server.use('/history', HistoryRouter)
server.use('/bookmarks', BookmarkRouter)

server.get('/', (req, res) => {
    res.status(200).json({message:`server listening`});
});


module.exports = server