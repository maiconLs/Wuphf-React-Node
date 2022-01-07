import {createContext} from 'react'

import api from '../services/api'

export const AuthContext = createContext({})

function AuthProvider({children}){

  use

 async function register(){

  }

  return(
    <AuthContext.Provider value={{register}}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider