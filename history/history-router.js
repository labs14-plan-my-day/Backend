const router = require('express').Router()

const History = require('./history-model')

router.get('/', (req, res) =>{
    History.find().then(history =>{
        res.json({ history })
    }).catch(err =>{
        res.status(500).json({ message: 'error getting history'})
    })
})

router.get('/user/:id', (req, res) => {
    History.findByUserId(req.params.id)
        .then(history => {
            if (history) {
                res.status(200).json(history)
            } else {
                res.status(404).json({ message: 'history not found' })
            }
        }).catch(err => {
            res.status(500).json({ message: 'error getting history' })
        })
})

router.delete('/:id', async (req, res) => {
    try {
        const count = await History.remove(req.params.id);
        if (count > 0) {
            res.status(200).json({ message: 'History deleted' });
        } else {
            res.status(404).json({ message: 'History ID not found' });
        }
    } catch (error) {
        res.status(500).json("There was an error deleting the history");
    }
});


module.exports = router