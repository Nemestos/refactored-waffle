import cors from 'cors'
import express from 'express'
import { morganMiddleware } from './presentation/middlewares/morgan.middleware'

const server = express()
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cors())
server.use(morganMiddleware)
export default server
