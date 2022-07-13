import cors from 'cors'
import express from 'express'

const server = express()
server.use(express.json())
server.use(cors())
export default server
