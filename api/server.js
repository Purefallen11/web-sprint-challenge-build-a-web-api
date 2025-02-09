const express = require('express');
const server = express();
const projectRouter = require('../api/projects/projects-router')
const actionRouter = require('../api/actions/actions-router')

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
