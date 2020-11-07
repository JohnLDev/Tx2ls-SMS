// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import * as yup from 'yup'
import Forgot from '../../assets/forgot-key.png'
import { Border, Button, Input, Label, Page, Title } from './styles'
import { toast } from 'react-toastify'
import api from '../../services/apiClient'

const RedefinePasswordPage: React.FC = () => {
  const [validationKey, setValidationKey] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')

  const { push } = useHistory()

  async function HandleRedefinePassword(): Promise<void> {
    const data = {
      validationKey,
      password,
      passwordAgain,
    }
    const schema = yup.object().shape({
      validationKey: yup
        .string()
        .required('Você precisa informar uma chave de validação'),
      password: yup
        .string()
        .min(6, 'Sua senha precisa de no minimo 6 caracteres')
        .required('Você precisa informar uma senha'),
      passwordAgain: yup
        .string()
        .min(6, 'Sua senha precisa de no minimo 6 caracteres')
        .required('Você precisa informar uma senha'),
    })

    try {
      await schema.validate(data, { abortEarly: false })
      await api.patch('/subuser/redefine-password', data)
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
    toast.success('Senha alterada com sucesso')
    push('/login')
  }

  return (
    <Border>
      <Page id='login-page'>
        <div className='image-container'>
          <img src={Forgot} alt='logo' />
        </div>

        <div className='login'>
          <Link to='/'>
            <FiArrowLeft size={24} color='#363636' />
          </Link>
          <Title>Perdeu sua senha?</Title>
          <div className='input-block'>
            <div className='input'>
              <Label htmlFor='password'>Chave de validação:</Label>
            </div>
            <Input
              type='text'
              name='password'
              value={validationKey}
              onChange={({ target: { value } }) => setValidationKey(value)}
              style={{ border: validationKey ? '2px solid #A1E9C5' : '0' }}
            />
          </div>
          <div className='input-block'>
            <div className='input'>
              <Label htmlFor='password'>Nova senha:</Label>
            </div>
            <Input
              type='password'
              name='password'
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
              style={{ border: password ? '2px solid #A1E9C5' : '0' }}
            />
          </div>
          <div className='input-block'>
            <div className='input'>
              <Label htmlFor='password'>Nova senha novamente:</Label>
            </div>
            <Input
              type='password'
              name='password'
              value={passwordAgain}
              onChange={({ target: { value } }) => setPasswordAgain(value)}
              style={{ border: passwordAgain ? '2px solid #A1E9C5' : '0' }}
            />
          </div>

          <Button onClick={HandleRedefinePassword}>
            R{'  '}E{'  '}D{'  '}E{'  '}F{'  '}I{'  '}N{'  '}I{'  '}R
          </Button>
        </div>
      </Page>
    </Border>
  )
}

export default RedefinePasswordPage
