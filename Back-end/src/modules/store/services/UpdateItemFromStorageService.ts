import { inject, injectable } from 'tsyringe'
import IStorageRepository from '../repositories/IStorageRepository'
import Storage from '../infra/typeorm/entities/Storage'
import IUpdateItemDTO from '../dtos/IUpdateItemDTO'
import * as yup from 'yup'
import { validate } from 'uuid'
import AppError from '@shared/errors/AppError'

@injectable()
class UpdateItemFromStorageService {
  constructor(
    @inject('StorageRepository')
    private storageRepository: IStorageRepository,
  ) {}

  public async execute({
    name,
    brand,
    price,
    amount,
    user_id,
    id,
  }: IUpdateItemDTO): Promise<Storage> {
    if (!validate(user_id)) {
      throw new AppError('invalid user_id')
    }
    const data = {
      name,
      brand,
      price,
      amount,
      user_id,
      id,
    }
    const schema = yup.object().shape({
      name: yup.string(),
      brand: yup.string(),
      price: yup.number(),
      amount: yup.number(),
      user_id: yup.string().required(),
      id: yup.string().required(),
    })
    await schema.validate(data)
    const item = await this.storageRepository.findById(id, user_id)
    if (!item) {
      throw new AppError('item does not exist in storage', 404)
    }
    if (name) {
      item.name = name
    }
    if (brand) {
      item.brand = brand
    }
    if (price) {
      item.price = price
    }
    if (amount) {
      item.amount = amount
    }
    await this.storageRepository.update(item)
    return item
  }
}

export default UpdateItemFromStorageService
