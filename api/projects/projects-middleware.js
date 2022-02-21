// add middlewares here related to projects
const Project = require('./projects-model')

const validateId = async (req, res, next) => {
    try {
        const { id } = req.params
        const project = await Project.get(id)
        if (!project) {
            res.status(400).json('unable to retrieve project')
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        res.status(500).json('bad request')
    }
}

const validateProjectBody = (req, res, next) => {
    const project = req.body
    if (!project.name) {
        res.status(400).json('name is required')
    } else if(!project.description) {
        res.status(400).json('description is required')
    } else {
        req.name = project.name
        req.description = project.description
        req.completed = project.completed
        next()
    }
}

module.exports = {
    validateId,
    validateProjectBody
}