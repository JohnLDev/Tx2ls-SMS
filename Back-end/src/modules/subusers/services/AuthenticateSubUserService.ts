import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { injectable, inject } from 'tsyringe'
import * as yup from 'yup'

import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'

import ISubUserRepository from '../repositories/ISubUserRepository'
import SubUser from '../infra/typeorm/entities/SubUser'
import ILoginSubUserDTO from '@modules/subusers/dtos/ILoginSubUserDTO'

interface IResponse {
  subUser: SubUser
  token: string
}
@injectable()
class AuthenticateSubUserService {
  constructor(
    @inject('SubUserRepository')
    private subUserRepository: ISubUserRepository,
  ) {}

  public async execute({
    email,
    password,
    user_id,
  }: ILoginSubUserDTO): Promise<IResponse> {
    const schema = yup.string().email().required()

    const Valid = await schema.isValid(email)

    if (!Valid) {
      await schema.validate(email)
    }

    const subUser = await this.subUserRepository.findByEmail(email, user_id)
    if (!subUser) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    // user.password - Senha não cripitografada
    // password - Senha criptografada

    const passwordMatched = await compare(password, subUser.password)
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const subject = user_id + '_' + subUser.id

    const token = sign({}, secret as string, {
      subject,
      expiresIn: expiresIn,
    })

    return { subUser, token }
  }
}
export default AuthenticateSubUserService
