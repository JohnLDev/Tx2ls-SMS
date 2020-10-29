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
  }: ICreateSubUserDTO): Promise<SubUser> {
    const Subuser = this.ormRepository.create({
      name,
      email,
      password,
      user_id,
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

  public async findByEmail(email: string): Promise<SubUser | undefined> {
    const Subuser = await this.ormRepository.findOne({ where: { email } })
    return Subuser
  }

  public async findById(id: string): Promise<SubUser | undefined> {
    const Subuser = await this.ormRepository.findOne({
      where: { id },
      relations: ['images'],
    })
    return Subuser
  }

  public async findAll(): Promise<SubUser[] | undefined> {
    const Subuser = await this.ormRepository.find({ relations: ['images'] })
    return Subuser
  }
}

export default SubUserRepository
