import Nodemailer from 'nodemailer'
import { config } from 'dotenv'

config()
const Mailer = Nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.EMAIL_API_KEY,
  },
})

export default Mailer
