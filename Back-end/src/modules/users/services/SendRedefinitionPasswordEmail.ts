import { inject, injectable } from 'tsyringe'
import IUserRepository from '../repositories/IUserRepository'
import * as yup from 'yup'
import AppError from '@shared/errors/AppError'
import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'
import Mailer from '@config/email'
import path from 'path'
import fs from 'fs'
import handlebars from 'handlebars'

@injectable()
class SendRedefinitionPasswordEmail {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(email: string): Promise<string> {
    const emailValidation = yup.string().email().required()
    await emailValidation.validate(email)

    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('User not found')
    }
    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret as string, {
      subject: user.email,
      expiresIn: expiresIn,
    })
    const link = 'redefine-password-enterprise'
    const filePath = path.join(
      __dirname,
      '../../../../templates/EmailRedefinitionPassword.html',
    )
    const source = fs.readFileSync(filePath, 'utf-8').toString()
    const template = handlebars.compile(source)
    const replacements = {
      token,
      link,
    }
    const htmlToSend = template(replacements)

    const mailOptions = {
      from: 'linkgamercheetos@gmail.com',
      to: email,
      subject: `Tx2l's Redefinição de senha`,
      html: htmlToSend,
      context: token,
    }
    Mailer.sendMail(mailOptions)
    return token
  }
}

export default SendRedefinitionPasswordEmail
