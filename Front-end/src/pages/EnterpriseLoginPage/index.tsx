// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '../../assets/racoon.png'
import {
  Border,
  Button,
  CheckboxDiv,
  Input,
  Label,
  Page,
  Title,
} from './styles'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../hooks/authContext'

const EnterpriseLoginPage: React.FC = () => {
  const { signIn } = useAuth()
  const { push } = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function HandleLogin(): Promise<void> {
    setEmail(email.toLowerCase())
    const data = {
      email,
      password,
    }

    const schema = yup.object().shape({
      email: yup
        .string()
        .email('Seu email precisa ser válido')
        .required('Você precisa informar um email'),
      password: yup
        .string()
        .min(6, 'Sua senha deve conter no minimo 6 caracteres')
        .required('Você precisa informar sua senha'),
    })
    try {
      await schema.validate(data, { abortEarly: false })
      await signIn({ email, password })
      toast('Logado com sucesso !!')
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.errors.map(error => toast.error(error, {}))
        return
      }
      const {
        data: { message },
      } = error.response
      toast.error(message)
      return
    }
    push('/login')
  }

  return (
    <Border>
      <Page id='login-page'>
        <div className='login'>
          <Title>Bem Vindo</Title>
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

            <div className='input'>
              <Label htmlFor='password'>Senha:</Label>
            </div>
            <Input
              type='password'
              name='password'
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
              style={{ border: password ? '2px solid #A1E9C5' : '0' }}
            />
          </div>
          <CheckboxDiv>
            <div className='checkbox-block'>
              <Link to='/newenterprise'>Novo usuário?</Link>
            </div>
            <div className='forgot'>
              <Link to='/forgotenterprise'>Esqueceu sua senha ?</Link>
            </div>
          </CheckboxDiv>
          <Button onClick={HandleLogin}>
            L{'  '}O{'  '}G{'  '}I{'  '}N
          </Button>
        </div>

        <div className='image-container'>
          <h1>* Tx2ls *</h1>
          <h1>Store Management Software</h1>
          <img src={Logo} alt='logo' />
        </div>
      </Page>
    </Border>
  )
}

export default EnterpriseLoginPage
