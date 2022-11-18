const express = require('express')
const errorMiddleware = require('./src/middlewares/errorMiddleware')
const indexRouter = require('./src/router/index')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', indexRouter)

app.use(errorMiddleware)

module.exports = app