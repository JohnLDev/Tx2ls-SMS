import Storage from '../infra/typeorm/entities/Storage'
import FormatDate from '@shared/utils/FormatDate'

interface IResponse {
  id: string
  name: string
  brand: string
  price: number
  amount: number
  barcode: string
  user_id: string
  created_at: string
  updated_at: string
}
export default {
  render(Storage: Storage): IResponse {
    return {
      id: Storage.id,
      barcode: Storage.barcode,
      name: Storage.name,
      brand: Storage.brand,
      price: Storage.price,
      amount: Storage.amount,
      user_id: Storage.user_id,
      created_at: FormatDate(Storage.created_at),
      updated_at: FormatDate(Storage.updated_at),
    }
  },
  renderMany(Storages: Storage[]): IResponse[] {
    return Storages.map(Storage => this.render(Storage))
  },
}
