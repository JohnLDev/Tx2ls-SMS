import ICreateSubUser from '../dtos/ICreateSubUserDTO'
import SubUser from '../infra/typeorm/entities/SubUser'

export default interface IUserRepository {
  create(data: ICreateSubUser): Promise<SubUser>
  update(user: SubUser): Promise<SubUser>
  delete(id: string): Promise<void>
  findByEmail(email: string): Promise<SubUser | undefined>
  findById(id: string): Promise<SubUser | undefined>
  findAll(): Promise<SubUser[] | undefined>
}
