import CreateSubUserService from '@modules/subusers/services/CreateSubUserService'
import FakeSubUserRepository from '@modules/subusers/repositories/fakes/FakeSubUserRepository'
import IndexSubUserService from '@modules/subusers/services/IndexSubUserService'
import { v4 } from 'uuid'
import AppError from '@shared/errors/AppError'
import SubUser from '../infra/typeorm/entities/SubUser'

describe('IndexSubUserService', () => {
  it('should be able to list subusers', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const createSubUserService = new CreateSubUserService(fakeSubUserRepository)
    const indexSubUserService = new IndexSubUserService(fakeSubUserRepository)
    await createSubUserService.execute({
      name: 'johnlenon',
      email: 'email@example.com',
      password: '1234567',
      user_id: v4(),
      is_Adm: false,
    })
    const subUsers = (await indexSubUserService.execute({
      user_id: v4(),
    })) as SubUser[]

    expect(subUsers.length).toBeGreaterThanOrEqual(1)
  })

  it('should be able to list subuser filtering by name', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const createSubUserService = new CreateSubUserService(fakeSubUserRepository)
    const indexSubUserService = new IndexSubUserService(fakeSubUserRepository)
    await createSubUserService.execute({
      name: 'johnlenon',
      email: 'email@example.com',
      password: '1234567',
      user_id: v4(),
      is_Adm: false,
    })
    const subUser = await indexSubUserService.execute({
      user_id: v4(),
      name: 'johnlenon',
    })

    expect(subUser.length).toBeGreaterThanOrEqual(1)
  })

  it('should be not able to list subusers if they do not exist', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const indexSubUserService = new IndexSubUserService(fakeSubUserRepository)

    try {
      await indexSubUserService.execute({
        user_id: v4(),
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be not able to list subusers by name if they do not exist', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const indexSubUserService = new IndexSubUserService(fakeSubUserRepository)

    try {
      await indexSubUserService.execute({
        user_id: v4(),
        name: 'johnlenon',
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be not able to list subusers with a invalid user_id', async () => {
    const fakeSubUserRepository = new FakeSubUserRepository()
    const indexSubUserService = new IndexSubUserService(fakeSubUserRepository)

    try {
      await indexSubUserService.execute({
        user_id: '23123123123',
        name: 'johnlenon',
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
