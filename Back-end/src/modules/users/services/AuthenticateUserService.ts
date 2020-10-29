import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { injectable, inject } from 'tsyringe'
import * as yup from 'yup'

import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'
import User from '@modules/users/infra/typeorm/entities/User'
import IUserRepository from '../repositories/IUserRepository'

interface IRequest {
  email: string
  password: string
}
interface IResponse {
  user: User
  token: string
}
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const schema = yup.string().email().required()

    const Valid = await schema.isValid(email)
    console.log(Valid)
    if (!Valid) {
      await schema.validate(email)
    }

    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    } else {
      if (!user.is_Verify) {
        throw new AppError('Please verify your email before continue')
      }
    }

    // user.password - Senha não cripitografada
    // password - Senha criptografada

    const passwordMatched = await compare(password, user.password)
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret as string, {
      subject: user.id,
      expiresIn: expiresIn,
    })

    return { user, token }
  }
}
export default AuthenticateUserService
