// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import api from '../../services/apiClient'
import Logo from '../../assets/createnewuser.png'
import { Border, Button, Input, Label, Page, Title } from './styles'

import Header from '../../components/Header/Header'
import { toast } from 'react-toastify'

const CreateNewUserPage: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { goBack } = useHistory()

  async function HandleSubmit(): Promise<void> {
    setEmail(email.toLowerCase())
    const data = { name, email, password }
    const schema = yup.object().shape({
      name: yup.string().required('Por Favor Informe um nome!!'),
      email: yup.string().required('Informe um Email!!'),
      password: yup.string().min(6,'Senha deve ter no minimo 6 caracteres').required('Informe Uma Senha!!'),
    })
    try {
      await schema.validate(data, {
        abortEarly: false,
      })
      await api.post('/subuser/signup', data)
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
    toast.success('Empregado Registrado Com Sucesso!')
    goBack()
  }

  return (
    <Border>
      <Page>
        <Header />
        <div className='container'>
          <div className='image-container'>
            <img src={Logo} alt='logo' />
          </div>
          <div className='login'>
            <Title>Registro de Empregados</Title>
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

            <Button onClick={HandleSubmit}>
              R{'  '}E{'  '}G{'  '}I{'  '}S{'  '}T{'  '}R{'  '}A{'  '}R
            </Button>
          </div>
        </div>
      </Page>
    </Border>
  )
}

export default CreateNewUserPage
