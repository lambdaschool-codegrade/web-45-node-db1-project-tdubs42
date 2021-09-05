const express = require('express')
const helmet = require('helmet')
const accountsRouter = require('./accounts/accounts-router')
const logger = require('./middleware')
const server = express()

server.use(express.json())
server.use(helmet())
server.use('/api/accounts', logger, accountsRouter)

module.exports = server
