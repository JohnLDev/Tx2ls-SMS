import { inject, injectable } from 'tsyringe'
import Sale from '../infra/typeorm/entities/Sale'
import ISaleRepository from '../repositories/ISaleRepository'
import IIndexSaleDTO from '../dtos/IIndexSaleDTO'
import { validate } from 'uuid'
import AppError from '@shared/errors/AppError'
import { isAfter, isBefore } from 'date-fns'
import * as yup from 'yup'
import ISubUserRepository from '@modules/subusers/repositories/ISubUserRepository'

@injectable()
export default class IndexSaleService {
  private sales: Sale[] = []

  constructor(
    @inject('SaleRepository')
    private saleRepository: ISaleRepository,
    @inject('SubUserRepository')
    private subUserRepository: ISubUserRepository,
  ) {}

  public async execute({
    user_id,
    fromDate,
    untilDate,
    subUser_Name,
  }: IIndexSaleDTO): Promise<Sale[]> {
    if (!validate(user_id)) {
      throw new AppError('user_id is not valid')
    }

    const data = {
      user_id,
      fromDate,
      untilDate,
      subUser_Name,
    }

    const schema = yup.object().shape({
      user_id: yup.string().required(),
      fromDate: yup.string().max(10),
      untilDate: yup.string().max(10),
      subUser_Name: yup.string(),
    })
    await schema.validate(data)

    const sales = await this.saleRepository.findAll(user_id)
    if (!sales) {
      throw new AppError('does not exist registered sales to found')
    }
    this.sales = sales

    if (fromDate) {
      const [day1, month1, year1] = fromDate.split('/')

      const dateAfter: Date = new Date(
        (year1 as unknown) as number,
        ((month1 as unknown) as number) - 1,
        (day1 as unknown) as number,
      )

      this.sales = this.sales.filter(sale =>
        isAfter(sale.created_at, dateAfter),
      )
    }

    if (untilDate) {
      const [day2, month2, year2] = untilDate.split('/')

      const dateBefore: Date = new Date(
        (year2 as unknown) as number,
        ((month2 as unknown) as number) - 1,
        (day2 as unknown) as number,
      )

      this.sales = this.sales.filter(sale =>
        isBefore(sale.created_at, dateBefore),
      )
    }

    if (subUser_Name) {
      this.sales = this.sales.filter(
        sale => sale.sub_User.name === subUser_Name,
      )
    }
    return this.sales
  }
}
