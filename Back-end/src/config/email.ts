import Nodemailer from 'nodemailer'
import { config } from 'dotenv'
import 'dotenv/config'
config()
// const Mailer = Nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: 587,
//   auth: {
//     user: 'apikey',
//     pass: process.env.EMAIL_API_KEY,
//   },
// })

const Mailer = Nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAIL_TRAP_USER,
    pass: process.env.MAIL_TRAP_PASSWORD,
  },
})

export default Mailer
