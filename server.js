import express from 'express'
const app = express()

import dotenv from 'dotenv'
import morgan from 'morgan'
dotenv.config()

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

import connectDB from './db/connect.js'
import "express-async-errors"

import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'
import eventsRouter from './routes/eventsRoutes.js'
import activitiesRouter from './routes/activityRoutes.js'

import authenticateUser from './middleware/auth.js'

if (process.env.NODE_ENV != 'production') {
    app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './client/build')))
app.use(express.json())

app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
//routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)
app.use('/api/v1/events', eventsRouter)
app.use('/api/v1/activities', activitiesRouter)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

//connection
const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()