import User from '../infra/typeorm/entities/User'
import FormatDate from '@shared/utils/FormatDate'
import ImageView from '../views/ImageView'

interface IResponseImage {
  id: number
  path: string
}

interface IResponse {
  id: string
  name: string
  email: string
  enterprise_Name: string
  whatsapp: number
  verify_Key: string
  images: IResponseImage[]
  created_at: string
  updated_at: string
}
export default {
  render(user: User): IResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      enterprise_Name: user.enterprise_Name,
      whatsapp: user.whatsapp,
      verify_Key: user.verify_Key,
      images: ImageView.renderMany(user.images),
      created_at: FormatDate(user.created_at),
      updated_at: FormatDate(user.updated_at),
    }
  },
  renderMany(users: User[]): IResponse[] {
    return users.map(user => this.render(user))
  },
}
