import CreateSubUserService from '@modules/subusers/services/CreateSubUserService'
import FakeSubUserRepository from '@modules/subusers/repositories/fakes/FakeSubUserRepository'
import DeleteSubUserService from '@modules/subusers/services/DeleteSubUserService'
import { v4 } from 'uuid'
import AppError from '@shared/errors/AppError'

describe('DeleteSubUserService', () => {
  it('should be able to delete a sub user', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const createSubUserService = new CreateSubUserService(fakeSubUserRepository)
    const deleteSubUserService = new DeleteSubUserService(fakeSubUserRepository)
    const subUser = await createSubUserService.execute({
      name: 'johnlenon',
      email: 'email@example.com',
      password: '1234567',
      user_id: v4(),
      is_Adm: false,
    })
    const deleted = await deleteSubUserService.execute({
      user_id: v4(),
      id: subUser.id,
    })
    expect(deleted).toBeFalsy()
  })
  it('should be not able to delete a sub user with a invalid user_id', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const createSubUserService = new CreateSubUserService(fakeSubUserRepository)
    const deleteSubUserService = new DeleteSubUserService(fakeSubUserRepository)
    const subUser = await createSubUserService.execute({
      name: 'johnlenon',
      email: 'email@example.com',
      password: '1234567',
      user_id: v4(),
      is_Adm: false,
    })
    try {
      await deleteSubUserService.execute({
        user_id: '23123123',
        id: subUser.id,
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be not able to delete a sub user with a invalid id', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const deleteSubUserService = new DeleteSubUserService(fakeSubUserRepository)
    try {
      await deleteSubUserService.execute({
        user_id: v4(),
        id: 'adasdasd',
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be not able to delete a sub user that does not exist', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const deleteSubUserService = new DeleteSubUserService(fakeSubUserRepository)
    try {
      await deleteSubUserService.execute({
        user_id: v4(),
        id: v4(),
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
