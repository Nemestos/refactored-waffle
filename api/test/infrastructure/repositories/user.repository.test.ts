import User from '~/domain/entities/user'
import { UserDataSource } from '../interfaces/data-sources/user-ds'
import UserRepository from '../interfaces/repositories/user-repository'
import { UserRepositoryImpl } from '~/infrastructure/repositories/user-repository'
class MockUserDataSource implements UserDataSource {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(user: User): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  getAll(): Promise<User[]> {
    throw new Error('Method not implemented.')
  }
}

describe('User Repository', () => {
  let mockUserDataSource: UserDataSource
  let userRepository: UserRepository

  beforeEach(() => {
    jest.clearAllMocks()
    mockUserDataSource = new MockUserDataSource()
    userRepository = new UserRepositoryImpl(mockUserDataSource)
  })
  describe('getAllUsers', () => {
    test('should return all users', async () => {
      const expectedData: User[] = [
        { id: '1', email: 'etna@gmail.com', firstname: 'Léo', surname: 'Turpin', password: 'password' }
      ]

      jest.spyOn(mockUserDataSource, 'getAll').mockImplementation(() => Promise.resolve(expectedData))
      const res = await userRepository.getUsers()
      expect(res).toBe(expectedData)
    })
  })
})
