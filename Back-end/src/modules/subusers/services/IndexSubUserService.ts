import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { validate } from 'uuid'
import SubUser from '../infra/typeorm/entities/SubUser'
import ISubUserRepository from '../repositories/ISubUserRepository'

interface IRequest {
  name?: string
  user_id: string
}

@injectable()
export default class IndexUserService {
  constructor(
    @inject('SubUserRepository')
    private SubUserRepository: ISubUserRepository,
  ) {}

  public async execute({ user_id, name }: IRequest): Promise<SubUser[]> {
    if (!validate(user_id)) {
      throw new AppError('invalid user_id')
    }
    if (name) {
      const subUsers = await this.SubUserRepository.findByName(user_id, name)
      if (!subUsers) {
        throw new AppError('SubUsers not found', 404)
      }
      const SubUsers = [subUsers]
      return SubUsers
    } else {
      const subUsers = await this.SubUserRepository.findAll(user_id)
      if (!subUsers) {
        throw new AppError('SubUsers not found', 404)
      }
      return subUsers
    }
  }
}
