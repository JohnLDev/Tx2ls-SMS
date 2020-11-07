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
import { toast } from 'react-toastify'

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
  const [subUserName, setSubUserName] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateUntil, setDateUntil] = useState('')
  const [sales, setSales] = useState<Sale[]>([])

  useEffect(() => {
    api.get(`/sale/index`).then(response => {
      setSales(response.data)
    })
  }, [])

  function GetIncome(): number {
    const sale = sales.map(sale => sale.price)
    const SumSale = sale.reduce((sum, item) => {
      return (sum =
        parseFloat((sum as unknown) as string) +
        parseFloat((item as unknown) as string))
    })

    return SumSale
  }
  async function HandleFilterSales(): Promise<void> {
    try {
      const filteredSales = await api.get(
        `/sale/index?fromDate=${dateFrom}&untilDate=${dateUntil}&subUserName=${subUserName}`,
      )
      setSales(filteredSales.data)
      toast.success('Vendas Filtradas com sucesso')
    } catch (error) {
      const {
        data: { message },
      } = error.response
      toast.error(message)
    }
  }
  async function HandleRevertSale(id: number): Promise<void> {
    const areYouSure = window.confirm(
      'Tem certeza que deseja reverter a venda?',
    )
    if (!areYouSure) {
      return
    }
    try {
      await api.delete(`/sale/revert/${id}`)
      const filteredSales = sales.filter(sale => sale.id !== id)
      setSales(filteredSales)
      toast.success('Venda Revertida com sucesso')
    } catch (error) {
      const {
        data: { message },
      } = error.response
      toast.error(message)
    }
  }
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
              <SellButton onClick={HandleFilterSales}>
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
                      {sales.length > 1 && GetIncome()}
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
