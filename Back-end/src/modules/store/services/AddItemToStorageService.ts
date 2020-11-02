import * as yup from 'yup'
import BarcodeGenerator from '@shared/utils/BarcodeGenerator'
import IStorageRepository from '../repositories/IStorageRepository'
import { inject, injectable } from 'tsyringe'
import Storage from '../infra/typeorm/entities/Storage'
import IAddItemDTO from '../dtos/IAddItemDTO'
import { validate } from 'uuid'
import AppError from '@shared/errors/AppError'

@injectable()
class AddItemToStorageService {
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
  }: IAddItemDTO): Promise<Storage> {
    if (!validate(user_id)) {
      throw new AppError('user_id is invalid')
    }
    const data = {
      name,
      brand,
      price,
      amount,
      barcode: BarcodeGenerator(),
      user_id,
    }
    const schema = yup.object().shape({
      name: yup.string().required(),
      brand: yup.string().required(),
      price: yup.number().required(),
      amount: yup.number().required(),
      barcode: yup.string().required(),
      user_id: yup.string().required(),
    })
    await schema.validate(data)
    const itemAlreadyExists = await this.storageRepository.findByName(
      name,
      user_id,
    )
    if (itemAlreadyExists) {
      throw new AppError('item already exists')
    }
    const item = await this.storageRepository.create(data)
    return item
  }
}

export default AddItemToStorageService
