import AppError from '@shared/errors/AppError'
import { validate } from 'uuid'
import { inject, injectable } from 'tsyringe'
import Storage from '../infra/typeorm/entities/Storage'
import IStorageRepository from '../repositories/IStorageRepository'

interface IRequest {
  user_id: string
  name?: string
  brand?: string
}

@injectable()
class IndexStorageService {
  constructor(
    @inject('StorageRepository')
    private storageRepository: IStorageRepository,
  ) {}

  public async execute({ user_id, name, brand }: IRequest): Promise<Storage[]> {
    if (!validate(user_id)) {
      throw new AppError('user_id is invalid')
    }
    if (name && !brand) {
      const storage = await this.storageRepository.findByName(name, user_id)
      if (!storage) {
        throw new AppError('item not found', 404)
      }
      const Storages: Storage[] = [storage]
      return Storages
    }

    if (brand && !name) {
      const storage = await this.storageRepository.findByBrand(brand, user_id)
      if (!storage) {
        throw new AppError('item not found', 404)
      }
      return storage
    }
    if (brand && name) {
      const storage = await this.storageRepository.findByNameAndBrand(
        name,
        brand,
        user_id,
      )
      if (!storage) {
        throw new AppError('item not found', 404)
      }
      const Storages: Storage[] = [storage]
      return Storages
    }
    const storage = await this.storageRepository.findAll(user_id)
    if (!storage) {
      throw new AppError('item not found', 404)
    }
    return storage
  }
}

export default IndexStorageService
