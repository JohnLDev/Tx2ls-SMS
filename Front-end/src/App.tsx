// eslint-disable-next-line no-use-before-define
import React from 'react'
import Routes from './routes'
import GlobalStyle from './styles/global'

const Dashboard: React.FC = () => {
  return (
    <>
      <Routes />
      <GlobalStyle />
    </>
  )
}
export default Dashboard
