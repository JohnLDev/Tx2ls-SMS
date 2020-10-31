import IAddItemRepositoryDTO from '../dtos/IAddItemRepositoryDTO'
import Storage from '../infra/typeorm/entities/Storage'

export default interface IStorageRepository {
  create(data: IAddItemRepositoryDTO): Promise<Storage>
  update(storage: Storage): Promise<Storage | undefined>
  delete(id: string): Promise<void>
  findByName(name: string, user_id: string): Promise<Storage | undefined>

  findByBrand(brand: string, user_id: string): Promise<Storage[] | undefined>

  findByNameAndBrand(
    name: string,
    brand: string,
    user_id: string,
  ): Promise<Storage | undefined>

  findById(id: string, user_id: string): Promise<Storage | undefined>
  findAll(user_id: string): Promise<Storage[] | undefined>
  findByBarcode(barcode: string, user_id: string): Promise<Storage | undefined>
}
