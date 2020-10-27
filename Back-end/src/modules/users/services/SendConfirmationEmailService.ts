import Mailer from '@config/email'
import AppError from '@shared/errors/AppError'
import path from 'path'
import fs from 'fs'
import handlebars from 'handlebars'

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
    Mailer.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
        throw new AppError('Error in verification email')
      } else {
        console.log('Email enviado: ' + info.response)
      }
    })
  }
}

export default SendConfirmationEmailService
