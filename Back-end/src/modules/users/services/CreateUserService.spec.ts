import AppError from '@shared/errors/AppError'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService'
import requestImages from '@shared/utils/ImageToTest'

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const createUserService = new CreateUserService(fakeUserRepository)
    const user = await createUserService.execute({
      name: 'Johnlenon',
      email: 'john@lenon.com',
      password: '1234567',
      enterprise_Name: 'Tx2ls',
      whatsapp: 8798789987,
      requestImages: (requestImages as unknown) as Express.Multer.File[],
    })
    expect(user).toHaveProperty('id')
  })

  it('should be no able to create a new user without all fields', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const createUserService = new CreateUserService(fakeUserRepository)

    expect(
      createUserService.execute({
        name: '',
        email: '',
        password: '',
        enterprise_Name: '',
        whatsapp: 8798789987,
        requestImages: (requestImages as unknown) as Express.Multer.File[],
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be no able to create a new user with the same email', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const createUserService = new CreateUserService(fakeUserRepository)
    await createUserService.execute({
      name: 'Johnlenon',
      email: 'john@lenon.com',
      password: '1234567',
      enterprise_Name: 'Tx2ls',
      whatsapp: 8798789987,
      requestImages: (requestImages as unknown) as Express.Multer.File[],
    })
    expect(
      createUserService.execute({
        name: 'Johnlenon',
        email: 'john@lenon.com',
        password: '1234567',
        enterprise_Name: 'Tx2ls',
        whatsapp: 8798789987,
        requestImages: (requestImages as unknown) as Express.Multer.File[],
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
