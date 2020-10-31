import IAddItemRepository from '@modules/store/dtos/IAddItemRepositoryDTO'
import IStorageRepository from '@modules/store/repositories/IStorageRepository'
import { getRepository, Repository } from 'typeorm'
import Storage from '../entities/Storage'

class StorageRepository implements IStorageRepository {
  private OrmRepository: Repository<Storage>

  constructor() {
    this.OrmRepository = getRepository(Storage)
  }

  public async create({
    name,
    brand,
    price,
    amount,
    barcode,
    user_id,
  }: IAddItemRepository): Promise<Storage> {
    const item = this.OrmRepository.create({
      name,
      brand,
      price,
      amount,
      barcode,
      user_id,
    })
    await this.OrmRepository.save(item)
    return item
  }

  public async update(item: Storage): Promise<Storage | undefined> {
    await this.OrmRepository.save(item)
    return item
  }

  public async delete(id: string): Promise<void> {
    await this.OrmRepository.delete(id)
  }

  public async findAll(user_id: string): Promise<Storage[] | undefined> {
    const storage = await this.OrmRepository.find({ where: { user_id } })
    return storage
  }

  public async findById(
    id: string,
    user_id: string,
  ): Promise<Storage | undefined> {
    const item = await this.OrmRepository.findOne({ where: { user_id, id } })
    return item
  }

  public async findByName(
    name: string,
    user_id: string,
  ): Promise<Storage | undefined> {
    const item = await this.OrmRepository.findOne({ where: { user_id, name } })
    return item
  }

  public async findByBrand(
    brand: string,
    user_id: string,
  ): Promise<Storage[] | undefined> {
    const storage = await this.OrmRepository.find({ where: { user_id, brand } })
    return storage
  }

  public async findByNameAndBrand(
    name: string,
    brand: string,
    user_id: string,
  ): Promise<Storage | undefined> {
    const item = await this.OrmRepository.findOne({
      where: { user_id, name, brand },
    })
    return item
  }

  public async findByBarcode(
    barcode: string,
    user_id: string,
  ): Promise<Storage | undefined> {
    const item = await this.OrmRepository.findOne({
      where: { user_id, barcode },
    })
    return item
  }
}

export default StorageRepository
