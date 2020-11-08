// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import * as yup from 'yup'
import Forgot from '../../assets/sadracoon.png'
import { Border, Button, Input, Label, Page, Title } from './styles'
import api from '../../services/apiClient'
import { toast } from 'react-toastify'

const EnterpriseForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const { push } = useHistory()
  async function handleSendEmail(): Promise<void> {
    setEmail(email.toLowerCase())
    const isEmail = yup.string().email().required()
    try {
      await isEmail.validate(email)
      await api.post('/user/redefine-password-email', { email })
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.errors.map(error => toast.error(error))
      }
      const {
        data: { message },
      } = error.response
      toast.error(message)
      return
    }
    toast.success('Cheque sua caixa de email email')
    push('/')
  }
  return (
    <Border>
      <Page id='login-page'>
        <div className='image-container'>
          <Link to='/'>
            <FiArrowLeft size={20} color='#363636' />
          </Link>
          <img src={Forgot} alt='logo' />
        </div>

        <div className='login'>
          <Title>Perdeu sua senha?</Title>
          <div className='input-block'>
            <div className='input'>
              <Label htmlFor='email'>E-mail:</Label>
            </div>
            <Input
              type='text'
              name='email'
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
              style={{ border: email ? '2px solid #A1E9C5' : '0' }}
            />
          </div>

          <Button onClick={handleSendEmail}>
            E{'  '}N{'  '}V{'  '}I{'  '}A{'  '}R
          </Button>
        </div>
      </Page>
    </Border>
  )
}

export default EnterpriseForgotPasswordPage
