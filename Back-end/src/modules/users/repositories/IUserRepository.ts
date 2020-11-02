import ICreateUser from '../dtos/ICreateUserDTO'
import User from '../infra/typeorm/entities/User'

export default interface IUserRepository {
  create(data: ICreateUser): Promise<User>
  update(user: User): Promise<User>
  delete(id: string): Promise<void>
  findByVerify_Key(verify_Key: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  findByEnterprise_Name(enterprise_Name: string): Promise<User[] | undefined>
  findById(id: string): Promise<User | undefined>
  findAll(): Promise<User[] | undefined>
}
