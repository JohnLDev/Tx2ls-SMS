import FakeStorageRepository from '@modules/store/repositories/fakes/FakeStorageRepository'
import AppError from '@shared/errors/AppError'
import { v4 } from 'uuid'
import AddItemToStorageService from './AddItemToStorageService'
import DeleteItemFromStorageService from './DeleteItemFromStorageService'

describe('sign of silence', () => {
  it('should be able to dekete a item from storage', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const addItemToStorageService = new AddItemToStorageService(
      fakeStorageRepository,
    )
    const deleteItemFromStorageService = new DeleteItemFromStorageService(
      fakeStorageRepository,
    )
    const item = await addItemToStorageService.execute({
      name: 'oculos',
      brand: 'apple',
      amount: 100,
      price: 100,
      user_id: v4(),
    })
    const deleted = await deleteItemFromStorageService.execute(
      item.user_id,
      item.id,
    )
    expect(deleted).toBeFalsy()
  })

  it('should be able to dekete a item that does not exist in storage', async () => {
    const fakeStorageRepository = new FakeStorageRepository()

    const deleteItemFromStorageService = new DeleteItemFromStorageService(
      fakeStorageRepository,
    )

    try {
      await deleteItemFromStorageService.execute(v4(), v4())
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be able to delete a item with a invalid id', async () => {
    const fakeStorageRepository = new FakeStorageRepository()

    const deleteItemFromStorageService = new DeleteItemFromStorageService(
      fakeStorageRepository,
    )

    try {
      await deleteItemFromStorageService.execute('sjdaushd', 'asdkasopd')
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
