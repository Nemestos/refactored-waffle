import request from 'supertest'
import User from '~/domain/entities/user'
import CreateUserUseCase from '~/domain/interfaces/use-cases/user/create-user'
import GetAllUsersUseCase, { GetAllUsersErrors } from '~/domain/interfaces/use-cases/user/get-all-user'
import UsersRouter from '~/presentation/routers/user-router'
import { StatusCodes } from 'http-status-codes'
import server from '~/server'

class MockGetAllUsersUseCase implements GetAllUsersUseCase {
  execute(): Promise<User[]> {
    throw new Error('not impl')
  }
}

class MockCreateUserUseCase implements CreateUserUseCase {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(user: User): Promise<boolean> {
    throw new Error('not impl')
  }
}

describe('User Router', () => {
  let mockGetAllUsersUseCase: GetAllUsersUseCase
  let mockCreateUserUseCase: CreateUserUseCase
  beforeAll(() => {
    mockGetAllUsersUseCase = new MockGetAllUsersUseCase()
    mockCreateUserUseCase = new MockCreateUserUseCase()
    server.use('/users', UsersRouter(mockGetAllUsersUseCase, mockCreateUserUseCase))
  })
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /users', () => {
    test('should return 200 with users data', async () => {
      const expectedData: User[] = [
        { id: '1', email: 'etna@gmail.com', firstname: 'Léo', surname: 'Turpin', password: 'pas hashé lol' }
      ]
      jest.spyOn(mockGetAllUsersUseCase, 'execute').mockResolvedValue(expectedData)
      const resp = await request(server).get('/users')
      expect(resp.status).toBe(StatusCodes.OK)
      expect(mockGetAllUsersUseCase.execute).toBeCalledTimes(1)
      expect(resp.body).toStrictEqual(expectedData)
    })
    test('should return 500 on use case error', async () => {
      jest.spyOn(mockGetAllUsersUseCase, 'execute').mockRejectedValue(Error())
      const resp = await request(server).get('/users')
      expect(resp.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
      expect(resp.body).toStrictEqual({ message: GetAllUsersErrors.INTERNAL_SERVER_ERROR })
    })
  })
})
