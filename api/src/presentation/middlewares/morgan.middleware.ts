import { logger } from '~/utils/logger'
import morgan from 'morgan'
const stream = {
  write: (message: string) => logger.http(message)
}

const skip = () => {
  const env = process.env.NODE_ENV || 'development'
  return env != 'development'
}

export const morganMiddleware = morgan('combined', { stream, skip })
