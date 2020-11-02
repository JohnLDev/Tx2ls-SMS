import IAddItemRepository from '@modules/store/dtos/IAddItemRepositoryDTO'
import IStorageRepository from '@modules/store/repositories/IStorageRepository'

import Storage from '../../infra/typeorm/entities/Storage'
class StorageRepository implements IStorageRepository {
  private storage: Storage[] = []

  public async create({
    name,
    brand,
    price,
    amount,
    barcode,
    user_id,
  }: IAddItemRepository): Promise<Storage> {
    const item = new Storage()

    item.id = String(this.storage.length + 1)
    item.name = name
    item.brand = brand
    item.price = price
    item.amount = amount
    item.barcode = barcode
    item.user_id = user_id
    item.created_at = (Date.now() as unknown) as Date
    item.updated_at = (Date.now() as unknown) as Date

    this.storage.push(item)

    return item
  }

  public async update(item: Storage): Promise<Storage | undefined> {
    this.storage.filter(storage => storage.id === item.id)
    this.storage.push(item)
    return item
  }

  public async delete(id: string): Promise<void> {
    this.storage.filter(storage => storage.id === id)
  }

  public async findAll(user_id: string): Promise<Storage[] | undefined> {
    if (this.storage.length === 0) {
      return undefined
    }
    return this.storage
  }

  public async findById(
    id: string,
    user_id: string,
  ): Promise<Storage | undefined> {
    const item = this.storage.find(storage => storage.id === id)
    return item
  }

  public async findByName(
    name: string,
    user_id: string,
  ): Promise<Storage | undefined> {
    const item = this.storage.find(storage => storage.name === name)
    return item
  }

  public async findByBrand(
    brand: string,
    user_id: string,
  ): Promise<Storage[] | undefined> {
    const storage: Storage[] = []
    const found = this.storage.find(storage => storage.brand === brand)
    if (!found) {
      return undefined
    }
    storage.push(found)
    return storage
  }

  public async findByNameAndBrand(
    name: string,
    brand: string,
    user_id: string,
  ): Promise<Storage | undefined> {
    const filterByName = this.storage.find(storage => storage.name === name)
    const findByBrand = this.storage.find(storage => storage.brand === brand)
    if (filterByName !== findByBrand) {
      return undefined
    }
    return findByBrand
  }

  public async findByBarcode(
    barcode: string,
    user_id: string,
  ): Promise<Storage | undefined> {
    const item = this.storage.find(storage => storage.barcode === barcode)
    return item
  }
}

export default StorageRepository
