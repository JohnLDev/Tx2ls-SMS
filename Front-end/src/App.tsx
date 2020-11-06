// eslint-disable-next-line no-use-before-define
import React from 'react'
import Routes from './routes'
import GlobalStyle from './styles/global'
import { AuthProvider } from './hooks/authContext'
import { ToastContainer } from 'react-toastify'

const Dashboard: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <GlobalStyle />
      <ToastContainer />
    </>
  )
}
export default Dashboard
