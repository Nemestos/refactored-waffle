import cors from 'cors'
import express from 'express'
import { morganMiddleware } from './presentation/middlewares/morgan.middleware'

const server = express()
server.use(express.json())
server.use(cors())
server.use(morganMiddleware)
export default server
