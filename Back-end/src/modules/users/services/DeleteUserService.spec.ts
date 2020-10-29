import AppError from '@shared/errors/AppError'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService'
import DeleteUserService from './DeleteUserService'
import { v4 } from 'uuid'

describe('DeleteUserService', () => {
  it('should be able to delete a user', async () => {
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
    const deleteUserService = new DeleteUserService(fakeUserRepository)
    const user = await createUserService.execute({
      name: 'Johnlenon',
      email: 'john@lenon.com',
      password: '1234567',
      enterprise_Name: 'Tx2ls',
      whatsapp: 8798789987,
      requestImages: (requestImages as unknown) as Express.Multer.File[],
    })
    const deleted = await deleteUserService.execute(user.id)
    expect(deleted).toBe(undefined)
  })

  it('should be not able to delete without uuid', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const deleteUserService = new DeleteUserService(fakeUserRepository)
    expect(deleteUserService.execute('12325123-4214')).rejects.toBeInstanceOf(
      AppError,
    )
  })

  it('should be not able to delete without a valid uuid', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const deleteUserService = new DeleteUserService(fakeUserRepository)
    expect(deleteUserService.execute(v4())).rejects.toBeInstanceOf(AppError)
  })
})
