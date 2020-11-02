import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { validate } from 'uuid'
import IUpdateSubUserDTO from '../dtos/IUpdateSubUserDTO'
import SubUser from '../infra/typeorm/entities/SubUser'
import ISubUserRepository from '../repositories/ISubUserRepository'
import * as yup from 'yup'
import { hash } from 'bcryptjs'

@injectable()
export default class {
  constructor(
    @inject('SubUserRepository')
    private subUserRepository: ISubUserRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    user_id,
    id,
  }: IUpdateSubUserDTO): Promise<SubUser> {
    if (!validate(user_id)) {
      throw new AppError('user_id is invalid')
    }

    if (!validate(id)) {
      throw new AppError('id is invalid')
    }

    if (!name && !email && !password) {
      throw new AppError(
        'you need to inform at least one field to update a sub user',
      )
    }

    const data = {
      name,
      email,
      password,
      user_id,
      id,
    }

    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      password: yup.string().min(6),
      user_id: yup.string().required(),
      id: yup.string().required(),
    })
    await schema.validate(data)

    const subUser = await this.subUserRepository.findById(user_id, id)

    if (!subUser) {
      throw new AppError('user does not exist', 404)
    }
    if (name) {
      const existName = await this.subUserRepository.findByName(user_id, name)
      if (existName) {
        throw new AppError('Name already exists')
      }
      subUser.name = name
    }
    if (password) {
      subUser.password = await hash(password, 8)
    }
    if (email) {
      const existEmail = await this.subUserRepository.findByEmail(
        email,
        user_id,
      )
      if (existEmail) {
        throw new AppError('email already exists')
      }
      subUser.email = email
    }
    await this.subUserRepository.update(subUser)
    return subUser
  }
}
