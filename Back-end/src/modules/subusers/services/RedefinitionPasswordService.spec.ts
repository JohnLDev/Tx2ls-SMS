import FakeSubUserRepository from '@modules/subusers/repositories/fakes/FakeSubUserRepository'
import CreateSubUserService from '@modules/subusers/services/CreateSubUserService'

import RedefinitionPasswordService from './RedefinitionPasswordService'
import { compare } from 'bcryptjs'
import SendRedefinitionPasswordEmail from './SendRedefinitionPasswordEmail'
import { v4 } from 'uuid'

describe('RedefinitionPasswordService', () => {
  it('should be able to redefine password', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const createUserService = new CreateSubUserService(fakeSubUserRepository)
    const redefinitionPasswordService = new RedefinitionPasswordService(
      fakeSubUserRepository,
    )
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

    const token = await sendRedefinitionPasswordEmail.execute(user.email, v4())
    const userChanged = await redefinitionPasswordService.execute({
      password: '1234568',
      passwordAgain: '1234568',
      validationKey: token,
      user_id: v4(),
    })

    expect(await compare('1234568', userChanged.password)).toBeTruthy()
  })

  it('should be not able redefine password that does not match', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const redefinitionPasswordService = new RedefinitionPasswordService(
      fakeSubUserRepository,
    )

    try {
      await redefinitionPasswordService.execute({
        password: '1234568',
        passwordAgain: '123423568',
        validationKey: 'token',
        user_id: v4(),
      })
    } catch (error) {
      expect(error.message).toBe('passwords does not match')
    }
  })

  it('should be not able redefine password that does not match', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const redefinitionPasswordService = new RedefinitionPasswordService(
      fakeSubUserRepository,
    )

    try {
      await redefinitionPasswordService.execute({
        password: '1234568',
        passwordAgain: '1234568',
        user_id: v4(),
        validationKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDQ3NjQ2NjQsImV4cCI6MTYwNDc3MTg2NCwic3ViIjoiam9obkBsZW5vbi5jb20ifQ.jv0U_QxkDTJv9d0OJI2TGZHmnB06LvD40f7CqgxcHhI',
      })
    } catch (error) {
      expect(error.message).toBe('Invalid validation key')
    }
  })
})
