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
} from './styles'
import Header from '../../components/Header/Header'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'

const Sales: React.FC = () => {
  const [switchState, setSwitchState] = React.useState({
    checkedA: true,
    checkedB: true,
  })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSwitchState({
      ...switchState,
      [event.target.name]: event.target.checked,
    })
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
                <Input name='barcode' disabled={!switchState.checkedA} />
              </div>
              <div className='input-block'>
                <label htmlFor='amount'>Quantidade</label>
                <InputMenor name='amount' disabled={!switchState.checkedA} />
              </div>
            </div>
            <SellButton
              style={{ opacity: switchState.checkedA ? 1 : 0.5 }}
              disabled={!switchState.checkedA}
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
                  <tr>
                    <td>Shanpoo</td>
                    <td>loreal</td>
                    <td>3</td>
                    <td>14,99</td>
                  </tr>
                  <tr>
                    <td>Amaciante 5L</td>
                    <td>Omo</td>
                    <td>400</td>
                    <td>18,00</td>
                  </tr>
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
                  options={[]}
                  // getOptionLabel={() => {}}
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
              <SellButtonRight
                style={{ opacity: switchState.checkedB ? 1 : 0.5 }}
                disabled={!switchState.checkedB}
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
                  <tr>
                    <td>Shanpoo</td>
                    <td>loreal</td>
                    <td>3</td>
                    <td>14,99</td>
                  </tr>
                  <tr>
                    <td>Amaciante 5L</td>
                    <td>Omo</td>
                    <td>400</td>
                    <td>18,00</td>
                  </tr>
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
