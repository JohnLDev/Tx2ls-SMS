import Sale from '../infra/typeorm/entities/Sale'
import FormatDate from '@shared/utils/FormatDate'

interface IResponse {
  id: string
  name: string
  brand: string
  price: number
  amount: number
  user_id: string
  subUser_id: string
  created_at: string
  updated_at: string
  sub_User?: {
    name: string
  }
}
export default {
  render(Sale: Sale): IResponse {
    return {
      id: Sale.id,
      name: Sale.name,
      brand: Sale.brand,
      price: Sale.price,
      amount: Sale.amount,
      user_id: Sale.user_id,
      subUser_id: Sale.subUser_id,
      created_at: FormatDate(Sale.created_at),
      updated_at: FormatDate(Sale.updated_at),
      sub_User: { name: Sale?.sub_User.name },
    }
  },
  renderMany(Sales: Sale[]): IResponse[] {
    return Sales.map(Sale => this.render(Sale))
  },
}
