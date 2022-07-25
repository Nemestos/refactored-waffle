export const config = {
  PORT: process.env.API_PORT || 3000,
  JWT_KEY: process.env.JWT_KEY || 'key',
  DB_PORT: process.env.MONGODB_PORT || 27017,
  DB_HOST: process.env.MONGODB_HOST || 'localhost',
  DB: process.env.MONGODB_DB || 'db'
}
