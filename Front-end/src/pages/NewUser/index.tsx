// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'

import Logo from '../../assets/createnewuser.png'
import { Border, Button, Input, Label, Page, Title } from './styles'

import Header from '../../components/Header/Header'

const CreateNewUserPage: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Border>
      <Page>
        <Header />
        <div className='container'>
          <div className='image-container'>
            <img src={Logo} alt='logo' />
          </div>
          <div className='login'>
            <Title>Registro de SubUsuário</Title>
            <div className='input-block'>
              <div className='input'>
                <Label htmlFor='email'>Nome:</Label>
              </div>
              <Input
                type='text'
                name='email'
                value={name}
                onChange={({ target: { value } }) => setName(value)}
                style={{ border: name ? '2px solid #A1E9C5' : '0' }}
              />

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

            <Button>
              R{'  '}E{'  '}G{'  '}I{'  '}S{'  '}T{'  '}R{'  '}A{'  '}R
            </Button>
          </div>
        </div>
      </Page>
    </Border>
  )
}

export default CreateNewUserPage
