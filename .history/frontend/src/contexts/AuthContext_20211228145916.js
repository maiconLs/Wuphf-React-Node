import {createContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

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
    try {
      const data = await api.post('/users/register', user)
      .then((response) =>{
        toast.success("Cadastro realizado com sucesso!")
        return response.data
      })

      await authUser(data)
    } catch (error) {
      toast.error(JSON.stringify(error.data.message) )
    }
  }

  async function authUser(data){
    setAuthenticated(true)
    localStorage.setItem('token', JSON.stringify(data.token))
    navigate('/')
  }

  return(
    <AuthContext.Provider value={{register}}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider