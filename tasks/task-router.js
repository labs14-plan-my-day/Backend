const router = require('express').Router();
const Tasks = require('./task-model')



router.get('/', (req, res) => {
    Tasks.find()
        .then(tasks => {
            res.json({ tasks })
        }).catch(err => res.send(err))
})

router.get('/comment/:id', (req, res) => {
    Tasks.findCommentById(req.params.id).
        then(task => {
            if (task) {
                res.status(200).json(task)
            } else {
                res.status(404).json({ message: 'not found' })
            }
        }).catch(err => {
            res.status(500).json({ message: 'error with comments' })
        })
})


router.get('/user/:id', (req, res) => {
    Tasks.findByUserId(req.params.id)
        .then(task => {
            if (task) {
                res.status(200).json(task)
            }
             else if (!task){
                 res.status(200).json({message:"no tasks for the given user id"})
             } else {
                res.status(404).json({ message: 'not found' })
            }
        }).catch(err => {
            res.status(500).json({ message: 'error getting tasks' })
        })
})

router.get('/:id', (req, res) => {
    Tasks.findById(req.params.id)
        .then(task => {
            if (task) {
                res.status(200).json(task)
            } else {
                res.status(404).json({ message: 'not found' })
            }
        }).catch(err => {
            res.status(500).json({ message: 'error getting tasks' })
        })
})

router.post('/', (req, res) => {
    Tasks.add(req.body).then(task => {
        res.status(200).json(task)
    }).catch(err => {
        res.status(500).json({ message: "there was an error adding the task" })
    })
})

router.put('/:id', async (req, res) => {
    try {
        const updated = await Tasks.update(req.params.id, req.body);
        if (updated) {
            res.status(200).json(updated);
        } else {
            res.status(404).json({ message: 'Task ID not found' });
        }
    } catch (error) {
        res.status(500).json("Error updating tasks");
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const count = await Tasks.remove(req.params.id);
        if (count > 0) {
            res.status(200).json({ message: 'Task deleted' });
        } else {
            res.status(404).json({ message: 'Task ID not found' });
        }
    } catch (error) {
        res.status(500).json("There was an error deleting the task");
    }
});

module.exports = router