import UserDto from '~/domain/dtos/user-dto'
import User from '~/domain/entities/user'
import UserRepository from '~/domain/interfaces/repositories/user-repository'
import { GetAllUsers } from '../get-all-users'

describe('Get all users use case', () => {
  class MockUserRepository implements UserRepository {
    createUser(user: User): Promise<boolean> {
      throw new Error('Method not implemented.')
    }
    getUsers(): Promise<User[]> {
      throw new Error('Method not implemented.')
    }
  }

  let mockUserRepository: UserRepository
  beforeEach(() => {
    jest.clearAllMocks()
    mockUserRepository = new MockUserRepository()
  })

  test('should return all users', async () => {
    const expectedData: User[] = [
      { id: '1', email: 'etna@gmail.com', firstname: 'Léo', surname: 'Turpin', password: 'password' }
    ]
    jest.spyOn(mockUserRepository, 'getUsers').mockImplementation(() => Promise.resolve(expectedData))
    const getAllUsersUseCase = new GetAllUsers(mockUserRepository)
    const result = await getAllUsersUseCase.execute()
    expect(result).toStrictEqual(expectedData)
  })
})
