import FakeStorageRepository from '@modules/store/repositories/fakes/FakeStorageRepository'
import AppError from '@shared/errors/AppError'
import { v4 } from 'uuid'
import AddItemToStorageService from './AddItemToStorageService'

describe('AddItemToStorageService', () => {
  it('should be able to add item to storage', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const addItemToStorageService = new AddItemToStorageService(
      fakeStorageRepository,
    )
    const item = await addItemToStorageService.execute({
      name: 'oculos',
      brand: 'apple',
      amount: 100,
      price: 100,
      user_id: v4(),
    })
    expect(item).toHaveProperty('id')
  })

  it('should be not able to add item to storage with a invalid id', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const addItemToStorageService = new AddItemToStorageService(
      fakeStorageRepository,
    )
    try {
      await addItemToStorageService.execute({
        name: 'oculos',
        brand: 'apple',
        amount: 100,
        price: 100,
        user_id: 'asjdioasjd',
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
