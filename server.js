const express = require('express')
const cors = require('cors')
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')
const logger = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')

const server = express()

server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
})

server.use(logger("long"))
server.use('/users', userRouter)
server.use('/posts', postRouter)
server.use(errorHandler())
//custom middleware

module.exports = server;