import {createContext, ReactNode, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'; 

import api from '../services/api'

type User = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type AuthContextType = {
  register: Function
  login:  Function
  logout: () =>  Promise<void>;
  loading: boolean;
  authenticated: boolean;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

type Data = {
  token: string;
}

export const AuthContext = createContext({} as AuthContextType)

function AuthProvider(props: AuthContextProviderProps){
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }

    setLoading(false)
  }, [])

  async function register(user: User){
    setLoading(true)

    try {
      const data = await api.post('/users/register', user)
      .then((response) => {
        toast.success("Cadastro realizado com sucesso!")
        return response.data
      })
      setLoading(false)
      await authUser(data)
      console.log(data)

    } catch (error) {
      setLoading(false)
      toast.error(JSON.stringify(error.response.data.message) )
    }
  }

  async function authUser(data: Data){
    setAuthenticated(true)
    localStorage.setItem('token', JSON.stringify(data.token))
    navigate('/')
  }

  async function login(user: User){
    setLoading(true)

    try {
      const data = await api.post('/users/login', user)
      .then((response) => {
        setLoading(false)
        setAuthenticated(true)
        return response.data
      })

      authUser(data)
    } catch (error) {
      setLoading(false)
      toast.error(JSON.stringify(error.response.data.message))
    }
  }

  async function logout(){
    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    toast.success('Logout realizado com sucesso!')
    navigate('/login')
  }

  return(
    <AuthContext.Provider value={{register, login, logout, loading, authenticated}}>
      {props.children}
    </AuthContext.Provider>
  )

}

export default AuthProvider