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
    const newProject = req.body
    if (!newProject) {
        res.status(404).json('body is required')
    } else {
        Project.insert(newProject)
            .then(project => {
                req.newproject = project
            res.status(201).json(project)
            next()
            })
    }

}

module.exports = {
    validateId,
    validateProjectBody
}