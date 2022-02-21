const Project = require('./projects-model')
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    Project.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
        res.status(500).json({message: err.message})
    })
})

module.exports = router