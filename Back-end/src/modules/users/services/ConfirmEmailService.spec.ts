import AppError from '@shared/errors/AppError'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService'
import ConfirmUserService from './ConfirmEmailService'
import { v4 } from 'uuid'

describe('ConfirmUserService', () => {
  it('should be able to confirm a valid user', async () => {
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

    const fakeUserRepository = new FakeUserRepository()
    const createUserService = new CreateUserService(fakeUserRepository)
    const confirmEmailService = new ConfirmUserService(fakeUserRepository)

    const user = await createUserService.execute({
      name: 'Johnlenon',
      email: 'john@lenon.com',
      password: '1234567',
      enterprise_Name: 'Tx2ls',
      whatsapp: 8798789987,
      requestImages: (requestImages as unknown) as Express.Multer.File[],
    })
    const confirmedUser = await confirmEmailService.execute(user.verify_Key)

    expect(confirmedUser.is_Verify).toBe(true)
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
