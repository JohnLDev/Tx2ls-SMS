import AppError from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'
import IStorageRepository from '../repositories/IStorageRepository'

@injectable()
class DeleteItemFromStorageService {
  constructor(
    @inject('StorageRepository')
    private storageRepository: IStorageRepository,
  ) {}

  public async execute(user_id: string, id: string): Promise<void> {
    const item = await this.storageRepository.findById(id, user_id)
    if (!item) {
      throw new AppError('item does not exist', 404)
    }
    await this.storageRepository.delete(id)
  }
}

export default DeleteItemFromStorageService
