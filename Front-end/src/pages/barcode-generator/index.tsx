// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import jsbarcode from 'jsbarcode'
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
import api from '../../services/apiClient'
import BarcodeImage from '../../assets/codebar.png'

interface Item {
  id: number
  name: string
  brand: string
  amount: number
  price: number
  barcode: string
}

const Barcode: React.FC = () => {
  useEffect(() => {
    api.get('/storage/index').then(response => {
      setInventory(response.data)
    })
  }, [])
  const [inventory, setInventory] = useState<Item[]>([])
  const [selectedProduct, setSelectedProduct] = useState(
    'O nome do produto aparecerá aqui',
  )
  async function generateBarcode(barcode: string, name: string): Promise<void> {
    jsbarcode('#barcode', barcode)
    setSelectedProduct(name)
  }

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

                  {inventory.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.brand}</td>
                      <td>{item.amount}</td>
                      <td>{item.price} Reais</td>

                      <td>
                        <button
                          onClick={() => {
                            generateBarcode(item.barcode, item.name)
                          }}
                        >
                          <FiChevronsRight size={15} color='#4682B4' />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Storage>
          <AddStorage>
            <h2>{selectedProduct}</h2>
            <div className='lastsell'>
              <img id='barcode' src={BarcodeImage} alt='' />
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
