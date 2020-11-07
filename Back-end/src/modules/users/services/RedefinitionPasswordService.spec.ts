import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService'
import requestImages from '@shared/utils/ImageToTest'
import RedefinitionPasswordService from '@modules/users/services/RedefinitionPasswordService'
import { compare } from 'bcryptjs'
import SendRedefinitionPasswordEmail from './SendRedefinitionPasswordEmail'

describe('RedefinitionPasswordService', () => {
  it('should be able to redefine password', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const createUserService = new CreateUserService(fakeUserRepository)
    const redefinitionPasswordService = new RedefinitionPasswordService(
      fakeUserRepository,
    )
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
    const token = await sendRedefinitionPasswordEmail.execute(user.email)
    const userChanged = await redefinitionPasswordService.execute({
      password: '1234568',
      passwordAgain: '1234568',
      validationKey: token,
    })

    expect(await compare('1234568', userChanged.password)).toBeTruthy()
  })

  it('should be not able redefine password that does not match', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const redefinitionPasswordService = new RedefinitionPasswordService(
      fakeUserRepository,
    )

    try {
      await redefinitionPasswordService.execute({
        password: '1234568',
        passwordAgain: '123423568',
        validationKey: 'token',
      })
    } catch (error) {
      expect(error.message).toBe('passwords does not match')
    }
  })

  it('should be not able redefine password that does not match', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const redefinitionPasswordService = new RedefinitionPasswordService(
      fakeUserRepository,
    )

    try {
      await redefinitionPasswordService.execute({
        password: '1234568',
        passwordAgain: '1234568',
        validationKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDQ3NjQ2NjQsImV4cCI6MTYwNDc3MTg2NCwic3ViIjoiam9obkBsZW5vbi5jb20ifQ.jv0U_QxkDTJv9d0OJI2TGZHmnB06LvD40f7CqgxcHhI',
      })
    } catch (error) {
      expect(error.message).toBe('Invalid validation key')
    }
  })
})
