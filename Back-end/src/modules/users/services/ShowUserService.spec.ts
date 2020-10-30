import ShowUserService from './ShowUserService'
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService'
import 'reflect-metadata'
import AppError from '@shared/errors/AppError'
import { v4 } from 'uuid'
import requestImages from '@shared/utils/ImageToTest'

describe('ShowUserService', () => {
  it('should be able to detail an user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const showUserService = new ShowUserService(fakeUserRepository)
    const createUserService = new CreateUserService(fakeUserRepository)

    const user = await createUserService.execute({
      name: 'Johnlenon',
      email: 'john@lenon.com',
      password: '1234567',
      enterprise_Name: 'Tx2ls',
      whatsapp: 8798789987,
      requestImages: (requestImages as unknown) as Express.Multer.File[],
    })
    const showedUser = await showUserService.execute(user.id)

    expect(showedUser).toBeTruthy()
  })
  it('should be not able to show a user with an invalid type of id', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const showUserService = new ShowUserService(fakeUserRepository)

    expect(showUserService.execute('83712')).rejects.toBeInstanceOf(AppError)
  })

  it('should be not able to show a user with that are unregistered', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const showUserService = new ShowUserService(fakeUserRepository)

    expect(showUserService.execute(v4())).rejects.toBeInstanceOf(AppError)
  })
})
