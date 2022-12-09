import express from 'express' // express
import { errorHandler } from './src/middlewares/errorHandler.js' // midleware de error
import indexRouter from './src/routes/index.js' // router
import logger from 'morgan' // logger de morgan
import dotenv from "dotenv"
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', indexRouter)
app.use(logger('dev'))

// import db config
const DATACORE = process.env.DATACORE
if (DATACORE === 'Mongodb') {
    const dbImport = await import(`./src/config/${DATACORE}.js`)
    const dbConfig = dbImport.default
    dbConfig()
    .then(() => console.info('Connected to MongoDB'))
    .catch((err) => console.error(err))
}

app.use(errorHandler)

export default app