const router = require('express').Router();
const Users = require('./auth-model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const secret = require('../secret.js');

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

router.post('/login', (req, res)=> {
    let { username, password} = req.body
    console.log({username})
    Users.findBy( username )
    .first()
    .then(user =>{
        console.log(user)
        if(user && bcrypt.compareSync(password, user.password)){
            let token = generateToken(user.username)
            res.send({message: "welcome!", token: token})
        } else {
            res.status(401).json({ message: 'invalid'})
        }
    }).catch(err =>{
        console.log({error:err.message})
        res.status(500).json(err)
    })
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };

    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, secret.jwtSecret, options);
}
module.exports = router;