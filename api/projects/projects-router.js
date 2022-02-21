const Project = require('./projects-model')
const express = require('express')
const {validateId, validateProjectBody} = require('./projects-middleware')
const router = express.Router()

//endpoints

router.get('/', (req, res) => {
    Project.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
        res.status(500).json({message: err.message})
    })
})

router.get('/:id', validateId, (req, res) => {
    try {
        res.status(200).json(req.project)
    } catch (err) {
        res.status(500).json('there was a problem retrieving the project')
    }
})

router.post('/', validateProjectBody, (req, res) => {
    res.json(req.newproject)
})

module.exports = router