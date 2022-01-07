import {createContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'; 

import api from '../services/api'

export const AuthContext = createContext({})

function AuthProvider({children}){
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }

    setLoading(false)
  }, [])

  async function register(user){
    setLoading(true)

    try {
      const data = await api.post('/users/register', user)
      .then((response) => {
        toast.success("Cadastro realizado com sucesso!")
        return response.data
      })
      setLoading(false)
      await authUser(data)

    } catch (error) {
      setLoading(false)
      toast.error(JSON.stringify(error.response.data.message) )
    }
  }

  async function authUser(data){
    setAuthenticated(true)
    localStorage.setItem('token', JSON.stringify(data.token))
    navigate('/')
  }

  async function login(user){
    setLoading(true)

    try {
      const data = await api.post('/login', user)
      .then((response) => {
        setLoading(false)
        
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
  }

  return(
    <AuthContext.Provider value={{register, login, loading, authenticated}}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider