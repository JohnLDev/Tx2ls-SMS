// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Link } from 'react-router-dom'

import { Block, Border, Dash, MiniHeader, Page } from './styles'
import Header from '../../components/Header/Header'
import Vendas from '../../assets/vendas.png'
import Inventário from '../../assets/inv.png'
import BarCode from '../../assets/barcode.png'
import NewUser from '../../assets/newuser.png'

const Dashboard: React.FC = () => {
  return (
    <Border>
      <Page>
        <Header />
        <Dash>
          <Block>
            <Link to='/sales'>
              <MiniHeader>Vendas</MiniHeader>
              <img src={Vendas} alt='vendas' />
            </Link>
          </Block>
          <Block>
            <Link to='/'>
              <MiniHeader>Inventário</MiniHeader>
              <img src={Inventário} alt='inventário' />
            </Link>
          </Block>
          <Block>
            <Link to='/'>
              <MiniHeader>Gerar BarCode</MiniHeader>
              <img src={BarCode} alt='Código de barras' />
            </Link>
          </Block>
          <Block>
            <Link to='/'>
              <MiniHeader>Criar um novo usuário</MiniHeader>
              <img src={NewUser} alt='Código de barras' />
            </Link>
          </Block>
        </Dash>
      </Page>
    </Border>
  )
}

export default Dashboard
