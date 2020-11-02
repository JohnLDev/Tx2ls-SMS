import FakeStorageRepository from '@modules/store/repositories/fakes/FakeStorageRepository'
import FakeSaleRepository from '@modules/store/repositories/fakes/FakeSaleRepository'
import AppError from '@shared/errors/AppError'
import { v4 } from 'uuid'
import AddItemToStorageService from './AddItemToStorageService'
import CreateSaleService from './CreateSaleService'
import RevertSaleService from './RevertSaleService'

describe('RevertSaleService', () => {
  it('should be able to rever a sale', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const fakeSaleRepository = new FakeSaleRepository()
    const addItemToStorageService = new AddItemToStorageService(
      fakeStorageRepository,
    )
    const createSaleService = new CreateSaleService(
      fakeSaleRepository,
      fakeStorageRepository,
    )
    const revertSaleService = new RevertSaleService(
      fakeSaleRepository,
      fakeStorageRepository,
    )
    const item = await addItemToStorageService.execute({
      name: 'oculos',
      brand: 'apple',
      amount: 100,
      price: 100,
      user_id: v4(),
    })
    const sale = await createSaleService.execute({
      id: item.id,
      user_id: v4(),
      subUser_id: v4(),
      amount: 10,
      name: '',
      brand: '',
      price: 0,
    })
    const reverted = await revertSaleService.execute({
      user_id: v4(),
      id: sale.id,
    })
    expect(reverted).toBeFalsy()
  })

  it('should be not able to rever a sale that does not exist', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const fakeSaleRepository = new FakeSaleRepository()
    const addItemToStorageService = new AddItemToStorageService(
      fakeStorageRepository,
    )
    const createSaleService = new CreateSaleService(
      fakeSaleRepository,
      fakeStorageRepository,
    )
    const revertSaleService = new RevertSaleService(
      fakeSaleRepository,
      fakeStorageRepository,
    )
    const item = await addItemToStorageService.execute({
      name: 'oculos',
      brand: 'apple',
      amount: 100,
      price: 100,
      user_id: v4(),
    })
    const sale = await createSaleService.execute({
      id: item.id,
      user_id: v4(),
      subUser_id: v4(),
      amount: 10,
      name: '',
      brand: '',
      price: 0,
    })
    try {
      await revertSaleService.execute({
        user_id: v4(),
        id: sale.id + 2,
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be not able to rever a sale with an invalid user_id', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const fakeSaleRepository = new FakeSaleRepository()

    const revertSaleService = new RevertSaleService(
      fakeSaleRepository,
      fakeStorageRepository,
    )

    try {
      await revertSaleService.execute({
        user_id: ' v4()',
        id: '2',
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
