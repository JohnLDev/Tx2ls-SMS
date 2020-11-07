// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect } from 'react'

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
import DateMask from '../../utils/DateMask'
import api from '../../services/apiClient'
import { FiCornerDownLeft } from 'react-icons/fi'

interface Sale {
  id: number
  name: string
  brand: string
  amount: number
  price: number
  created_at: string
  sub_User: {
    name: string
  }
}

const History: React.FC = () => {
  const [income, setIncome] = useState(0)
  const [subUserName, setSubUserName] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateUntil, setDateUntil] = useState('')
  const [sales, setSales] = useState<Sale[]>([])

  useEffect(() => {
    api.get(`/sale/index`).then(response => {
      setSales(response.data)
    })
  }, [])

  const sale = sales.map(sale => sale.price)
  let SumSale: number
  if (sale.length > 0) {
    SumSale = sale.reduce((sum, item) => {
      return (sum =
        parseFloat((sum as unknown) as string) +
        parseFloat((item as unknown) as string))
    })
  }

  async function HandleRevertSale(id: number): Promise<void> {}
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
                <Input
                  name='vendedor'
                  value={subUserName}
                  onChange={({ target: { value } }) => {
                    setSubUserName(value)
                  }}
                ></Input>
              </div>

              <div className='input-block'>
                <label htmlFor='Produto'>De</label>
                <Input
                  name='dateFrom'
                  maxLength={10}
                  value={dateFrom}
                  onChange={({ target: { value } }) => {
                    setDateFrom(DateMask(value))
                  }}
                ></Input>
              </div>
              <div className='input-block'>
                <label htmlFor='Produto'>Até</label>
                <Input
                  name='dateUntil'
                  maxLength={10}
                  value={dateUntil}
                  onChange={({ target: { value } }) => {
                    setDateUntil(DateMask(value))
                  }}
                ></Input>
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
                    <th>Total</th>
                  </tr>
                  <tr>
                    <td className='span' />
                    <td className='span' />
                    <td className='span' />
                    <td className='span' />
                    <td className='span' />
                    <td className='span' />
                    <td>
                      {SumSale}
                      {'  '}
                      Reais
                    </td>
                  </tr>
                  {sales.map(sale => (
                    <tr key={sale.id}>
                      <td>{sale.sub_User.name}</td>
                      <td>{sale.name}</td>
                      <td>{sale.brand}</td>
                      <td>{sale.amount}</td>
                      <td>{sale.price}</td>
                      <td>{sale.created_at}</td>
                      <td className='span'></td>
                      <td>
                        <button
                          onClick={() => {
                            HandleRevertSale(sale.id)
                          }}
                        >
                          <FiCornerDownLeft size={15} color='#bf9040' />
                        </button>
                      </td>
                    </tr>
                  ))}
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
