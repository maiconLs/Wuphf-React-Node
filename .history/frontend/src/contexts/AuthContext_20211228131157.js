import {createContext} from 'react'

export const AuthContext = createContext({})

function AuthProvider({children}){



  return(
    <AuthContext.Provider>

    </AuthContext.Provider>
  )

}