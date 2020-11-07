// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import api from '../../services/apiClient'
import {
  Border,
  Input,
  Page,
  InventoryContainer,
  Storage,
  AddStorage,
  SellButton,
  OpenModalButton,
} from './styles'
import Header from '../../components/Header/Header'
import { FiX, FiEdit3 } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'

interface Item {
  id: number
  name: string
  brand: string
  amount: number
  price: number
}
interface ModalProps {
  item: Item
}
const Inventory: React.FC = () => {
  useEffect(() => {
    api.get('/storage/index').then(response => {
      setInventory(response.data)
    })
  }, [])

  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filterBrand, setFilterBrand] = useState('')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [inventory, setInventory] = useState<Item[]>([])

  async function HandleDeleteItem(id: number): Promise<void> {
    const areYouSure = window.confirm(
      'Tem certeza que deseja deletar esse item?',
    )
    if (!areYouSure) {
      return
    }
    try {
      await api.delete(`/storage/delete/${id}`)
      toast.success('Item Deletado!')
    } catch (error) {
      const {
        data: { message },
      } = error.response
      toast.error(message)
      return
    }

    const newInvetory = inventory.filter(item => item.id !== id)
    setInventory(newInvetory)
  }

  async function HandleFilterStorage(): Promise<void> {
    try {
      const newInvetory = await api.get(
        `/storage/index?name=${filterName}&brand=${filterBrand}`,
      )
      if (newInvetory.data.length === 0) {
        toast.info('Nenhum produto encontrado')
        return
      }
      setInventory(newInvetory.data)
      toast.success('Filtrado com sucesso!')
    } catch (error) {
      const {
        data: { message },
      } = error.response
      toast.error(message)
    }
  }

  async function HandleAddItem(): Promise<void> {
    if (!name || !brand || !amount || !price) {
      toast.error('Por favor informe todos os campos')
      return
    }
    const data = { name, brand, amount, price }
    const schema = yup.object().shape({
      name: yup.string().required(),
      brand: yup.string().required(),
      amount: yup.number().required(),
      price: yup.number().required(),
    })

    try {
      await schema.validate(data, { abortEarly: false })
      const newItem = await api.post('/storage/add', data)
      setInventory([...inventory, newItem.data])
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.errors.map(error => toast.error(error))
        return
      }
      const {
        data: { message },
      } = error.response

      toast.error(message)
      return
    }
    toast('Item Adicionado ao estoque')
    setName('')
    setBrand('')
    setAmount('')
    setPrice('')
  }

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    }),
  )

  const EditStorageModal: React.FC<ModalProps> = ({ item }) => {
    const [open, setOpen] = useState(false)
    const [modalName, setModalName] = useState('')
    const [modalBrand, setModalBrand] = useState('')
    const [modalAmount, setModalAmount] = useState('')
    const [modalPrice, setModalPrice] = useState('')
    const classes = useStyles()
    const [modalStyle] = useState({
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    })

    useEffect(() => {
      setModalName(item.name)
      setModalBrand(item.brand)
      setModalAmount(String(item.amount))
      setModalPrice(String(item.price))
    }, [item.amount, item.brand, item.name, item.price])
    async function HandleEditItem(): Promise<void> {
      const data = {
        name: modalName,
        brand: modalBrand,
        amount: modalAmount,
        price: modalPrice,
      }
      const schema = yup.object().shape({
        name: yup.string(),
        brand: yup.string(),
        amount: yup.number(),
        price: yup.number(),
      })
      try {
        await schema.validate(data, { abortEarly: false })
        const updatedItem = await api.put(`/storage/update/${item.id}`, data)
        const newInventory = inventory.filter(inv => inv.id !== item.id)
        setInventory([...newInventory, updatedItem.data])
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          error.errors.map(error => toast.error(error))
          return
        }
        const {
          data: { message },
        } = error.response

        toast.error(message)
        return
      }
      toast('Item editado com sucesso')
    }

    return (
      <div>
        <OpenModalButton
          type='button'
          onClick={() => {
            setOpen(true)
          }}
        >
          <FiEdit3 size={15} color='#408ebf' />
        </OpenModalButton>
        <Modal
          open={open}
          onClose={() => {
            setOpen(false)
          }}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
        >
          <div style={modalStyle} className={classes.paper}>
            <h2 id='simple-modal-title'>{item.name}</h2>
            <div className='input-block'>
              <label htmlFor='Produto'>Nome do produto</label>
              <Input
                name='product'
                value={modalName}
                onChange={({ target: { value } }) => setModalName(value)}
                style={{
                  border: modalName ? '2px solid #A1E9C5' : '1px solid #d3e2e5',
                }}
              ></Input>
            </div>
            <div className='input-block'>
              <label htmlFor='brand'>Marca</label>
              <Input
                name='brand'
                value={modalBrand}
                onChange={({ target: { value } }) => setModalBrand(value)}
                style={{
                  border: modalBrand
                    ? '2px solid #A1E9C5'
                    : '1px solid #d3e2e5',
                }}
              ></Input>
            </div>
            <div className='input-block'>
              <label htmlFor='amount'>Quantidade</label>
              <Input
                name='amount'
                type='number'
                value={modalAmount}
                onChange={({ target: { value } }) => setModalAmount(value)}
                style={{
                  border: modalAmount
                    ? '2px solid #A1E9C5'
                    : '1px solid #d3e2e5',
                }}
              ></Input>
            </div>
            <div className='input-block'>
              <label htmlFor='price'>Preço</label>
              <Input
                name='price'
                type='number'
                value={modalPrice}
                onChange={({ target: { value } }) => setModalPrice(value)}
                style={{
                  border: modalPrice
                    ? '2px solid #A1E9C5'
                    : '1px solid #d3e2e5',
                }}
              ></Input>
            </div>
            <SellButton onClick={HandleEditItem}>
              E{'  '}D{'  '}I{'  '}T{'  '}A{'  '}R
            </SellButton>
          </div>
        </Modal>
      </div>
    )
  }

  return (
    <Border>
      <Page>
        <Header />
        <InventoryContainer>
          <Storage>
            <div className='search'>
              <div className='input-block'>
                <label htmlFor='Produto'>Nome</label>
                <Input
                  name='product'
                  value={filterName}
                  onChange={({ target: { value } }) => setFilterName(value)}
                  style={{
                    border: filterName
                      ? '2px solid #A1E9C5'
                      : '1px solid #d3e2e5',
                  }}
                ></Input>
              </div>
              <div className='input-block'>
                <label htmlFor='Produto'>Marca</label>
                <Input
                  name='product'
                  value={filterBrand}
                  onChange={({ target: { value } }) => setFilterBrand(value)}
                  style={{
                    border: filterBrand
                      ? '2px solid #A1E9C5'
                      : '1px solid #d3e2e5',
                  }}
                ></Input>
              </div>
              <SellButton onClick={HandleFilterStorage}>
                F{'  '}I{'  '}L{'  '}T{'  '}R{'  '}A{'  '}R
              </SellButton>
            </div>
            <h2>Estoque</h2>

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
                        <EditStorageModal item={item} />
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            HandleDeleteItem(item.id)
                          }}
                        >
                          <FiX size={15} color='#bf4040' />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Storage>
          <AddStorage>
            <h2>Adicionar Item ao estoque</h2>
            <div className='input-block'>
              <label htmlFor='Produto'>Nome do produto</label>
              <Input
                name='product'
                value={name}
                onChange={({ target: { value } }) => setName(value)}
                style={{
                  border: name ? '2px solid #A1E9C5' : '1px solid #d3e2e5',
                }}
              ></Input>
            </div>
            <div className='input-block'>
              <label htmlFor='brand'>Marca</label>
              <Input
                name='brand'
                value={brand}
                onChange={({ target: { value } }) => setBrand(value)}
                style={{
                  border: brand ? '2px solid #A1E9C5' : '1px solid #d3e2e5',
                }}
              ></Input>
            </div>
            <div className='input-block'>
              <label htmlFor='amount'>Quantidade</label>
              <Input
                name='amount'
                type='number'
                value={amount}
                onChange={({ target: { value } }) => setAmount(value)}
                style={{
                  border: amount ? '2px solid #A1E9C5' : '1px solid #d3e2e5',
                }}
              ></Input>
            </div>
            <div className='input-block'>
              <label htmlFor='price'>Preço</label>
              <Input
                name='price'
                type='number'
                value={price}
                onChange={({ target: { value } }) => setPrice(value)}
                style={{
                  border: price ? '2px solid #A1E9C5' : '1px solid #d3e2e5',
                }}
              ></Input>
            </div>
            <SellButton onClick={HandleAddItem}>
              A{'  '}D{'  '}I{'  '}C{'  '}I{'  '}O{'  '}N{'  '}A{'  '}R
            </SellButton>
          </AddStorage>
        </InventoryContainer>
      </Page>
    </Border>
  )
}

export default Inventory
