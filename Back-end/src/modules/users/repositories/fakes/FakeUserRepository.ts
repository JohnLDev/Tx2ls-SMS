import { v4 } from 'uuid'
import IUserRepository from '@modules/users/repositories/IUserRepository'
import User from '@modules/users/infra/typeorm/entities/User'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import Image from '@modules/users/infra/typeorm/entities/Image'

class FakeUserRepository implements IUserRepository {
  private users: User[] = []

  public async create({
    name,
    email,
    password,
    enterprise_Name,
    whatsapp,
    images,
  }: ICreateUserDTO): Promise<User> {
    const user = new User()

    user.id = v4()
    user.name = name
    user.email = email
    user.password = password
    user.enterprise_Name = enterprise_Name
    user.whatsapp = whatsapp
    user.is_Verify = false
    user.verify_Key = v4()
    user.images = images as Image[]
    user.created_at = (Date.now() as unknown) as Date
    user.updated_at = (Date.now() as unknown) as Date
    this.users.push(user)
    return user
  }

  public async update(user: User): Promise<User> {
    this.users.filter(use => use.id === user.id)
    this.users.push(user)
    return user
  }

  public async delete(id: string): Promise<void> {
    this.users.filter(user => user.id === id)
  }

  public async findByVerify_Key(verify_Key: string): Promise<User | undefined> {
    const user = this.users.find(user => user.verify_Key === verify_Key)
    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email)
    return user
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id)

    if (!user) {
      return undefined
    }
    return user
  }

  public async findAll(): Promise<User[] | undefined> {
    if (this.users.length === 0) {
      return undefined
    }
    return this.users
  }

  public async findByEnterprise_Name(
    enterprise_Name: string,
  ): Promise<User[] | undefined> {
    const user = this.users.filter(
      user => user.enterprise_Name === enterprise_Name,
    )
    return user
  }
}

export default FakeUserRepository
