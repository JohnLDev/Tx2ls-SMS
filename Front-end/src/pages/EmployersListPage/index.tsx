// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'

import {
  Border,
  Input,
  Page,
  HistoryContainer,
  HisyoryDiv,
  FindHistory,
  SellButton,
} from './styles'
import { FiX } from 'react-icons/fi'
import Header from '../../components/Header/Header'
import { useAuth } from '../../hooks/authContext'

import { toast } from 'react-toastify'
import api from '../../services/apiClient'

interface SubUser {
  id: string
  name: string
  email: string
  isAdm: boolean
  created_at: number
}

const EmployersList: React.FC = () => {
  useEffect(() => {
    api.get('/subuser/index').then(response => {
      setSubUsers(response.data)
    })
  }, [])

  const [name, setName] = useState('')
  const [subUsers, setSubUsers] = useState<SubUser[]>([])
  const { user } = useAuth()

  async function handleFilterSubUsers(): Promise<void> {
    try {
      const response = await api.get(`/subuser/index/?name=${name}`)
      setSubUsers(response.data)
    } catch (error) {
      const {
        data: { message },
      } = error.response
      toast.error(message)
      return
    }
    toast.success('Funcionarios filtrados com sucesso!')
  }

  async function handleDeleteSubUser(id: string, name: string): Promise<void> {
    const areYouSure = window.confirm(`Tem certeza que deseja demitir ${name}`)
    if (!areYouSure) {
      return
    }
    try {
      await api.delete(`/subuser/delete/${id}`)
    } catch (error) {
      const {
        data: { message },
      } = error.response
      toast.error(message)
      return
    }
    const newSubUsers = subUsers.filter(user => user.id !== id)
    setSubUsers(newSubUsers)
    toast.success('Funcionario demitido com sucesso!')
  }

  return (
    <Border>
      <Page>
        <Header />
        <HistoryContainer>
          <FindHistory>
            <h2>Buscar na lista</h2>
            <div className='inputs'>
              <div className='input-block'>
                <label htmlFor='name'>Nome</label>
                <Input
                  name='name'
                  value={name}
                  onChange={({ target: { value } }) => {
                    setName(value)
                  }}
                ></Input>
              </div>

              <SellButton onClick={handleFilterSubUsers}>
                P{'  '}R{'  '}O{'  '}C{'  '}U{'  '}R{'  '}A{'  '}R
              </SellButton>
            </div>
          </FindHistory>
          <HisyoryDiv>
            <h2>Lista de Funcionários</h2>

            <div className='history'>
              <table className='table'>
                <tbody>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Data de admissão</th>
                    <th>Administrador</th>
                  </tr>
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.created_at}</td>
                    <td>{user.enterprise_Name}</td>
                    <td></td>
                  </tr>
                  {subUsers.map(user => {
                    return (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.created_at}</td>
                        <td>{user.isAdm ? 'Sim' : 'Não'}</td>
                        <td>
                          {user.isAdm ? null : (
                            <button
                              onClick={() =>
                                handleDeleteSubUser(user.id, user.name)
                              }
                            >
                              <FiX size={15} color='#bf4040' />
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </HisyoryDiv>
        </HistoryContainer>
      </Page>
    </Border>
  )
}

export default EmployersList
