// eslint-disable-next-line no-use-before-define
import React from 'react'

import {
  Border,
  Input,
  Page,
  InventoryContainer,
  Storage,
  AddStorage,
  SellButton,
} from './styles'
import Header from '../../components/Header/Header'
import { FiX } from 'react-icons/fi'

const Inventory: React.FC = () => {
  return (
    <Border>
      <Page>
        <Header />
        <InventoryContainer>
          <Storage>
            <h2>Estoque</h2>

            <div className='lastsell'>
              <table className='table'>
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
                  <button>
                    <FiX size={15} color='#bf4040' />
                  </button>
                </tr>
                <tr>
                  <td>Amaciante 5L</td>
                  <td>Omo</td>
                  <td>400</td>
                  <td>18,00</td>
                  <button>
                    <FiX size={15} color='#bf4040' />
                  </button>
                </tr>
              </table>
            </div>
          </Storage>
          <AddStorage>
            <h2>Adicionar Item ao estoque</h2>
            <div className='input-block'>
              <label htmlFor='Produto'>Produto</label>
              <Input name='Produto'></Input>
            </div>
            <div className='input-block'>
              <label htmlFor='Produto'>Marca</label>
              <Input name='Produto'></Input>
            </div>
            <div className='input-block'>
              <label htmlFor='Produto'>Quantidade</label>
              <Input name='Produto'></Input>
            </div>
            <div className='input-block'>
              <label htmlFor='Produto'>Preço</label>
              <Input name='Produto'></Input>
            </div>
            <SellButton>
              A{'  '}D{'  '}I{'  '}C{'  '}I{'  '}O{'  '}N{'  '}A{'  '}R
            </SellButton>
          </AddStorage>
        </InventoryContainer>
      </Page>
    </Border>
  )
}

export default Inventory
