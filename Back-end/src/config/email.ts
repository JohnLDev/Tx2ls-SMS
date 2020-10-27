import Nodemailer from 'nodemailer'
import { config } from 'dotenv'

config()
// const Mailer = Nodemailer.createTransport({
//   host: 'smtp.sendgrid.net',
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
    user: 'b089cbacf6346c',
    pass: 'da2d2b9799cf99',
  },
})

export default Mailer
