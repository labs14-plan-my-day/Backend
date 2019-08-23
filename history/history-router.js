const router = require('express').Router()

const History = require('./history-model')

router.get('/', (req, res) =>{
    History.find().then(history =>{
        res.json({ history })
    }).catch(err =>{
        res.status(500).json({ message: 'error getting history'})
    })
})


module.exports = router