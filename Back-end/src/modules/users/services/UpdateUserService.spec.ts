import AppError from '@shared/errors/AppError'
import { v4 } from 'uuid'
import { ValidationError } from 'yup'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService'
import UpdateUserService from './UpdateUserService'
import requestImages from '@shared/utils/ImageToTest'

describe('UpdateUserService', () => {
  it('should be able to update a user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const createUserService = new CreateUserService(fakeUserRepository)
    const updateUserService = new UpdateUserService(fakeUserRepository)

    const user = await createUserService.execute({
      name: 'Johnlenon',
      email: 'john@lenon.com',
      password: '1234567',
      enterprise_Name: 'Tx2ls312312312',
      whatsapp: 8798789987,
      requestImages: (requestImages as unknown) as Express.Multer.File[],
    })
    const updatedUser = await updateUserService.execute({
      id: user.id,
      name: 'Ian Mathias',
      password: 'senhaa',
      enterprise_Name: 'Amburgueria Logitec',
      whatsapp: 8273198273,
      requestImages: (requestImages as unknown) as Express.Multer.File[],
    })
    expect(updatedUser.name).toBe('Ian Mathias')
  })

  it('should be not able to update for an enterprise_Name that already exists', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const createUserService = new CreateUserService(fakeUserRepository)
    const updateUserService = new UpdateUserService(fakeUserRepository)

    const user = await createUserService.execute({
      name: 'Johnlenon',
      email: 'john@lenon.com',
      password: '1234567',
      enterprise_Name: 'Tx2ls312312312',
      whatsapp: 8798789987,
      requestImages: (requestImages as unknown) as Express.Multer.File[],
    })

    await createUserService.execute({
      name: 'Johnlenon',
      email: 'john2@lenon.com',
      password: '1234567',
      enterprise_Name: 'Tx2ls',
      whatsapp: 8798789987,
      requestImages: (requestImages as unknown) as Express.Multer.File[],
    })

    try {
      await updateUserService.execute({
        id: user.id,
        name: 'Ian Mathias',
        password: 'senhaa',
        enterprise_Name: 'Tx2ls',
        whatsapp: 8273198273,
        requestImages: (requestImages as unknown) as Express.Multer.File[],
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be not able to update a user with a invalid type of id', async () => {
    const fakeUserRepository = new FakeUserRepository()

    const updateUserService = new UpdateUserService(fakeUserRepository)

    expect(
      updateUserService.execute({
        id: 'useadsadasdsar.',
        name: 'Ian Mathias',
        password: 'senhaa',
        enterprise_Name: 'Amburgueria Logitec',
        whatsapp: 8273198273,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be not able to update a user with a invalid fields', async () => {
    const fakeUserRepository = new FakeUserRepository()

    const updateUserService = new UpdateUserService(fakeUserRepository)

    expect(
      updateUserService.execute({
        id: v4(),
        name: '',
        password: 'sen',
        enterprise_Name: '',
        whatsapp: 831231231312312,
        requestImages: (requestImages as unknown) as Express.Multer.File[],
      }),
    ).rejects.toBeInstanceOf(ValidationError)
  })

  it('should be not able to update a user with any fulfilled field', async () => {
    const fakeUserRepository = new FakeUserRepository()

    const updateUserService = new UpdateUserService(fakeUserRepository)

    expect(
      updateUserService.execute({
        id: v4(),
      }),
    ).rejects.toBeInstanceOf(ValidationError)
  })

  it('should be not able to update a user that does not exist', async () => {
    const fakeUserRepository = new FakeUserRepository()

    const updateUserService = new UpdateUserService(fakeUserRepository)

    try {
      await updateUserService.execute({
        id: v4(),
        name: 'Ian Mathias',
        password: 'senhaa',
        enterprise_Name: 'Amburgueria Logitec',
        whatsapp: 82731983,
        requestImages: (requestImages as unknown) as Express.Multer.File[],
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
