import {createContext} from 'react'

import api from '../services/api'

export const AuthContext = createContext({})

function AuthProvider({children}){

 async function register(){

  }

  return(
    <AuthContext.Provider value={{register}}>
      {ch}
    </AuthContext.Provider>
  )

}

export default AuthProvider