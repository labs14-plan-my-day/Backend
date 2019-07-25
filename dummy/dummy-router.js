const router = require('express').Router()
const Dummy = require('./dummy-model.js')

router.get('/', (req,res)=>{
    Dummy.find()
        .then(dummy=>{
            res.status(200).json(dummy);
        }).catch(err =>{
            res.status(500).json({ message: 'error getting data'})
        })
})

module.exports = router