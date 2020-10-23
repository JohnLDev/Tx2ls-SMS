// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Link } from 'react-router-dom'

import { Block, Border, Dash, MiniHeader, Page } from './styles'
import Header from '../../components/Header/Header'
import Vendas from '../../assets/sales.png'
import Inventário from '../../assets/inv.png'
import BarCode from '../../assets/barcode.png'
import NewUser from '../../assets/newuser3.png'
import History from '../../assets/history.svg'

const Dashboard: React.FC = () => {
  return (
    <Border>
      <Page>
        <Header />
        <Dash>
          <Block>
            <Link to='/sales'>
              <MiniHeader>Realizar vendas</MiniHeader>
              <img src={Vendas} alt='vendas' />
            </Link>
          </Block>
          <Block>
            <Link to='/inventory'>
              <MiniHeader>Inventário</MiniHeader>
              <img src={Inventário} alt='inventário' />
            </Link>
          </Block>
          <Block>
            <Link to='/barcode'>
              <MiniHeader>Gerar código de barras</MiniHeader>
              <img src={BarCode} alt='Código de barras' />
            </Link>
          </Block>
          <Block>
            <Link to='/history'>
              <MiniHeader>Histórico</MiniHeader>
              <img src={History} alt='Novo usuário' />
            </Link>
          </Block>
          <Block>
            <Link to='/newuser'>
              <MiniHeader>Criar um novo usuário</MiniHeader>
              <img src={NewUser} alt='Novo usuário' />
            </Link>
          </Block>
        </Dash>
      </Page>
    </Border>
  )
}

export default Dashboard
