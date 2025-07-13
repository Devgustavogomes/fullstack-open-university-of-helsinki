const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/Blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')

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
app.use('/api/blogs', blogRouter )
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app