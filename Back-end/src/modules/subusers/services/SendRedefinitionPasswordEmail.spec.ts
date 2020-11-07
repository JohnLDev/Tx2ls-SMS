import FakeSubUserRepository from '../repositories/fakes/FakeSubUserRepository'
import CreateSubUserService from './CreateSubUserService'
import SendRedefinitionPasswordEmail from '@modules/subusers/services/SendRedefinitionPasswordEmail'
import { v4 } from 'uuid'

describe('SendRedefinitionPasswordEmail', () => {
  it('should be able to send a recovery email', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const createUserService = new CreateSubUserService(fakeSubUserRepository)
    const sendRedefinitionPasswordEmail = new SendRedefinitionPasswordEmail(
      fakeSubUserRepository,
    )
    const user = await createUserService.execute({
      name: 'Johnlenon',
      email: 'john@lenon.com',
      password: '1234567',
      is_Adm: false,
      user_id: v4(),
    })
    const Email = await sendRedefinitionPasswordEmail.execute(user.email, v4())
    expect(Email).toBeTruthy()
  })

  it('should be not able to send a recovery email to a unregistered email', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const sendRedefinitionPasswordEmail = new SendRedefinitionPasswordEmail(
      fakeSubUserRepository,
    )
    try {
      await sendRedefinitionPasswordEmail.execute('email@nãovalido.com', v4())
    } catch (error) {
      expect(error.message).toBe('User not found')
    }
  })
})
