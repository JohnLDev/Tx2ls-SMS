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
    is_Adm,
  }: ICreateSubUserDTO): Promise<SubUser> {
    if (!validate(user_id)) {
      throw new AppError('user_id is invalid')
    }
    if (!is_Adm) {
      is_Adm = false
    }
    const data = {
      name,
      email,
      password,
      user_id,
      is_Adm,
    }

    const schema = yup.object().shape({
      name: yup.string().required('Insert a Name'),
      email: yup.string().email().required('Insert a Email'),
      password: yup.string().min(6).required('Insert a password'),
      user_id: yup.string().required(),
      isAdm: yup.boolean(),
    })
    await schema.validate(data)

    const existSubUserEmail = await this.SubUserRepository.findByEmail(
      email,
      user_id,
    )
    if (existSubUserEmail) {
      throw new AppError('Email already registered')
    }

    const existSubUserName = await this.SubUserRepository.findByName(
      user_id,
      name,
    )

    if (existSubUserName) {
      throw new AppError('Name already registered')
    }
    const hashedPassword = await hash(password, 8)
    data.password = hashedPassword

    const SubUser = await this.SubUserRepository.create(data)

    return SubUser
  }
}
