const Action = require('./actions-model')
const express = require('express')
const router = express.Router()

//endpoints

router.get('/', (req, res) => {
    Action.get()
        .then(action => {
        res.status(200).json(action)
        }).catch(() => {
        res.status(500).json('could not retrieve actions')
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Action.get(id)
        .then(action => {
            if (!action) {
                res.status(404).json(`no action with id ${id}`)
            } else {
                res.status(200).json(action)
            }
        }).catch(() => {
        res.status(500).json('problem retrieving action')
    })
})

router.post('/', (req, res) => {
    const newPost = req.body

    if (!newPost) {
        res.status(400).json('body required')
    } else { 
        Action.post(newPost)
            .then(post => {
                res.status(201).json(post)
            }).catch(() => {
            res.status(500).json('there was a problem posting your action')
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const update = req.body

        const updatedAction = await Action.update(id, update)
            .then(() => {
            res.status(200).json(updatedAction)
            }).catch(() => {
            res.status(500).json('could not find or update action')
        })
        
    } catch (err) {
        res.status(500).json('there was a problem updating action')
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Action.remove(id)
        .then(deletedAction => {
            if (!deletedAction) {
            res.status(404).json(`action with id ${id} could not be found`)
            } else {
                res.status(200).json(deletedAction)
        }
        }).catch(() => {
        res.status(500).json('there was a problem deleting the action')
    })
})

module.exports = router