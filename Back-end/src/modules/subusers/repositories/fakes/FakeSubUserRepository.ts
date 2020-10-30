import ICreateSubUserDTO from '@modules/subusers/dtos/ICreateSubUserDTO'
import SubUser from '@modules/subusers/infra/typeorm/entities/SubUser'
import ISubUserRepository from '@modules/subusers/repositories/ISubUserRepository'
import User from '@modules/users/infra/typeorm/entities/User'

import { v4 } from 'uuid'

class SubUserRepository implements ISubUserRepository {
  private subUsers: SubUser[] = []
  private user: User

  public async create({
    name,
    email,
    password,
    user_id,
  }: ICreateSubUserDTO): Promise<SubUser> {
    const subUser = new SubUser()
    subUser.id = v4()
    subUser.name = name
    subUser.email = email
    subUser.password = password
    subUser.user_id = user_id
    subUser.created_at = (Date.now() as unknown) as Date
    subUser.updated_at = (Date.now() as unknown) as Date

    this.subUsers.push(subUser)
    return subUser
  }

  public async update(Subuser: SubUser): Promise<SubUser> {
    const existSubUser = this.subUsers.find(
      subUser => subUser.id === Subuser.id,
    )
    this.subUsers.filter(subUser => subUser === existSubUser)
    this.subUsers.push(Subuser)
    return Subuser
  }

  public async delete(id: string): Promise<void> {
    this.subUsers.filter(subUser => subUser.id === id)
  }

  public async findByEmail(
    email: string,
    user_id: string,
  ): Promise<SubUser | undefined> {
    const Subuser = this.subUsers.find(subUser => subUser.email === email)
    return Subuser
  }

  public async findById(
    user_id: string,
    id: string,
  ): Promise<SubUser | undefined> {
    const Subuser = this.subUsers.find(subUser => subUser.id === id)
    return Subuser
  }

  public async findAll(user_id: string): Promise<SubUser[] | undefined> {
    if (this.subUsers.length === 0) {
      return undefined
    }
    return this.subUsers
  }

  public async findByName(
    user_id: string,
    name: string,
  ): Promise<SubUser | undefined> {
    const Subuser = this.subUsers.find(subUser => subUser.name === name)

    return Subuser
  }
}

export default SubUserRepository
