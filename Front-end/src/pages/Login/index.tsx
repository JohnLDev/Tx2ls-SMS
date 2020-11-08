// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect } from 'react'
import { Checkbox } from '@material-ui/core'
import * as yup from 'yup'
import { useAuth } from '../../hooks/authContext'
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
import { toast } from 'react-toastify'

const LoginPage: React.FC = () => {
  useEffect(() => {
    const alreadyEmail = localStorage.getItem('@Tx2ls-SMS:SubUser-Email')
    const alreadyPassword = localStorage.getItem('@Tx2ls-SMS:SubUser-Password')
    if (alreadyEmail && alreadyPassword) {
      setEmail(alreadyEmail)
      setPassword(alreadyPassword)
      setCheckbox(true)
    }
  }, [])
  const { signInSubUser, user } = useAuth()

  const { push } = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkbox, setCheckbox] = useState(false)

  async function HandleLogin(): Promise<void> {
    setEmail(email.toLowerCase())
    const data = { email, password }
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
      await signInSubUser({ email, password })
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
    if (checkbox) {
      localStorage.setItem('@Tx2ls-SMS:SubUser-Email', email)
      localStorage.setItem('@Tx2ls-SMS:SubUser-Password', password)
    } else {
      localStorage.removeItem('@Tx2ls-SMS:SubUser-Email')
      localStorage.removeItem('@Tx2ls-SMS:SubUser-Password')
    }

    push('/dashboard')
  }

  return (
    <Border>
      <Page id='login-page'>
        <div className='login'>
          <Title>Bem Vindo {user.enterprise_Name}</Title>
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
              <Checkbox
                checked={checkbox}
                color='primary'
                value={checkbox}
                onChange={({ target: { checked } }) => setCheckbox(checked)}
              ></Checkbox>
              <Label htmlFor='checkbox'>Lembrar de mim</Label>
            </div>
            <div className='forgot'>
              <Link to='/forgotpassword'>Esqueceu sua senha ?</Link>
            </div>
          </CheckboxDiv>
          <Button onClick={HandleLogin}>
            L{'  '}O{'  '}G{'  '}I{'  '}N
          </Button>
        </div>

        <div className='image-container'>
          <img src={user.images[1].path} alt='logo' />
        </div>
      </Page>
    </Border>
  )
}

export default LoginPage
