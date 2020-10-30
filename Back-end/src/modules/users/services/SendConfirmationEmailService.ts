import Mailer from '@config/email'
import path from 'path'
import fs from 'fs'
import handlebars from 'handlebars'
import * as yup from 'yup'
import { validate } from 'uuid'
import AppError from '@shared/errors/AppError'

interface IRequest {
  name: string
  email: string
  verify_Key: string
  enterprise_Name: string
}

class SendConfirmationEmailService {
  public async execute({
    name,
    email,
    verify_Key,
    enterprise_Name,
  }: IRequest): Promise<void> {
    const schema = yup.string().email().required()
    await schema.validate(email)

    if (!validate(verify_Key)) {
      throw new AppError('verify_Key is invalid')
    }

    const filePath = path.join(
      __dirname,
      '../../../shared/templates/EmailVerification.html',
    )
    const source = fs.readFileSync(filePath, 'utf-8').toString()
    const template = handlebars.compile(source)
    const replacements = {
      verify_Key,
      name,
      enterprise_Name,
    }
    const htmlToSend = template(replacements)

    const mailOptions = {
      from: 'linkgamercheetos@gmail.com',
      to: email,
      subject: `Tx2l's confirmação de email`,
      html: htmlToSend,
      context: verify_Key,
    }
    Mailer.sendMail(mailOptions)
  }
}

export default SendConfirmationEmailService
