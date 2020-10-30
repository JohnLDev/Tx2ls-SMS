import { ValidationError } from 'yup'
import SendConfirmationEmailService from './SendConfirmationEmailService'
import AppError from '@shared/errors/AppError'
import { v4 } from 'uuid'

describe('SendConfirmationEmailService', () => {
  it('should be able to send a confirmation email', async () => {
    const sendConfirmationEmailService = new SendConfirmationEmailService()
    const wasSend = await sendConfirmationEmailService.execute({
      name: 'test',
      email: 'johnlenon2011@hotmail.com',
      enterprise_Name: 'tx2ls',
      verify_Key: v4(),
    })
    expect(wasSend).toBeUndefined()
  })

  it('should be no able to send a confirmation email without a valid email', async () => {
    const sendConfirmationEmailService = new SendConfirmationEmailService()

    expect(
      sendConfirmationEmailService.execute({
        name: 'João',
        email: 'não é email',
        enterprise_Name: 'tx2ls',
        verify_Key: v4(),
      }),
    ).rejects.toBeInstanceOf(ValidationError)
  })

  it('should be no able to send a confirmation email without a valid verify_Key', async () => {
    const sendConfirmationEmailService = new SendConfirmationEmailService()

    expect(
      sendConfirmationEmailService.execute({
        name: 'João',
        email: 'johnlenon2011@gmail.com',
        enterprise_Name: 'tx2ls',
        verify_Key: 'dasdasdasd',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
