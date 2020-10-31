import { inject, injectable } from 'tsyringe'
import Sale from '../infra/typeorm/entities/Sale'
import ISaleRepository from '../repositories/ISaleRepository'
import IIndexSaleDTO from '../dtos/IIndexSaleDTO'

@injectable()
export default class IndexSaleService {
  constructor(
    @inject('SaleRepository')
    private saleRepository: ISaleRepository,
  ) {}

  public async execute({
    user_id,
    date,
    subUser_Name,
  }: IIndexSaleDTO): Promise<Sale[]> {}
}
