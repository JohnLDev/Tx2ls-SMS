import AppError from '@shared/errors/AppError'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService'
import IndexUserService from './IndexUserService'
import User from '@modules/users/infra/typeorm/entities/User'
import requestImages from '@shared/utils/ImageToTest'

describe('IndexUserService', async () => {
  it('should be able to list all users', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const createUserService = new CreateUserService(fakeUserRepository)
    const indexUserService = new IndexUserService(fakeUserRepository)
    await createUserService.execute({
      name: 'Johnlenon',
      email: 'john@lenon.com',
      password: '1234567',
      enterprise_Name: 'Tx2ls312312312',
      whatsapp: 8798789987,
      requestImages: (requestImages as unknown) as Express.Multer.File[],
    })
    const users = (await indexUserService.execute()) as User[]
    expect(users.length).toBe(1)
  })

  it('should be able to filter by enterprise_Name', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const createUserService = new CreateUserService(fakeUserRepository)
    const indexUserService = new IndexUserService(fakeUserRepository)
    const newUser = await createUserService.execute({
      name: 'Johnlenon',
      email: 'john@lenon.com',
      password: '1234567',
      enterprise_Name: 'Tx2ls312312312',
      whatsapp: 8798789987,
      requestImages: (requestImages as unknown) as Express.Multer.File[],
    })
    const user = await indexUserService.execute(newUser.enterprise_Name)
    expect(user.length).toBeGreaterThanOrEqual(1)
  })

  it('should be not able to list with no registered users', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const indexUserService = new IndexUserService(fakeUserRepository)

    expect(indexUserService.execute()).rejects.toBeInstanceOf(AppError)
  })

  it('should be not able to filter with an invalid enterprise_Name', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const indexUserService = new IndexUserService(fakeUserRepository)

    try {
      await indexUserService.execute('invalid')
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
