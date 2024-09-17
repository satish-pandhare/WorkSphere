import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import errorHandler from './middlewares/error.handler.js'
import userRouter from './routes/user.routes.js'
import AppError from './utils/appError.js'
import logger from './utils/logger.js'

const app = express()

// MIDDLEWARES
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Route Handlers

app.use('/api/v1/users', userRouter)

app.get('/', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello World',
  })
})

app.all('*', (req, res, next) => {
  logger.error(`Can't find ${req.originalUrl}`)
  next(new AppError(`Can't find ${req.originalUrl}`, 404))
})

app.use(errorHandler)

export default app
