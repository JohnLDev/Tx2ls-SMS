// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft, FiLogOut, FiHome } from 'react-icons/fi'

import { Header } from './styles'
import { useAuth } from '../../hooks/authContext'

const HeaderTop: React.FC = () => {
  const { user, signOutSubUser } = useAuth()
  const { goBack, push } = useHistory()

  async function HandleSignOutSubUser(): Promise<void> {
    signOutSubUser()
    push('/login')
  }
  return (
    <Header>
      <button onClick={goBack}>
        <FiArrowLeft size={24} color='#d3d3d3' />
      </button>

      <div className='logo'>
        <img src={user.images[0].path} alt='icone' />
        <h3>{user.enterprise_Name} Dashboard</h3>
      </div>
      <Link to='/dashboard'>
        <FiHome size={24} color='#d3d3d3' className='icon' />
        Home
      </Link>

      <button onClick={HandleSignOutSubUser}>
        <FiLogOut size={24} color='#d3d3d3' className='icon' />
        Logout
      </button>
    </Header>
  )
}

export default HeaderTop
