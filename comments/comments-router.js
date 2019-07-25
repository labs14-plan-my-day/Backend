const router = require('express').Router();
const Comments = require('./comments-model')



router.get('/', (req, res) => {
    Comments.find().then(comments => {
        res.json({ comments })
    }).catch(err => res.send(err))
})

module.exports = router