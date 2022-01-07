import {createContext, useEffect, useState} from 'react'
import { toast } from 'react-toastify'

import api from '../services/api'

export const AuthContext = createContext({})

function AuthProvider({children}){
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }
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

  async function authUser()

  return(
    <AuthContext.Provider value={{register}}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider