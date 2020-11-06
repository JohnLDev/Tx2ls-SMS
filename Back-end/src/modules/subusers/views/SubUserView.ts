import SubUser from '../infra/typeorm/entities/SubUser'
import FormatDate from '@shared/utils/FormatDate'

interface IResponse {
  id: string
  name: string
  email: string
  isAdm: boolean
  created_at: string
  updated_at: string
}
export default {
  render(subUser: SubUser): IResponse {
    return {
      id: subUser.id,
      name: subUser.name,
      email: subUser.email,
      isAdm: subUser.is_Adm,
      created_at: FormatDate(subUser.created_at),
      updated_at: FormatDate(subUser.updated_at),
    }
  },
  renderMany(subUsers: SubUser[]): IResponse[] {
    return subUsers.map(subUser => this.render(subUser))
  },
}
