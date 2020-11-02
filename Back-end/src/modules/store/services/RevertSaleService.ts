import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { validate } from 'uuid'
import ISaleRepository from '../repositories/ISaleRepository'
import IStorageRepository from '../repositories/IStorageRepository'

interface IRequest {
  user_id: string
  id: string
}
@injectable()
class RevertSaleService {
  constructor(
    @inject('SaleRepository')
    private saleRepository: ISaleRepository,
    @inject('StorageRepository')
    private storageRepository: IStorageRepository,
  ) {}

  public async execute({ user_id, id }: IRequest): Promise<void> {
    if (!validate(user_id)) {
      throw new AppError('user_id is invalid')
    }

    const sale = await this.saleRepository.findById(id, user_id)

    if (!sale) {
      throw new AppError('sale not found', 404)
    }
    const itemInStorage = await this.storageRepository.findByName(
      sale.name,
      user_id,
    )
    if (itemInStorage) {
      itemInStorage.amount = itemInStorage.amount + sale.amount
      await this.storageRepository.update(itemInStorage)
    }

    await this.saleRepository.delete(sale.id)
  }
}
export default RevertSaleService
