// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft, FiLogOut, FiHome } from 'react-icons/fi'

import { Header } from './styles'
import Icon from '../../assets/icon.png'

const HeaderTop: React.FC = () => {
  const { goBack } = useHistory()
  return (
    <Header>
      <button onClick={goBack}>
        <FiArrowLeft size={24} color='#d3d3d3' />
      </button>

      <div className='logo'>
        <img src={Icon} alt='icone' />
        <h3>Lojas Okada Dashboard</h3>
      </div>
      <Link to='/dashboard'>
        <FiHome size={24} color='#d3d3d3' className='icon' />
        Home
      </Link>

      <button>
        <FiLogOut size={24} color='#d3d3d3' className='icon' />
        Logout
      </button>
    </Header>
  )
}

export default HeaderTop
