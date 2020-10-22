// eslint-disable-next-line no-use-before-define
import React from 'react'

import {
  Border,
  Input,
  InputMenor,
  Page,
  SalesContainer,
  SellButton,
  SellButtonRight,
  Venda,
} from './styles'
import Header from '../../components/Header/Header'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

const Sales: React.FC = () => {
  return (
    <Border>
      <Page>
        <Header />
        <SalesContainer>
          <div className='barcode'>
            <h2>Vendas Via Código de barras</h2>
            <div className='inputs'>
              <div className='input-block'>
                <label htmlFor='barcode'>Código de barras</label>
                <Input name='barcode' />
              </div>
              <div className='input-block'>
                <label htmlFor='amount'>Quantidade</label>
                <InputMenor name='amount' />
              </div>
            </div>
            <SellButton>Vender</SellButton>
            <div className='lastsell'>
              <h3>Ultimas vendas</h3>
              <Venda>
                <p>Produto vendido 500 reais</p>
              </Venda>
            </div>
          </div>
          <div className='list'>
            <h2>Vendas Via Lista de produtos</h2>
            <div className='inputs'>
              <div className='input-block'>
                <Autocomplete
                  id='combo-box-demo'
                  options={[]}
                  // getOptionLabel={() => {}}
                  style={{ width: 150, height: 10 }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label='Produtos'
                      variant='outlined'
                    />
                  )}
                />
              </div>
              <SellButtonRight>Vender</SellButtonRight>
            </div>

            <div className='lastsell'>
              <h3>Ultimas vendas</h3>
              <Venda>
                <p>Produto vendido 500 reais</p>
              </Venda>
            </div>
          </div>
        </SalesContainer>
      </Page>
    </Border>
  )
}

export default Sales
