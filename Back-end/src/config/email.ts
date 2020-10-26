import Nodemailer from 'nodemailer'
import { config } from 'dotenv'

config()
const Mailer = Nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.EMAIL_API_KEY,
  },
})
export default Mailer
