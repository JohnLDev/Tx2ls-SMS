import CreateSubUserService from '@modules/subusers/services/CreateSubUserService'
import FakeSubUserRepository from '@modules/subusers/repositories/fakes/FakeSubUserRepository'
import UpdateSubUserService from '@modules/subusers/services/UpdateSubUserService'
import { v4 } from 'uuid'
import AppError from '@shared/errors/AppError'

describe('UpdateSubUserService', () => {
  it('should be able to update a subUser', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const createSubUserService = new CreateSubUserService(fakeSubUserRepository)
    const updateSubUserService = new UpdateSubUserService(fakeSubUserRepository)
    const subUser = await createSubUserService.execute({
      name: 'johnlenon',
      email: 'email@example.com',
      password: '1234567',
      user_id: v4(),
      is_Adm: false,
    })
    const updatedSubUser = await updateSubUserService.execute({
      name: 'novo nome',
      email: 'email@2example.com',
      password: '7654321',
      id: subUser.id,
      user_id: v4(),
    })

    expect(updatedSubUser.name).toBe('novo nome')
  })

  it('should be not able to update an email to an existent email ', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const createSubUserService = new CreateSubUserService(fakeSubUserRepository)
    const updateSubUserService = new UpdateSubUserService(fakeSubUserRepository)
    const subUser = await createSubUserService.execute({
      name: 'johnlenon',
      email: 'email@example.com',
      password: '1234567',
      user_id: v4(),
      is_Adm: false,
    })
    await createSubUserService.execute({
      name: 'john2lenon',
      email: 'email2@example.com',
      password: '1234567',
      user_id: v4(),
      is_Adm: false,
    })
    try {
      await updateSubUserService.execute({
        email: 'email2@example.com',
        id: subUser.id,
        user_id: v4(),
      })
    } catch (error) {
      expect(error.message).toBe('email already exists')
    }
  })

  it('should be not able to update a name to an existent name ', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const createSubUserService = new CreateSubUserService(fakeSubUserRepository)
    const updateSubUserService = new UpdateSubUserService(fakeSubUserRepository)
    const subUser = await createSubUserService.execute({
      name: 'johnlenon',
      email: 'email@example.com',
      password: '1234567',
      user_id: v4(),
      is_Adm: false,
    })
    await createSubUserService.execute({
      name: 'john2lenon',
      email: 'email2@example.com',
      password: '1234567',
      user_id: v4(),
      is_Adm: false,
    })
    try {
      await updateSubUserService.execute({
        name: 'john2lenon',
        id: subUser.id,
        user_id: v4(),
      })
    } catch (error) {
      expect(error.message).toBe('Name already exists')
    }
  })

  it('should be not able to update with a invalid id', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()

    const updateSubUserService = new UpdateSubUserService(fakeSubUserRepository)

    try {
      await updateSubUserService.execute({
        name: 'novo nome',
        email: 'email@2example.com',
        password: '7654321',
        id: 'subUser.id',
        user_id: v4(),
      })
    } catch (error) {
      expect(error.message).toBe('id is invalid')
    }
  })

  it('should be not able to update with a invalid user_id', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()

    const updateSubUserService = new UpdateSubUserService(fakeSubUserRepository)

    try {
      await updateSubUserService.execute({
        name: 'novo nome',
        email: 'email@2example.com',
        password: '7654321',
        id: v4(),
        user_id: 'asdadsa',
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
  it('should be not able to update with a atleast one fullfilled field', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()

    const updateSubUserService = new UpdateSubUserService(fakeSubUserRepository)

    try {
      await updateSubUserService.execute({
        id: v4(),
        user_id: v4(),
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be not able to update a subUser that does not exist', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()

    const updateSubUserService = new UpdateSubUserService(fakeSubUserRepository)

    try {
      await updateSubUserService.execute({
        name: 'novo nome',
        email: 'email@2example.com',
        password: '7654321',
        id: v4(),
        user_id: v4(),
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
