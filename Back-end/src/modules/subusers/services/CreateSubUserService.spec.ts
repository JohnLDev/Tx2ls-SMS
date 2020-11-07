import CreateSubUserService from '@modules/subusers/services/CreateSubUserService'
import FakeSubUserRepository from '@modules/subusers/repositories/fakes/FakeSubUserRepository'
import { v4 } from 'uuid'
import AppError from '@shared/errors/AppError'

describe('CreateUserService', () => {
  it('should be able to create a new subUser', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const createSubUserService = new CreateSubUserService(fakeSubUserRepository)
    const subUser = await createSubUserService.execute({
      name: 'johnlenon',
      email: 'email@example.com',
      password: '1234567',
      is_Adm: false,
      user_id: v4(),
    })
    expect(subUser).toHaveProperty('id')
  })

  it('should be able to create a new subUser with invalid user_id', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const createSubUserService = new CreateSubUserService(fakeSubUserRepository)
    try {
      await createSubUserService.execute({
        name: 'johnlenon',
        email: 'email@example.com',
        password: '1234567',
        user_id: '321321321',
        is_Adm: false,
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be not able to create a new subUser with a registered email', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const createSubUserService = new CreateSubUserService(fakeSubUserRepository)
    await createSubUserService.execute({
      name: 'johnlenon',
      email: 'email@example.com',
      password: '1234567',
      is_Adm: false,
      user_id: v4(),
    })

    try {
      await createSubUserService.execute({
        name: 'johnlenon',
        email: 'email@example.com',
        password: '1234567',
        is_Adm: false,
        user_id: v4(),
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be not able to create a new subUser with a registered name', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const createSubUserService = new CreateSubUserService(fakeSubUserRepository)
    await createSubUserService.execute({
      name: 'johnlenon',
      email: 'email@example.com',
      password: '1234567',
      is_Adm: false,
      user_id: v4(),
    })

    try {
      await createSubUserService.execute({
        name: 'johnlenon',
        email: 'email2@example.com',
        password: '1234567',
        user_id: v4(),
        is_Adm: false,
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
