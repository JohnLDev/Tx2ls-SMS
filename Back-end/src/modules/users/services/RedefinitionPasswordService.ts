import { verify } from 'jsonwebtoken'
import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'
import User from '../infra/typeorm/entities/User'
import { inject, injectable } from 'tsyringe'
import IUserRepository from '../repositories/IUserRepository'
import * as yup from 'yup'
import { hash } from 'bcryptjs'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

interface IRequest {
  validationKey: string
  password: string
  passwordAgain: string
}

@injectable()
class RedefinitionPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    password,
    passwordAgain,
    validationKey,
  }: IRequest): Promise<User> {
    const data = {
      password,
      passwordAgain,
      validationKey,
    }
    console.log(data)
    const schema = yup.object().shape({
      password: yup.string().min(6).required(),
      passwordAgain: yup.string().min(6).required(),
      validationKey: yup.string().required(),
    })
    await schema.validate(data, { abortEarly: false })

    if (password !== passwordAgain) {
      throw new AppError('passwords does not match')
    }

    try {
      const decoded = verify(validationKey, authConfig.jwt.secret as string)

      const { sub } = decoded as ITokenPayload
      console.log(sub)
      const email = yup.string().email().required()
      await email.validate(sub)

      const user = await this.userRepository.findByEmail(sub)
      if (!user) {
        throw new AppError('Invalid validation key')
      }
      user.password = await hash(password, 8)
      await this.userRepository.update(user)
      return user
    } catch (error) {
      throw new AppError('Invalid validation key', 401)
    }
  }
}
export default RedefinitionPasswordService
