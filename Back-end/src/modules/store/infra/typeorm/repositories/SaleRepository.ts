import ICreateSaleRepositoryDTO from '@modules/store/dtos/ICreateSaleRepositoryDTO'
import { getRepository, Repository } from 'typeorm'
import ISaleRepository from '../../../repositories/ISaleRepository'
import Sale from '../entities/Sale'

class SaleRepository implements ISaleRepository {
  private OrmRepository: Repository<Sale>
  constructor() {
    this.OrmRepository = getRepository(Sale)
  }

  public async create({
    name,
    brand,
    price,
    amount,
    subUser_id,
    user_id,
  }: ICreateSaleRepositoryDTO): Promise<Sale> {
    const sale = this.OrmRepository.create({
      name,
      brand,
      price,
      amount,
      subUser_id,
      user_id,
    })
    await this.OrmRepository.save(sale)
    return sale
  }

  public async delete(id: string): Promise<void> {
    await this.OrmRepository.delete(id)
  }

  public async update(sale: Sale): Promise<Sale | undefined> {
    await this.OrmRepository.save(sale)
    return sale
  }

  public async findAll(user_id: string): Promise<Sale[] | undefined> {
    const sales = await this.OrmRepository.find({
      where: { user_id },
    })
    return sales
  }

  public async findById(
    id: string,
    user_id: string,
  ): Promise<Sale | undefined> {
    const sales = await this.OrmRepository.findOne({ where: { user_id, id } })
    return sales
  }

  public async findByName(
    name: string,
    user_id: string,
  ): Promise<Sale[] | undefined> {
    const sales = await this.OrmRepository.find({ where: { user_id, name } })
    return sales
  }

  public async findByBrand(
    brand: string,
    user_id: string,
  ): Promise<Sale[] | undefined> {
    const sales = await this.OrmRepository.find({
      where: { user_id, brand },
    })
    return sales
  }
}

export default SaleRepository
