// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'

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
import { Link } from 'react-router-dom'

const EnterpriseLoginPage: React.FC = () => {
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
              <Link to='/newenterprise'>Novo usuário?</Link>
            </div>
            <div className='forgot'>
              <Link to='/forgotenterprise'>Esqueceu sua senha ?</Link>
            </div>
          </CheckboxDiv>
          <Button>
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
