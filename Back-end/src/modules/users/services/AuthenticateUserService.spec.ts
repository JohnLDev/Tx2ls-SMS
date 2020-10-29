import AppError from '@shared/errors/AppError'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService'
import AuthenticateUserService from './AuthenticateUserService'
import ConfirmUserService from './ConfirmEmailService'

import { ValidationError } from 'yup'

describe('AuthenticateUserService', () => {
  it('should be able to authenticate a valid user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const createUserService = new CreateUserService(fakeUserRepository)
    const confirmUserService = new ConfirmUserService(fakeUserRepository)
    const authUserService = new AuthenticateUserService(fakeUserRepository)

    const requestImages = [
      {
        fieldname: 'images',
        originalname: 'thumb-1920-954241.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination:
          '/home/john/prog/hendriko-store/Back-end/src/upload/images',
        filename: '467f13ba3f0b-thumb-1920-954241.jpg',
        path:
          '/home/john/prog/hendriko-store/Back-end/src/upload/images/467f13ba3f0b-thumb-1920-954241.jpg',
        size: 96071,
      },
      {
        fieldname: 'images',
        originalname: 'dns net.png',
        encoding: '7bit',
        mimetype: 'image/png',
        destination:
          '/home/john/prog/hendriko-store/Back-end/src/upload/images',
        filename: '4a5f948db655-dns_net.png',
        path:
          '/home/john/prog/hendriko-store/Back-end/src/upload/images/4a5f948db655-dns_net.png',
        size: 4667,
      },
    ]
    const user = await createUserService.execute({
      name: 'Johnlenon',
      email: 'john@lenon.com',
      password: '1234567',
      enterprise_Name: 'Tx2ls',
      whatsapp: 8798789987,
      requestImages: (requestImages as unknown) as Express.Multer.File[],
    })

    await confirmUserService.execute(user.verify_Key)

    const authenticatedUser = await authUserService.execute({
      email: user.email,
      password: '1234567',
    })
    expect(authenticatedUser).toHaveProperty('token')
  })

  it('should be not able to authenticate an invalid email', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const authUserService = new AuthenticateUserService(fakeUserRepository)

    expect(
      authUserService.execute({ email: 'johnlenon.com', password: '1234567' }),
    ).rejects.toBeInstanceOf(ValidationError)
  })

  it('should be not able to authenticate an invalid user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const authUserService = new AuthenticateUserService(fakeUserRepository)

    expect(
      authUserService.execute({
        email: 'email@gmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be not able to authenticate a user with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const createUserService = new CreateUserService(fakeUserRepository)
    const confirmUserService = new ConfirmUserService(fakeUserRepository)
    const authUserService = new AuthenticateUserService(fakeUserRepository)

    const requestImages = [
      {
        fieldname: 'images',
        originalname: 'thumb-1920-954241.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination:
          '/home/john/prog/hendriko-store/Back-end/src/upload/images',
        filename: '467f13ba3f0b-thumb-1920-954241.jpg',
        path:
          '/home/john/prog/hendriko-store/Back-end/src/upload/images/467f13ba3f0b-thumb-1920-954241.jpg',
        size: 96071,
      },
      {
        fieldname: 'images',
        originalname: 'dns net.png',
        encoding: '7bit',
        mimetype: 'image/png',
        destination:
          '/home/john/prog/hendriko-store/Back-end/src/upload/images',
        filename: '4a5f948db655-dns_net.png',
        path:
          '/home/john/prog/hendriko-store/Back-end/src/upload/images/4a5f948db655-dns_net.png',
        size: 4667,
      },
    ]
    const user = await createUserService.execute({
      name: 'Johnlenon',
      email: 'john@lenon.com',
      password: '1234567',
      enterprise_Name: 'Tx2ls',
      whatsapp: 8798789987,
      requestImages: (requestImages as unknown) as Express.Multer.File[],
    })

    await confirmUserService.execute(user.verify_Key)

    expect(
      authUserService.execute({
        email: user.email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be not able to authenticate a user unverifyed', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const createUserService = new CreateUserService(fakeUserRepository)
    const authUserService = new AuthenticateUserService(fakeUserRepository)

    const requestImages = [
      {
        fieldname: 'images',
        originalname: 'thumb-1920-954241.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination:
          '/home/john/prog/hendriko-store/Back-end/src/upload/images',
        filename: '467f13ba3f0b-thumb-1920-954241.jpg',
        path:
          '/home/john/prog/hendriko-store/Back-end/src/upload/images/467f13ba3f0b-thumb-1920-954241.jpg',
        size: 96071,
      },
      {
        fieldname: 'images',
        originalname: 'dns net.png',
        encoding: '7bit',
        mimetype: 'image/png',
        destination:
          '/home/john/prog/hendriko-store/Back-end/src/upload/images',
        filename: '4a5f948db655-dns_net.png',
        path:
          '/home/john/prog/hendriko-store/Back-end/src/upload/images/4a5f948db655-dns_net.png',
        size: 4667,
      },
    ]
    await createUserService.execute({
      name: 'Johnlenon',
      email: 'john@gmail.com',
      password: '1234567',
      enterprise_Name: 'Tx2ls',
      whatsapp: 8798789987,
      requestImages: (requestImages as unknown) as Express.Multer.File[],
    })

    expect(
      authUserService
        .execute({
          email: 'john@gmail.com',
          password: '1234567',
        })
        .then(),
    ).rejects.toBeInstanceOf(AppError)
  })
})
