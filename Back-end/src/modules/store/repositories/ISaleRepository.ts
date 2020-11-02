import ICreateSaleDTO from '../dtos/ICreateSaleDTO'
import Sale from '../infra/typeorm/entities/Sale'

export default interface ISaleRepository {
  create(data: ICreateSaleDTO): Promise<Sale>

  delete(id: string): Promise<void>

  update(sale: Sale): Promise<Sale | undefined>

  findByBrand(brand: string, user_id: string): Promise<Sale[] | undefined>

  findById(id: string, user_id: string): Promise<Sale | undefined>
  findByName(name: string, user_id: string): Promise<Sale[] | undefined>
  findAll(user_id: string): Promise<Sale[] | undefined>
}
