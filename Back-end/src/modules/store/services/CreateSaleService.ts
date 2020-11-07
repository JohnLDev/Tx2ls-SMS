import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { validate } from 'uuid'
import ICreateSaleDTO from '../dtos/ICreateSaleDTO'
import Sale from '../infra/typeorm/entities/Sale'
import Storage from '../infra/typeorm/entities/Storage'
import ISaleRepository from '../repositories/ISaleRepository'
import * as yup from 'yup'
import { string } from 'yup'
import IStorageRepository from '../repositories/IStorageRepository'

@injectable()
class CreateSaleService {
  constructor(
    @inject('SaleRepository')
    private saleRepository: ISaleRepository,
    @inject('StorageRepository')
    private storageRepository: IStorageRepository,
  ) {}

  private item: Storage = ([] as unknown) as Storage

  public async execute({
    user_id,
    subUser_id,
    amount,
    barcode,
    id,
  }: ICreateSaleDTO): Promise<Sale> {
    if (!validate(user_id) || !validate(subUser_id)) {
      throw new AppError('IDs are invalids')
    }
    if (!barcode && !id) {
      throw new AppError(
        'Please inform id or barcode of product to create a sale',
      )
    }
    if (barcode && id) {
      throw new AppError(
        'Please inform only one id or barcode of product to create a sale',
      )
    }
    const data = {
      amount,
      barcode,
      id,
      user_id,
      subUser_id,
    }
    const schema = yup.object().shape({
      amount: yup.number().required(),
      barcode: yup.string(),
      id: yup.string(),
      user_id: yup.string().required(),
      subUser_id: string().required(),
    })
    await schema.validate(data)
    if (barcode && !id) {
      const item = await this.storageRepository.findByBarcode(barcode, user_id)
      if (!item) {
        throw new AppError(
          'does not exist an item with this barcode in storage',
        )
      }
      this.item = item
    }
    if (!barcode && id) {
      const item = await this.storageRepository.findById(id, user_id)
      if (!item) {
        throw new AppError('does not exist an item with this id in storage')
      }
      this.item = item
    }

    if (amount > this.item.amount) {
      throw new AppError('do not have enough products in storage')
    }

    const sale = await this.saleRepository.create({
      name: this.item.name,
      brand: this.item.brand,
      price: this.item.price * amount,
      amount,
      subUser_id,
      user_id,
    })
    const saleFinished = await this.saleRepository.findById(
      sale.id,
      sale.user_id,
    )
    if (!saleFinished) {
      return sale
    }

    this.item.amount = this.item.amount - sale.amount

    await this.storageRepository.update(this.item)
    return saleFinished
  }
}

export default CreateSaleService
