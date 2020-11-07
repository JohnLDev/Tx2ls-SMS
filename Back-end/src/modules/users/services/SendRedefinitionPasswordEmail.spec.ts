import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService'
import requestImages from '@shared/utils/ImageToTest'
import SendRedefinitionPasswordEmail from '@modules/users/services/SendRedefinitionPasswordEmail'

describe('SendRedefinitionPasswordEmail', () => {
  it('should be able to send a recovery email', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const createUserService = new CreateUserService(fakeUserRepository)
    const sendRedefinitionPasswordEmail = new SendRedefinitionPasswordEmail(
      fakeUserRepository,
    )
    const user = await createUserService.execute({
      name: 'Johnlenon',
      email: 'john@lenon.com',
      password: '1234567',
      enterprise_Name: 'Tx2ls312312312',
      whatsapp: 8798789987,
      requestImages: (requestImages as unknown) as Express.Multer.File[],
    })
    const Email = await sendRedefinitionPasswordEmail.execute(user.email)
    expect(Email).toBeTruthy()
  })

  it('should be not able to send a recovery email to a unregistered email', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const sendRedefinitionPasswordEmail = new SendRedefinitionPasswordEmail(
      fakeUserRepository,
    )
    try {
      await sendRedefinitionPasswordEmail.execute('email@nãovalido.com')
    } catch (error) {
      expect(error.message).toBe('User not found')
    }
  })
})
