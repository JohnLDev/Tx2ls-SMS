// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import Forgot from '../../assets/sadracoon.png'
import { Border, Button, Input, Label, Page, Title } from './styles'

const EnterpriseForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('')

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

          <Button>
            E{'  '}N{'  '}V{'  '}I{'  '}A{'  '}R
          </Button>
        </div>
      </Page>
    </Border>
  )
}

export default EnterpriseForgotPasswordPage