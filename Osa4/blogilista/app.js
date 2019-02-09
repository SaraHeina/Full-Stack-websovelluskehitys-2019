const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const logger = require('./utils/logger')

logger.info('connecting to', config.MONGODB_URI)

/*const connect = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
        logger.info('connected to MongoDB')
    } catch (error) {
        logger.error('error connection to MongoDB:', error.message)
    }
}
connect()*/
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)

module.exports = app