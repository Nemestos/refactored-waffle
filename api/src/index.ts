import { config } from './config'
import { GetAllUsers } from './application/use-cases/get-all-users'
import UsersRouter from './presentation/routers/user-router'
import server from './server'
;(async () => {
  const userMiddleware = UsersRouter(new GetAllUsers())
  server.use('/user', userMiddleware)

  server.listen(config.PORT, () => 'application running without eating rabbits')
})()
