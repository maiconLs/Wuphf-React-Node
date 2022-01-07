import {createContext} from 'react'

import api from '../services/api'

export const AuthContext = createContext({})

function AuthProvider({children}){

  function register(){

  }

  return(
    <AuthContext.Provider>

    </AuthContext.Provider>
  )

}