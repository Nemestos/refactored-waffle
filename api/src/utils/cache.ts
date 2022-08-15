import { createClient } from 'redis'
import { config } from '~/config'
import { logger } from './logger'
export function getRedisCacheClient() {
  const client = createClient({
    url: `redis://${config.CACHE_HOST}:${config.CACHE_PORT}`
  })
  client.on('error', (err) => logger.error('error with redis client', err))
  return client
}
export const client = getRedisCacheClient()
