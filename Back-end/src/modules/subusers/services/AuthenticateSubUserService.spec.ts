import CreateSubUserService from '@modules/subusers/services/CreateSubUserService'
import FakeSubUserRepository from '@modules/subusers/repositories/fakes/FakeSubUserRepository'
import AuthenticateSubUserService from '@modules/subusers/services/AuthenticateSubUserService'
import { v4 } from 'uuid'
import AppError from '@shared/errors/AppError'
import { ValidationError } from 'yup'

describe('AuthenticateSubUserService', () => {
  it('should be able to autheticate a subUser', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const createSubUserService = new CreateSubUserService(fakeSubUserRepository)
    const authenticateSubUserService = new AuthenticateSubUserService(
      fakeSubUserRepository,
    )
    const subUser = await createSubUserService.execute({
      name: 'johnlenon',
      email: 'email@example.com',
      password: '1234567',
      user_id: v4(),
      is_Adm: false,
    })
    const { token } = await authenticateSubUserService.execute({
      email: subUser.email,
      password: '1234567',
      user_id: v4(),
    })
    expect(token).toBeTruthy()
  })
  it('should be not able to authenticate a subUser with a invalid email', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const authenticateSubUserService = new AuthenticateSubUserService(
      fakeSubUserRepository,
    )
    try {
      await authenticateSubUserService.execute({
        email: 'nãoéemail',
        password: '1234567',
        user_id: v4(),
      })
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError)
    }
  })

  it('should be not able to authenticate a subUser with a unregistered email', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const authenticateSubUserService = new AuthenticateSubUserService(
      fakeSubUserRepository,
    )
    try {
      await authenticateSubUserService.execute({
        email: 'nãoestou@registrado.com',
        password: '1234567',
        user_id: v4(),
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be not able to authenticate a subUser with a wrong password', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const authenticateSubUserService = new AuthenticateSubUserService(
      fakeSubUserRepository,
    )
    const createSubUserService = new CreateSubUserService(fakeSubUserRepository)

    const subUser = await createSubUserService.execute({
      name: 'johnlenon',
      email: 'email@example.com',
      password: '1234567',
      user_id: v4(),
      is_Adm: false,
    })

    try {
      await authenticateSubUserService.execute({
        email: subUser.email,
        password: '123567',
        user_id: v4(),
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
