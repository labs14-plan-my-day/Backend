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
                res.status(404).json({ message: 'not found by id' })
            }
        }).catch(err => {
            res.status(500).json({ message: 'error getting user id' })
        })
})

router.get('/email/:email', (req, res) => {
    Users.findByEmail(req.params.email)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: 'not found by email' })
            }
        }).catch(err => {
            res.status(500).json({ message: 'error getting user id' })
        })
})

router.post('/a', async (req, res) => {
    // let { user, email } = req.body
    console.log(req.body)

    try {
        const user = await Users.findByEmail(req.body.email)

        if(user){
            res.status(200).json(user)
        } else {
            const [newUserId] = await Users.add({...req.body})
            const newUser = await Users.findBy(newUserId)
            res.status(200).json(newUser)
        }
    } catch({message}){
        res.status(500).json({message})
    }
})

router.post('/register', (req, res) => {
    let user = req.body
    Users.add(user)
        .then(saved => {
            res.status(201).json(saved)
        }).catch(error => {
            res.status(500).json(error)

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
            res.status(500).json({ message: 'We ran into an error deleting the user' });
        });
});

router.put('/:id', async (req, res) => {
    try {
        const updated = await Users.update(req.params.id, req.body);
        if (updated) {
            res.status(200).json(updated);
        } else {
            res.status(404).json({ message: 'User ID not found' });
        }
    } catch (error) {
        res.status(500).json("Error updating users");
    }
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