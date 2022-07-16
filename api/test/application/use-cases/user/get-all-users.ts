import { GetAllUsers } from '~/application/use-cases/get-all-users'
import User from '~/domain/entities/user'
import UserRepository from '~/infrastructure/interfaces/repositories/user-repository'

describe('Get all users use case', () => {
    class MockUserRepository implements UserRepository {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
