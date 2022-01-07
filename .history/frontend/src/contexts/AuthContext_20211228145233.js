import {createContext, useEffect, useState} from 'react'

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

  async function register(){
    try {
      const data = await api.post('/users/register')
    } catch (error) {
      
    }
  }

  return(
    <AuthContext.Provider value={{register}}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider