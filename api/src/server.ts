import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { config } from '~/config'
import { morganMiddleware } from './presentation/middlewares/morgan.middleware'
const server = express()
server.use(cookieParser())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(
  cors({
    origin: `http://localhost:${config.FRONT_PORT}`,
    credentials: true
  })
)
server.use(morganMiddleware)
export default server
