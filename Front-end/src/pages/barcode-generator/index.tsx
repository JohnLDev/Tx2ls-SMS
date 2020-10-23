// eslint-disable-next-line no-use-before-define
import React from 'react'

import {
  Border,
  Page,
  InventoryContainer,
  Storage,
  AddStorage,
  SellButton,
} from './styles'
import Header from '../../components/Header/Header'
import { FiChevronsRight } from 'react-icons/fi'

const Barcode: React.FC = () => {
  return (
    <Border>
      <Page>
        <Header />
        <InventoryContainer>
          <Storage>
            <h2>Lista de Produtos</h2>

            <div className='lastsell'>
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
                    <button>
                      <FiChevronsRight size={15} color='#4682B4' />
                    </button>
                  </tr>
                  <tr>
                    <td>Amaciante 5L</td>
                    <td>Omo</td>
                    <td>400</td>
                    <td>18,00</td>
                    <button>
                      <FiChevronsRight size={15} color='#4682B4' />
                    </button>
                  </tr>
                </tbody>
              </table>
            </div>
          </Storage>
          <AddStorage>
            <h2>Produto selecionado</h2>
            <div className='lastsell'>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/EAN13.svg/1200px-EAN13.svg.png'
                alt=''
              />
            </div>
            <SellButton>
              G{'  '}E{'  '}R{'  '}A{'  '}R
            </SellButton>
          </AddStorage>
        </InventoryContainer>
      </Page>
    </Border>
  )
}

export default Barcode
