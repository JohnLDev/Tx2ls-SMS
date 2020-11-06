import ICreateSubUserDTO from '@modules/subusers/dtos/ICreateSubUserDTO'
import ISubUserRepository from '@modules/subusers/repositories/ISubUserRepository'
import { getRepository, Repository } from 'typeorm'
import SubUser from '../entities/SubUser'

class SubUserRepository implements ISubUserRepository {
  private ormRepository: Repository<SubUser>

  constructor() {
    this.ormRepository = getRepository(SubUser)
  }

  public async create({
    name,
    email,
    password,
    user_id,
    is_Adm,
  }: ICreateSubUserDTO): Promise<SubUser> {
    const Subuser = this.ormRepository.create({
      name,
      email,
      password,
      user_id,
      is_Adm,
    })
    await this.ormRepository.save(Subuser)
    return Subuser
  }

  public async update(Subuser: SubUser): Promise<SubUser> {
    await this.ormRepository.save(Subuser)
    return Subuser
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }

  public async findByEmail(
    email: string,
    user_id: string,
  ): Promise<SubUser | undefined> {
    const Subuser = await this.ormRepository.findOne({
      where: { email, user_id },
    })
    return Subuser
  }

  public async findById(
    user_id: string,
    id: string,
  ): Promise<SubUser | undefined> {
    const Subuser = await this.ormRepository.findOne({
      where: { user_id, id },
    })
    return Subuser
  }

  public async findAll(user_id: string): Promise<SubUser[] | undefined> {
    const Subuser = await this.ormRepository.find({
      where: { user_id },
    })
    return Subuser
  }

  public async findByName(
    user_id: string,
    name: string,
  ): Promise<SubUser | undefined> {
    const Subuser = await this.ormRepository.findOne({
      where: { user_id, name },
    })
    return Subuser
  }
}

export default SubUserRepository
