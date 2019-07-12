const router = require('express').Router();
const Users = require('./auth-model')
const jwtCheck = require('./jwtCheck')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.json({ users })
        }).catch(err => res.send(err))
})

router.post('/register', (req, res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 4);
    user.password = hash;
    Users.add(user)
        .then(saved => {
            res.status(201).json(saved)
        }).catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;