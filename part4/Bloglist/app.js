const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/Blogs')
const userRouter = require('./controllers/createUser')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')
const loginRouter = require('./controllers/login')

const app = express()

async function connectDB(){
  try {
    await mongoose.connect(config.MONGODB_URI)

    logger.info('connected to MongoDB')
  } catch (error) {
    logger.error('error connection to MongoDB:', error.message)
  }
}


connectDB()

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/users', userRouter )
app.use('/api/login', loginRouter )
app.use('/api/blogs',middleware.userExtractor, blogRouter )
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app