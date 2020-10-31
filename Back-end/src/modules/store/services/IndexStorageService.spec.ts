import FakeStorageRepository from '@modules/store/repositories/fakes/FakeStorageRepository'
import AppError from '@shared/errors/AppError'
import { v4 } from 'uuid'
import AddItemToStorageService from './AddItemToStorageService'
import IndexStorageService from './IndexStorageService'

describe('IndexStorageService', () => {
  it('should be able to list all storage items', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const addItemToStorageService = new AddItemToStorageService(
      fakeStorageRepository,
    )
    await addItemToStorageService.execute({
      name: 'oculos',
      brand: 'apple',
      amount: 100,
      price: 100,
      user_id: v4(),
    })
    const indexStorageService = new IndexStorageService(fakeStorageRepository)
    const storage = ((await indexStorageService.execute({
      user_id: v4(),
    })) as unknown) as Storage[]
    expect(storage.length).toBeGreaterThanOrEqual(1)
  })

  it('should be able to list filtering by name', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const addItemToStorageService = new AddItemToStorageService(
      fakeStorageRepository,
    )
    await addItemToStorageService.execute({
      name: 'oculos',
      brand: 'apple',
      amount: 100,
      price: 100,
      user_id: v4(),
    })
    const indexStorageService = new IndexStorageService(fakeStorageRepository)
    const storage = await indexStorageService.execute({
      user_id: v4(),
      name: 'oculos',
    })
    expect(storage).toBeTruthy()
  })

  it('should be able to list filtering by brand', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const addItemToStorageService = new AddItemToStorageService(
      fakeStorageRepository,
    )
    await addItemToStorageService.execute({
      name: 'oculos',
      brand: 'apple',
      amount: 100,
      price: 100,
      user_id: v4(),
    })
    const indexStorageService = new IndexStorageService(fakeStorageRepository)
    const storage = await indexStorageService.execute({
      user_id: v4(),
      brand: 'apple',
    })
    expect(storage).toBeTruthy()
  })

  it('should be able to list filtering by name and brand', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const addItemToStorageService = new AddItemToStorageService(
      fakeStorageRepository,
    )
    await addItemToStorageService.execute({
      name: 'oculos',
      brand: 'apple',
      amount: 100,
      price: 100,
      user_id: v4(),
    })
    const indexStorageService = new IndexStorageService(fakeStorageRepository)
    const storage = await indexStorageService.execute({
      user_id: v4(),
      name: 'oculos',
      brand: 'apple',
    })
    expect(storage).toBeTruthy()
  })

  it('should be not able to list with a invalid user_id', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const addItemToStorageService = new AddItemToStorageService(
      fakeStorageRepository,
    )
    await addItemToStorageService.execute({
      name: 'oculos',
      brand: 'apple',
      amount: 100,
      price: 100,
      user_id: v4(),
    })
    const indexStorageService = new IndexStorageService(fakeStorageRepository)
    try {
      await indexStorageService.execute({
        user_id: 'v4()',
        name: 'oculos',
        brand: 'apple',
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be not able to list if does not exist users', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const indexStorageService = new IndexStorageService(fakeStorageRepository)
    try {
      await indexStorageService.execute({
        user_id: v4(),
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be not able to filter by name if does not exist that item', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const indexStorageService = new IndexStorageService(fakeStorageRepository)
    try {
      await indexStorageService.execute({
        user_id: v4(),
        name: 'oculos',
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be not able to filter by brand if does not exist that item', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const indexStorageService = new IndexStorageService(fakeStorageRepository)
    try {
      await indexStorageService.execute({
        user_id: v4(),
        brand: 'apple',
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be not able to filter by name and brand if does not exist that item', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const indexStorageService = new IndexStorageService(fakeStorageRepository)
    try {
      await indexStorageService.execute({
        user_id: v4(),
        name: 'oculos',
        brand: 'apple',
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
