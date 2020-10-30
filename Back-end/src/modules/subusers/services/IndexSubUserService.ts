import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { validate } from 'uuid'
import SubUser from '../infra/typeorm/entities/SubUser'
import ISubUserRepository from '../repositories/ISubUserRepository'

@injectable()
export default class IndexUserService {
  constructor(
    @inject('SubUserRepository')
    private SubUserRepository: ISubUserRepository,
  ) {}

  public async execute(user_id: string): Promise<SubUser[]> {
    if (!validate(user_id)) {
      throw new AppError('invalid user_id')
    }

    const subUsers = await this.SubUserRepository.findAll(user_id)

    if (!subUsers) {
      throw new AppError('SubUsers not found', 404)
    }

    return subUsers
  }
}
