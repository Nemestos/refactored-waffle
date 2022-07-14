import { logger } from '~/utils/logger'
import morgan from 'morgan'
const stream = {
  write: (message: string) => logger.http(message)
}

const skipHandler = () => {
  const env = process.env.NODE_ENV || 'development'
  return env != 'development'
}

export const morganMiddleware = morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms', {
  stream,
  skipHandler
})
