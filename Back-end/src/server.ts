import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import routes from './routes'
import './database'
import AppError from './errors/AppError'

import Dotenv from 'dotenv'
const dotenv = Dotenv

dotenv.config()

const app = express()

app.use(express.json())

app.use(routes)

app.use(
  (error: Error, request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'client error',
        message: error.message,
      })
    }
    console.error(error)
    return response.status(500).json({
      status: 'code error',
      message: 'internal server error',
    })
  },
)

app.listen(3333, () => {
  console.log('🚀Server started on port 3333!')
})
