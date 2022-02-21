const Action = require('./actions-model')
const express = require('express')
const res = require('express/lib/response')
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

module.exports = router