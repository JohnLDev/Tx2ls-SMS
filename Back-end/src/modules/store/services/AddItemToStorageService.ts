import * as yup from 'yup'
import BarcodeGenerator from '@shared/utils/BarcodeGenerator'
import IStorageRepository from '../repositories/IStorageRepository'
import { inject, injectable } from 'tsyringe'
import Storage from '../infra/typeorm/entities/Storage'
import IAddItem from '../dtos/IAddItem'

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
  }: IAddItem): Promise<Storage> {
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

    const item = await this.storageRepository.create(data)
    return item
  }
}

export default AddItemToStorageService
