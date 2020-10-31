import FakeStorageRepository from '@modules/store/repositories/fakes/FakeStorageRepository'
import AppError from '@shared/errors/AppError'
import { v4 } from 'uuid'
import AddItemToStorageService from './AddItemToStorageService'
import UpdateItemFromStorageService from './UpdateItemFromStorageService'

describe('UpdateItemFromStorageService', () => {
  it('should be able to update a existent item in storage', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const addItemToStorageService = new AddItemToStorageService(
      fakeStorageRepository,
    )
    const updateItemFromStorageService = new UpdateItemFromStorageService(
      fakeStorageRepository,
    )
    const item = await addItemToStorageService.execute({
      name: 'oculos',
      brand: 'apple',
      amount: 100,
      price: 100,
      user_id: v4(),
    })
    const updatedItem = await updateItemFromStorageService.execute({
      name: 'oculos atualizado',
      brand: 'maça',
      amount: 1000,
      price: 200,
      id: item.id,
      user_id: item.user_id,
    })

    expect(updatedItem.name).toBe('oculos atualizado')
  })

  it('should be not able to update a item with a invalid user_id', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const addItemToStorageService = new AddItemToStorageService(
      fakeStorageRepository,
    )
    const updateItemFromStorageService = new UpdateItemFromStorageService(
      fakeStorageRepository,
    )
    const item = await addItemToStorageService.execute({
      name: 'oculos',
      brand: 'apple',
      amount: 100,
      price: 100,
      user_id: v4(),
    })
    try {
      await updateItemFromStorageService.execute({
        name: 'oculos atualizado',
        brand: 'maça',
        amount: 1000,
        price: 200,
        id: item.id,
        user_id: 'item.user_id',
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
  it('should be not able to update a item that does not exist', async () => {
    const fakeStorageRepository = new FakeStorageRepository()

    const updateItemFromStorageService = new UpdateItemFromStorageService(
      fakeStorageRepository,
    )

    try {
      await updateItemFromStorageService.execute({
        name: 'oculos atualizado',
        brand: 'maça',
        amount: 1000,
        price: 200,
        id: 'johnlenon',
        user_id: v4(),
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
