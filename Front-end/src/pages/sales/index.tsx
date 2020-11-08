// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect } from 'react'

import {
  Border,
  Input,
  InputMenor,
  Page,
  SalesContainer,
  SellButton,
  SellButtonRight,
} from './styles'
import Header from '../../components/Header/Header'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import api from '../../services/apiClient'
import { toast } from 'react-toastify'

interface Item {
  id: number
  name: string
  brand: string
  amount: number
  price: number
}

const Sales: React.FC = () => {
  useEffect(() => {
    api.get('/storage/index').then(response => {
      setInventory(response.data)
    })
  }, [])

  const [inventory, setInventory] = useState<Item[]>([])
  const [recentSells, setRecentSells] = useState<Item[]>([])
  const [selectedOption, setSelectedOption] = useState<Item | null>(null)
  const [amountList, setAmountList] = useState('')
  const [barcode, setBarcode] = useState('')
  const [amount, setAmount] = useState('')
  const [switchState, setSwitchState] = useState({
    checkedA: true,
    checkedB: true,
  })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSwitchState({
      ...switchState,
      [event.target.name]: event.target.checked,
    })
  }
  async function HandleSellByID(): Promise<void> {
    const data = {
      id: selectedOption?.id,
      amount: amountList,
    }
    if (!data.id || !amountList) {
      toast.error('Preencha todos os campos')
      return
    }
    try {
      const response = await api.post('/sale/sell', data)
      setRecentSells([...recentSells, response.data])
      toast('Venda Realizada com sucesso!')
    } catch (error) {
      const {
        data: { message },
      } = error.response
      toast.error(message)
    }
  }

  async function HandleSellByBarcode(): Promise<void> {
    if (!barcode || !amount) {
      toast.error('Preencha todos os campos')
      return
    }
    const data = {
      barcode: barcode,
      amount: amount,
    }

    try {
      const response = await api.post('/sale/sell', data)
      setRecentSells([...recentSells, response.data])
      toast('Venda Realizada com sucesso!')
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
        <Switch
          checked={switchState.checkedA}
          onChange={handleChange}
          name='checkedA'
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          color='primary'
          className='switch1'
        />
        <Switch
          checked={switchState.checkedB}
          onChange={handleChange}
          name='checkedB'
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          color='primary'
          className='switch2'
        />
        <Header />
        <SalesContainer>
          <div id='barcode'>
            <h2>Vendas Via Código de barras</h2>
            <div
              className='inputs'
              style={{ opacity: switchState.checkedA ? 1 : 0.5 }}
            >
              <div className='input-block'>
                <label htmlFor='barcode'>Código de barras</label>
                <Input
                  name='barcode'
                  disabled={!switchState.checkedA}
                  value={barcode}
                  onChange={({ target: { value } }) => {
                    setBarcode(value)
                  }}
                />
              </div>
              <div className='input-block'>
                <label htmlFor='amount'>Quantidade</label>
                <InputMenor
                  name='amount'
                  disabled={!switchState.checkedA}
                  value={amount}
                  onChange={({ target: { value } }) => {
                    setAmount(value)
                  }}
                />
              </div>
            </div>
            <SellButton
              style={{ opacity: switchState.checkedA ? 1 : 0.5 }}
              disabled={!switchState.checkedA}
              onClick={HandleSellByBarcode}
            >
              Vender
            </SellButton>
            <div
              className='lastsell'
              style={{ opacity: switchState.checkedA ? 1 : 0.5 }}
            >
              <h3>Ultimas vendas</h3>
              <table className='table'>
                <tbody>
                  <tr>
                    <th>Produto</th>
                    <th>Marca</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                  </tr>
                  {recentSells.map(item => (
                    <tr key={item.id}>
                      <td>{item.name} </td>
                      <td>{item.brand}</td>
                      <td>{item.amount}</td>
                      <td>{item.price} Reais</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div id='list'>
            <h2>Vendas Via Lista de produtos</h2>
            <div
              className='inputs'
              style={{ opacity: switchState.checkedB ? 1 : 0.5 }}
            >
              <div className='input-block'>
                <Autocomplete
                  id='combo-box-demo'
                  options={inventory}
                  onChange={(event, value) => setSelectedOption(value)}
                  getOptionLabel={inventory => inventory.name}
                  style={{
                    width: 180,
                    height: 10,
                    opacity: switchState.checkedB ? 1 : 0.5,
                  }}
                  disabled={!switchState.checkedB}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label='Produtos'
                      variant='outlined'
                    />
                  )}
                />
              </div>
              <div className='input-block'>
                <label htmlFor='amount' className='label'>
                  Quantidade
                </label>
                <InputMenor
                  name='amount'
                  disabled={!switchState.checkedB}
                  value={amountList}
                  onChange={({ target: { value } }) => {
                    setAmountList(value)
                  }}
                />
              </div>
              <SellButtonRight
                style={{ opacity: switchState.checkedB ? 1 : 0.5 }}
                disabled={!switchState.checkedB}
                onClick={HandleSellByID}
              >
                Vender
              </SellButtonRight>
            </div>

            <div
              className='lastsell'
              style={{ opacity: switchState.checkedB ? 1 : 0.5 }}
            >
              <h3>Ultimas vendas</h3>
              <table className='table'>
                <tbody>
                  <tr>
                    <th>Produto</th>
                    <th>Marca</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                  </tr>
                  {recentSells.map(item => (
                    <tr key={item.id}>
                      <td>{item.name} </td>
                      <td>{item.brand}</td>
                      <td>{item.amount}</td>
                      <td>{item.price} Reais</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SalesContainer>
      </Page>
    </Border>
  )
}

export default Sales
