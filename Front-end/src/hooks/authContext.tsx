/* eslint-disable @typescript-eslint/ban-types */
// eslint-disable-next-line no-use-before-define
import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../services/apiClient'

interface signInCredentials {
  email: string
  password: string
}
interface User {
  id: string
  name: string
  email: string
  password: string
  enterprise_Name: string
  whatsapp: number
  is_Verify: boolean
  verify_Key: string
  images: Array<{
    id: string
    path: string
  }>
  created_at: string
  updated_at: string
}

interface SubUser {
  name: string
  email: string
  password: string
  isAdm: boolean
  created_at: string
  updated_at: string
}
interface AuthContextData {
  signIn(credentials: signInCredentials): Promise<void>
  signInSubUser(credentials: signInCredentials): Promise<void>
  signOut(): void
  signOutSubUser(): void

  user: User
  subUser?: SubUser
}

interface AuthState {
  token: string
  user: User
  subUser?: SubUser
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)
export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Tx2ls-SMS:token')
    const user = localStorage.getItem('@Tx2ls-SMS:user')

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }
    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/user/login', { email, password })
    const { token, user } = response.data

    localStorage.setItem('@Tx2ls-SMS:token', token)
    localStorage.setItem('@Tx2ls-SMS:user', JSON.stringify(user))

    setData({ token, user })
  }, [])

  const signInSubUser = useCallback(
    async ({ email, password }) => {
      const response = await api.post('/subuser/login', { email, password })
      const { token, subUser } = response.data

      localStorage.setItem('@Tx2ls-SMS:token', token)
      localStorage.setItem('@Tx2ls-SMS:SubUser', JSON.stringify(subUser))

      setData({ token, user: data.user, subUser })
    },
    [data.user],
  )

  const signOut = useCallback(() => {
    localStorage.removeItem('@Tx2ls-SMS:token')
    localStorage.removeItem('@Tx2ls-SMS:user')
    localStorage.removeItem('@Tx2ls-SMS:SubUser')

    setData({} as AuthState)
  }, [])

  const signOutSubUser = useCallback(() => {
    localStorage.removeItem('@Tx2ls-SMS:SubUser')

    setData({ user: data.user } as AuthState)
  }, [data.user])

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        subUser: data.subUser,
        signIn,
        signOut,
        signInSubUser,
        signOutSubUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
