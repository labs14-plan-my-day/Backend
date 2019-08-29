const router = require('express').Router();
const Bookmarks = require('./bookmarks-model')



router.get('/', (req, res) => {
    Bookmarks.find()
        .then(bookmarks => {
            res.json({ bookmarks })
        }).catch(err => res.send(err))
})

router.get('/user/:id', (req, res) => {
    Bookmarks.findByUserId(req.params.id)
        .then(bookmark => {
            if (bookmark) {
                res.status(200).json(bookmark)
            } else {
                res.status(404).json({ message: 'bookmark not found' })
            }
        }).catch(err => {
            res.status(500).json({ message: 'error getting bookmarks ' })
        })
})

router.post('/', (req, res) => {
    Bookmarks.add(req.body).then(bookmark => {
        res.status(200).json(bookmark)
    }).catch(err => {
        res.status(500).json({ message: "there was an error adding the bookmark" })
    })
})

router.delete('/:id', async (req, res) => {
    try {
        const count = await Bookmarks.remove(req.params.id);
        if (count > 0) {
            res.status(200).json({ message: 'Bookmark deleted' });
        } else {
            res.status(404).json({ message: 'Bookmark ID not found' });
        }
    } catch (error) {
        res.status(500).json("There was an error deleting the bookmark");
    }
});

module.exports = router