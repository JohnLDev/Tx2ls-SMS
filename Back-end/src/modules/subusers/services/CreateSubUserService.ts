import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import SubUser from '../infra/typeorm/entities/SubUser'
import ISubUserRepository from '../repositories/ISubUserRepository'
import * as yup from 'yup'
import { hash } from 'bcryptjs'
import AppError from '@shared/errors/AppError'

import ICreateSubUserDTO from '@modules/subusers/dtos/ICreateSubUserDTO'
import { validate } from 'uuid'
@injectable()
export default class CreateSubUserService {
  constructor(
    @inject('SubUserRepository')
    private SubUserRepository: ISubUserRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    user_id,
  }: ICreateSubUserDTO): Promise<SubUser> {
    if (!validate(user_id)) {
      throw new AppError('user_id is invalid')
    }
    const data = {
      name,
      email,
      password,
      user_id,
    }

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
      user_id: yup.string().required(),
    })
    await schema.validate(data)

    const existSubUser = await this.SubUserRepository.findByEmail(
      email,
      user_id,
    )
    if (existSubUser) {
      throw new AppError('Email already registered')
    }
    const hashedPassword = await hash(password, 8)
    data.password = hashedPassword
    const SubUser = await this.SubUserRepository.create(data)

    return SubUser
  }
}
