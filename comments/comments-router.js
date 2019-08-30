const router = require('express').Router();
const Comments = require('./comments-model')



router.get('/', (req, res) => {
    Comments.find().then(comments => {
        res.json({ comments })
    }).catch(err => res.send(err))
})

router.post('/', (req, res) => {
    Comments.add(req.body).then(comment => {
        res.status(200).json(comment)
    }).catch(err => {
        res.status(500).json({ message: "there was an error adding the comment" })
    })
})

router.delete('/:id', async (req, res) => {
    try {
        const count = await Comments.remove(req.params.id);
        if (count > 0) {
            res.status(200).json({ message: 'comment deleted' });
        } else {
            res.status(404).json({ message: 'comment ID not found' });
        }
    } catch (error) {
        res.status(500).json("There was an error deleting the comment");
    }
});

router.get('/:id', (req, res) => {
    Comments.findByTaskId(req.params.id)
        .then(comment => {
            if (comment) {
                res.status(200).json(comment)
            } else {
                res.status(404).json({ message: 'comment not found' })
            }
        }).catch(err => {
            res.status(500).json({ message: 'error getting comment' })
        })
})



module.exports = router