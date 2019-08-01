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

router.get('/:id', (req, res) => {
    Users.findBy(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: 'not found' })
            }
        }).catch(err => {
            res.status(500).json({ message: 'error getting user email' })
        })
})

router.get('/:email', (req, res) => {
    Users.findByEmail(req.params.email)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: 'not found' })
            }
        }).catch(err => {
            res.status(500).json({ message: 'error getting user email' })
        })
})

router.post('/register', (req, res) => {
    let {user, email} = req.body
    Users.add(user)
        .then(saved => {
            res.status(201).json(saved)
        }).catch(err => {
            if (error.errno == 19) {
                res.status(405).json({ messaage: "username in use" })

            } else {
                res.status(500).json(err)
            }

        })

    Users.findBy({ email })
    .first()
    .then(user =>{
        res.status(200).json({ user})
    })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body
    Users.findBy(username)
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                let token = generateToken(user.username)
                res.send({ message: "welcome!", token: token })
            } else {
                res.status(401).json({ message: 'invalid' })
            }
        }).catch(err => {
            console.log({ error: err.message })
            res.status(500).json(err)
        })
})

router.delete('/:id', (req, res) => {
    Users.remove(req.params.id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json({ message: 'We ran into an error deleting the uesr' });
        });
});


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