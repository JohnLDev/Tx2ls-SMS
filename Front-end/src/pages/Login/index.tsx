// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { Checkbox } from '@material-ui/core'

import Logo from '../../assets/logo.png'
import {
  Border,
  Button,
  CheckboxDiv,
  Input,
  Label,
  Page,
  Title,
} from './styles'
import { Link } from 'react-router-dom'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
              <Checkbox></Checkbox>
              <Label htmlFor='checkbox'>Lembrar de mim</Label>
            </div>
            <div className='forgot'>
              <Link to='/forgotpassword'>Esqueceu sua senha ?</Link>
            </div>
          </CheckboxDiv>
          <Button>
            L{'  '}O{'  '}G{'  '}I{'  '}N
          </Button>
        </div>

        <div className='image-container'>
          <img src={Logo} alt='logo' />
        </div>
      </Page>
    </Border>
  )
}

export default LoginPage
