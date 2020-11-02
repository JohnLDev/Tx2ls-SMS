import ICreateSaleRepositoryDTO from '@modules/store/dtos/ICreateSaleRepositoryDTO'

import ISaleRepository from '@modules/store/repositories/ISaleRepository'
import Sale from '@modules/store/infra/typeorm/entities/Sale'

class FakeSaleRepository implements ISaleRepository {
  private Sales: Sale[] = []

  public async create({
    name,
    brand,
    price,
    amount,
    subUser_id,
    user_id,
  }: ICreateSaleRepositoryDTO): Promise<Sale> {
    const sale = new Sale()
    const created_at = new Date()
    const updated_at = new Date()
    Object.assign(sale, {
      id: '1',
      name,
      brand,
      price,
      amount,
      subUser_id,
      user_id,
      created_at,
      updated_at,
    })
    this.Sales.push(sale)
    return sale
  }

  public async delete(id: string): Promise<void> {
    this.Sales = this.Sales.filter(sale => sale.id !== id)
  }

  public async findAll(user_id: string): Promise<Sale[] | undefined> {
    if (this.Sales.length === 0) {
      return undefined
    }
    return this.Sales
  }

  public async findById(
    id: string,
    user_id: string,
  ): Promise<Sale | undefined> {
    const sale = this.Sales.find(sale => sale.id === id)
    return sale
  }

  public async findByName(
    name: string,
    user_id: string,
  ): Promise<Sale[] | undefined> {
    const sale = this.Sales.filter(sale => sale.name === name)
    return sale
  }

  public async findByBrand(
    brand: string,
    user_id: string,
  ): Promise<Sale[] | undefined> {
    const sales = this.Sales.filter(sale => sale.brand === brand)
    return sales
  }

  public async update(item: Sale): Promise<Sale | undefined> {
    this.Sales.filter(Sale => Sale.id === item.id)
    this.Sales.push(item)
    return item
  }
}

export default FakeSaleRepository
