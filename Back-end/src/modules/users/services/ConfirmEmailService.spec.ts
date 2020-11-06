import AppError from '@shared/errors/AppError'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService'
import ConfirmUserService from './ConfirmEmailService'
import { v4 } from 'uuid'
import requestImages from '@shared/utils/ImageToTest'

describe('ConfirmUserService', () => {
  it('should be able to confirm a valid user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const createUserService = new CreateUserService(fakeUserRepository)
    const confirmEmailService = new ConfirmUserService(fakeUserRepository)

    const user = await createUserService.execute({
      name: 'Johnlenon',
      email: 'john@lenon.com',
      password: '1234567',
      enterprise_Name: 'Tx2ls312312312',
      whatsapp: 8798789987,
      requestImages: (requestImages as unknown) as Express.Multer.File[],
    })
    const confirmedUser = await confirmEmailService.execute(user.verify_Key)

    expect(confirmedUser.is_Verify).toBe(true)
  })

  it('should be not able to confirm a already confirmed user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const createUserService = new CreateUserService(fakeUserRepository)
    const confirmEmailService = new ConfirmUserService(fakeUserRepository)

    const user = await createUserService.execute({
      name: 'Johnlenon',
      email: 'john@lenon.com',
      password: '1234567',
      enterprise_Name: 'Tx2ls312312312',
      whatsapp: 8798789987,
      requestImages: (requestImages as unknown) as Express.Multer.File[],
    })
    await confirmEmailService.execute(user.verify_Key)

    expect(confirmEmailService.execute(user.verify_Key)).rejects.toBeInstanceOf(
      AppError,
    )
  })

  it('should be not able to confirm a user with a invalid key', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const confirmEmailService = new ConfirmUserService(fakeUserRepository)

    expect(confirmEmailService.execute('asjidasj')).rejects.toBeInstanceOf(
      AppError,
    )
  })

  it('should be not able to confirm a user with a unregister key', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const confirmEmailService = new ConfirmUserService(fakeUserRepository)

    expect(confirmEmailService.execute(v4())).rejects.toBeInstanceOf(AppError)
  })
})
