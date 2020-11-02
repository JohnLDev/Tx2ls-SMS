import FakeStorageRepository from '@modules/store/repositories/fakes/FakeStorageRepository'
import FakeSaleRepository from '@modules/store/repositories/fakes/FakeSaleRepository'
import AppError from '@shared/errors/AppError'
import { v4 } from 'uuid'
import AddItemToStorageService from './AddItemToStorageService'
import CreateSaleService from './CreateSaleService'

describe('CreateSaleService', () => {
  it('should be able to create a sale by id', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const fakeSaleRepository = new FakeSaleRepository()
    const addItemToStorageService = new AddItemToStorageService(
      fakeStorageRepository,
    )
    const createSaleService = new CreateSaleService(
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
    expect(sale).toHaveProperty('id')
  })

  it('should be able to create a sale by barcode', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const fakeSaleRepository = new FakeSaleRepository()
    const addItemToStorageService = new AddItemToStorageService(
      fakeStorageRepository,
    )
    const createSaleService = new CreateSaleService(
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
      barcode: item.barcode,
      user_id: v4(),
      subUser_id: v4(),
      amount: 10,
      name: '',
      brand: '',
      price: 0,
    })
    expect(sale).toHaveProperty('id')
  })

  it('should be not able to create a sale without itens in storage', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const fakeSaleRepository = new FakeSaleRepository()
    const addItemToStorageService = new AddItemToStorageService(
      fakeStorageRepository,
    )
    const createSaleService = new CreateSaleService(
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
    try {
      await createSaleService.execute({
        barcode: item.barcode,
        user_id: v4(),
        subUser_id: v4(),
        amount: 1000,
        name: '',
        brand: '',
        price: 0,
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be not able to create a sale with a invalid id', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const fakeSaleRepository = new FakeSaleRepository()
    const addItemToStorageService = new AddItemToStorageService(
      fakeStorageRepository,
    )
    const createSaleService = new CreateSaleService(
      fakeSaleRepository,
      fakeStorageRepository,
    )
    await addItemToStorageService.execute({
      name: 'oculos',
      brand: 'apple',
      amount: 100,
      price: 100,
      user_id: v4(),
    })
    try {
      await createSaleService.execute({
        id: 'invalid',
        user_id: v4(),
        subUser_id: v4(),
        amount: 1000,
        name: '',
        brand: '',
        price: 0,
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be not able to create a sale with a invalid barcode', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const fakeSaleRepository = new FakeSaleRepository()
    const addItemToStorageService = new AddItemToStorageService(
      fakeStorageRepository,
    )
    const createSaleService = new CreateSaleService(
      fakeSaleRepository,
      fakeStorageRepository,
    )
    await addItemToStorageService.execute({
      name: 'oculos',
      brand: 'apple',
      amount: 100,
      price: 100,
      user_id: v4(),
    })
    try {
      await createSaleService.execute({
        barcode: 'invalid',
        user_id: v4(),
        subUser_id: v4(),
        amount: 1000,
        name: '',
        brand: '',
        price: 0,
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be not able to create a sale without barcode and id', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const fakeSaleRepository = new FakeSaleRepository()
    const addItemToStorageService = new AddItemToStorageService(
      fakeStorageRepository,
    )
    const createSaleService = new CreateSaleService(
      fakeSaleRepository,
      fakeStorageRepository,
    )
    await addItemToStorageService.execute({
      name: 'oculos',
      brand: 'apple',
      amount: 100,
      price: 100,
      user_id: v4(),
    })
    try {
      await createSaleService.execute({
        user_id: v4(),
        subUser_id: v4(),
        amount: 1000,
        name: '',
        brand: '',
        price: 0,
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be not able to create a sale with an invalida user_id', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const fakeSaleRepository = new FakeSaleRepository()
    const addItemToStorageService = new AddItemToStorageService(
      fakeStorageRepository,
    )
    const createSaleService = new CreateSaleService(
      fakeSaleRepository,
      fakeStorageRepository,
    )
    await addItemToStorageService.execute({
      name: 'oculos',
      brand: 'apple',
      amount: 100,
      price: 100,
      user_id: v4(),
    })
    try {
      await createSaleService.execute({
        user_id: '',
        subUser_id: v4(),
        amount: 1000,
        name: '',
        brand: '',
        price: 0,
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be not able to create a sale with an invalida subUser_id', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const fakeSaleRepository = new FakeSaleRepository()
    const addItemToStorageService = new AddItemToStorageService(
      fakeStorageRepository,
    )
    const createSaleService = new CreateSaleService(
      fakeSaleRepository,
      fakeStorageRepository,
    )
    await addItemToStorageService.execute({
      name: 'oculos',
      brand: 'apple',
      amount: 100,
      price: 100,
      user_id: v4(),
    })
    try {
      await createSaleService.execute({
        user_id: v4(),
        subUser_id: '',
        amount: 1000,
        name: '',
        brand: '',
        price: 0,
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be not able to create a sale with id and barcode', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const fakeSaleRepository = new FakeSaleRepository()
    const addItemToStorageService = new AddItemToStorageService(
      fakeStorageRepository,
    )
    const createSaleService = new CreateSaleService(
      fakeSaleRepository,
      fakeStorageRepository,
    )
    await addItemToStorageService.execute({
      name: 'oculos',
      brand: 'apple',
      amount: 100,
      price: 100,
      user_id: v4(),
    })
    try {
      await createSaleService.execute({
        barcode: 'invalid',
        id: 'invalid',
        user_id: v4(),
        subUser_id: v4(),
        amount: 1000,
        name: '',
        brand: '',
        price: 0,
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
