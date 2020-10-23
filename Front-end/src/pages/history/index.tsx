// eslint-disable-next-line no-use-before-define
import React from 'react'

import {
  Border,
  Input,
  Page,
  HistoryContainer,
  HisyoryDiv,
  FindHistory,
  SellButton,
} from './styles'
import Header from '../../components/Header/Header'

const History: React.FC = () => {
  return (
    <Border>
      <Page>
        <Header />
        <HistoryContainer>
          <FindHistory>
            <h2>Buscar no histórico</h2>
            <div className='inputs'>
              <div className='input-block'>
                <label htmlFor='vendedor'>Vendedor</label>
                <Input name='vendedor'></Input>
              </div>
              <div className='input-block'>
                <label htmlFor='Produto'>Produto</label>
                <Input name='Produto'></Input>
              </div>
              <div className='input-block'>
                <label htmlFor='Produto'>Marca</label>
                <Input name='Produto'></Input>
              </div>
              <div className='input-block'>
                <label htmlFor='Produto'>Data</label>
                <Input name='Produto'></Input>
              </div>
              <SellButton>
                P{'  '}R{'  '}O{'  '}C{'  '}U{'  '}R{'  '}A{'  '}R
              </SellButton>
            </div>
          </FindHistory>
          <HisyoryDiv>
            <h2>Histórico de vendas</h2>

            <div className='history'>
              <table className='table'>
                <tbody>
                  <tr>
                    <th>Vendedor</th>
                    <th>Produto</th>
                    <th>Marca</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                    <th>Data</th>
                  </tr>
                  <tr>
                    <td>John Lenon</td>
                    <td>Shanpoo</td>
                    <td>loreal</td>
                    <td>3</td>
                    <td>14,99</td>
                    <td>23/10/2020</td>
                  </tr>
                  <tr>
                    <td>Ian Mathias</td>
                    <td>Amaciante 5L</td>
                    <td>Omo</td>
                    <td>400</td>
                    <td>18,00</td>
                    <td>23/10/2020</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </HisyoryDiv>
        </HistoryContainer>
      </Page>
    </Border>
  )
}

export default History
