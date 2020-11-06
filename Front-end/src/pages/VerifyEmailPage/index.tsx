// eslint-disable-next-line no-use-before-define
import React from 'react'

import Logo from '../../assets/racoon.png'
import { Border, Button, Page, Title } from './styles'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../services/apiClient'
import { toast } from 'react-toastify'

interface VerifyParams {
  verify_Key: string
}

const VerifyEmailPage: React.FC = () => {
  const { verify_Key } = useParams<VerifyParams>()

  const { push } = useHistory()
  async function handleGoBack(): Promise<void> {
    try {
      console.log(`/user/verify-email/${verify_Key}`)
      await api.patch(`/user/verify-email/${verify_Key}`)
      toast('Email verificado!')
    } catch (error) {
      const {
        data: { message },
      } = error.response
      toast.error(message)
      return
    }
    push('/')
  }
  return (
    <Border>
      <Page id='login-page'>
        <div className='image-container'>
          <img src={Logo} alt='logo' />
        </div>

        <div className='login'>
          <Title>É só clicar em verificar! !</Title>

          <Button onClick={handleGoBack}>
            V{'  '}E{'  '}R{'  '}I{'  '}F{'  '}I{'  '}C{'  '}A{'  '}R
          </Button>
        </div>
      </Page>
    </Border>
  )
}

export default VerifyEmailPage
