import {createContext, useEffect} from 'react'

import api from '../services/api'

export const AuthContext = createContext({})

function AuthProvider({children}){


  useEffect(() => {
    const token = localStorage.getItem('token', JSON.stringify(token))
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