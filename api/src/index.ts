import { Signin } from '~/application/use-cases/auth/signin'
import { Signup } from '~/application/use-cases/auth/signup'
import { MongoUserDataSource } from '~/infrastructure/providers/mongoose/data-sources/mongo-user-ds'
import { UserRepositoryImpl } from '~/infrastructure/repositories/user-repository'
import { errorHandler } from '~/presentation/middlewares/error-handler.middleware'
import AuthRouter from '~/presentation/routers/auth-router'
import UsersRouter from '~/presentation/routers/user-router'
import { BcryptHasher } from '~/utils/bcrypt-hasher'
import { logger } from '~/utils/logger'
import { UserJwt } from '~/utils/user-jwt'
import { Refresh } from './application/use-cases/auth/refresh'
import { CreateEvent } from './application/use-cases/event/create-event'
import { DeleteEventById } from './application/use-cases/event/delete-event-by-id'
import { GetAllEvents } from './application/use-cases/event/get-all-events'
import { GetEventById } from './application/use-cases/event/get-event-by-id'
import { UpdateEvent } from './application/use-cases/event/update-event'
import { CreateMoto } from './application/use-cases/moto/create-moto'
import { DeleteMotoById } from './application/use-cases/moto/delete-moto-by-id'
import { GetAllMotos } from './application/use-cases/moto/get-all-motos'
import { GetMotoById } from './application/use-cases/moto/get-moto-by-id'
import { GetMotosByManufacturer } from './application/use-cases/moto/get-motos-by-manufacturer'
import { UpdateMoto } from './application/use-cases/moto/update-moto'
import AddMotoToUser from './application/use-cases/user/add-moto-to-user'
import { DeleteUserById } from './application/use-cases/user/delete-user-by-id'
import { GetAllUsers } from './application/use-cases/user/get-all-users'
import { GetUserById } from './application/use-cases/user/get-user-by-id'
import { UpdateUser } from './application/use-cases/user/update-user'
import { config } from './config'
import { connectToMongo } from './infrastructure/providers/mongoose/connector'
import { MongoEventDataSource } from './infrastructure/providers/mongoose/data-sources/mongo-event-ds'
import { MongoMotoDataSource } from './infrastructure/providers/mongoose/data-sources/mongo-moto-ds'
import { EventRepositoryImpl } from './infrastructure/repositories/event-repository'
import { MotoRepositoryImpl } from './infrastructure/repositories/moto-repository'
import EventsRouter from './presentation/routers/event-router'
import MotosRouter from './presentation/routers/moto-router'
import server from './server'
import { client } from './utils/cache'
;(async () => {
  await connectToMongo()
  await client.connect()
  const userRepo = new UserRepositoryImpl(new MongoUserDataSource())
  const eventRepo = new EventRepositoryImpl(new MongoEventDataSource())
  const motoRepo = new MotoRepositoryImpl(new MongoMotoDataSource())
  const passwordHasher = new BcryptHasher()
  const jwt = new UserJwt()
  jwt.loadOrInitRefreshList()
  const userMiddleware = UsersRouter(
    new GetAllUsers(userRepo),
    new AddMotoToUser(userRepo, motoRepo),
    new UpdateUser(userRepo),
    new GetUserById(userRepo),
    new DeleteUserById(userRepo),
    jwt
  )
  const eventsMiddleware = EventsRouter(
    new CreateEvent(eventRepo, userRepo),
    new UpdateEvent(eventRepo, userRepo),
    new GetAllEvents(eventRepo),
    new GetEventById(eventRepo),
    new DeleteEventById(eventRepo),
    jwt
  )

  const motosMiddleware = MotosRouter(
    new CreateMoto(motoRepo),
    new UpdateMoto(motoRepo),
    new GetAllMotos(motoRepo),
    new GetMotoById(motoRepo),
    new GetMotosByManufacturer(motoRepo),
    new DeleteMotoById(motoRepo),
    jwt
  )
  const authMiddleware = AuthRouter(
    new Signup(userRepo, passwordHasher),
    new Signin(userRepo, passwordHasher, jwt),
    new Refresh(userRepo, jwt)
  )
  server.use('/auth', authMiddleware)
  server.use('/users', userMiddleware)
  server.use('/events', eventsMiddleware)
  server.use('/motos', motosMiddleware)
  server.use(errorHandler)
  server.listen(config.PORT, () => logger.info('application running without eating rabbits'))
})()
