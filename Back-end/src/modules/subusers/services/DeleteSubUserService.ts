import AppError from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'
import { validate } from 'uuid'
import ISubUserRepository from '../repositories/ISubUserRepository'

interface IRequest {
  user_id: string
  id: string
}

@injectable()
export default class DeleteSubUserService {
  constructor(
    @inject('SubUserRepository')
    private SubUserRepository: ISubUserRepository,
  ) {}

  public async execute({ user_id, id }: IRequest): Promise<void> {
    if (!validate(id)) {
      throw new AppError('invalid id')
    }
    if (!validate(user_id)) {
      throw new AppError('invalid user_id')
    }

    const subUser = await this.SubUserRepository.findById(user_id, id)

    if (!subUser) {
      throw new AppError('user not found', 404)
    }
    await this.SubUserRepository.delete(id)
  }
}
