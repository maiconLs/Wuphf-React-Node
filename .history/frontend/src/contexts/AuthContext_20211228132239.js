import {createContext, useEffect, useState} from 'react'

import api from '../services/api'

export const AuthContext = createContext({})

function AuthProvider({children}){
  const [authenticated, setAuthenticated] = useState()
  const [loading, setLoading] = useState()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
    }
  }, [])

  async function register(){

  }

  return(
    <AuthContext.Provider value={{register}}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider