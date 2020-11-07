import FakeStorageRepository from '@modules/store/repositories/fakes/FakeStorageRepository'
import FakeSaleRepository from '@modules/store/repositories/fakes/FakeSaleRepository'
import FakeSubUserRepository from '@modules/subusers/repositories/fakes/FakeSubUserRepository'
import AppError from '@shared/errors/AppError'
import { v4 } from 'uuid'
import AddItemToStorageService from './AddItemToStorageService'
import CreateSaleService from './CreateSaleService'
import IndexSaleService from './IndexSaleService'
import CreateSubUserService from '@modules/subusers/services/CreateSubUserService'

describe('IndexSaleService', () => {
  it('should be able to list all sales', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const fakeSaleRepository = new FakeSaleRepository()
    const fakeSubUserRepository = new FakeSubUserRepository()
    const indexSaleService = new IndexSaleService(
      fakeSaleRepository,
      fakeSubUserRepository,
    )
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
    await createSaleService.execute({
      id: item.id,
      user_id: v4(),
      subUser_id: v4(),
      amount: 10,
      name: '',
      brand: '',
      price: 0,
    })
    const sales = await indexSaleService.execute({ user_id: v4() })
    expect(sales.length).toBeGreaterThanOrEqual(1)
  })

  it('should be able to list sales filtering by date', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const fakeSaleRepository = new FakeSaleRepository()
    const fakeSubUserRepository = new FakeSubUserRepository()
    const indexSaleService = new IndexSaleService(
      fakeSaleRepository,
      fakeSubUserRepository,
    )
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
    await createSaleService.execute({
      id: item.id,
      user_id: v4(),
      subUser_id: v4(),
      amount: 10,
      name: '',
      brand: '',
      price: 0,
    })

    const sales = await indexSaleService.execute({
      user_id: v4(),
      fromDate: '01/10/2020',
      untilDate: '02/10/2090',
    })
    expect(sales.length).toBeGreaterThanOrEqual(1)
  })

  it('should be able to list sales filtering by subUser_Name', async () => {
    const fakeStorageRepository = new FakeStorageRepository()
    const fakeSaleRepository = new FakeSaleRepository()
    const fakeSubUserRepository = new FakeSubUserRepository()
    const indexSaleService = new IndexSaleService(
      fakeSaleRepository,
      fakeSubUserRepository,
    )
    const addItemToStorageService = new AddItemToStorageService(
      fakeStorageRepository,
    )
    const createSaleService = new CreateSaleService(
      fakeSaleRepository,
      fakeStorageRepository,
    )
    const createSubUserService = new CreateSubUserService(fakeSubUserRepository)

    const item = await addItemToStorageService.execute({
      name: 'oculos',
      brand: 'apple',
      amount: 100,
      price: 100,
      user_id: v4(),
    })
    const subUser = await createSubUserService.execute({
      name: 'John Lenon',
      email: 'john@lenon.com',
      password: '1234567',
      user_id: v4(),
      is_Adm: false,
    })
    await createSaleService.execute({
      id: item.id,
      user_id: v4(),
      subUser_id: subUser.id,
      amount: 10,
      name: '',
      brand: '',
      price: 0,
    })

    const sales = await indexSaleService.execute({
      user_id: v4(),
      subUser_Name: subUser.name,
    })
    expect(sales.length).toBeGreaterThanOrEqual(1)
  })

  it('should be not able to list sales filtering by subUser_Name that does not exist', async () => {
    const fakeSaleRepository = new FakeSaleRepository()
    const fakeStorageRepository = new FakeStorageRepository()
    const fakeSubUserRepository = new FakeSubUserRepository()
    const indexSaleService = new IndexSaleService(
      fakeSaleRepository,
      fakeSubUserRepository,
    )
    const createSaleService = new CreateSaleService(
      fakeSaleRepository,
      fakeStorageRepository,
    )
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
    await createSaleService.execute({
      id: item.id,
      user_id: v4(),
      subUser_id: v4(),
      amount: 10,
      name: '',
      brand: '',
      price: 0,
    })

    try {
      await indexSaleService.execute({
        user_id: v4(),
        subUser_Name: 'subUser.name',
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be not able to list sales if they does not exist', async () => {
    const fakeSaleRepository = new FakeSaleRepository()
    const fakeSubUserRepository = new FakeSubUserRepository()
    const indexSaleService = new IndexSaleService(
      fakeSaleRepository,
      fakeSubUserRepository,
    )

    try {
      await indexSaleService.execute({
        user_id: v4(),
        subUser_Name: 'subUser.name',
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should be not able to list sales with a invalid user_id', async () => {
    const fakeSaleRepository = new FakeSaleRepository()
    const fakeSubUserRepository = new FakeSubUserRepository()
    const indexSaleService = new IndexSaleService(
      fakeSaleRepository,
      fakeSubUserRepository,
    )

    try {
      await indexSaleService.execute({
        user_id: 'invalid',
        subUser_Name: 'subUser.name',
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
