import ICreateSubUser from '../dtos/ICreateSubUserDTO'
import SubUser from '../infra/typeorm/entities/SubUser'

export default interface ISubUserRepository {
  create(data: ICreateSubUser): Promise<SubUser>
  update(user: SubUser): Promise<SubUser>
  delete(id: string): Promise<void>
  findByEmail(email: string, user_id: string): Promise<SubUser | undefined>
  findById(user_id: string, id: string): Promise<SubUser | undefined>
  findAll(user_id: string): Promise<SubUser[] | undefined>
  findByName(user_id: string, name: string): Promise<SubUser | undefined>
}
