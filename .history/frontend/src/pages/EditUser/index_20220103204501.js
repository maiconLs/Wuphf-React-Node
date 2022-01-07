import { useEffect, useState } from "react"

import api from '../../services/api';

function EditUser(){
  const [user, setUser] = useState()
  const {token} = localStorage.getItem('token') || ''

  useEffect(() => {
    api.get('/users/checkuser',{
      headers:{
        Authorization: `Bearer ${JSON.parse(token)} `
      }
    })
   }, [token])

  return(
    <div>
         <div>
          <h1>Editar perfil</h1>
            <form className="edit" onSubmit={handleSubmit}>
              <input name="name" type="text" placeholder="Digite seu nome"  onChange={handleChange}/>
              <input name="username" type="text" placeholder="Digite um nome de utilizador "  onChange={handleChange}/>
              <input name="email" type="email" placeholder="Digite seu email"  onChange={handleChange}/>
              <input name="password" type="password" placeholder="Digite uma senha"  onChange={handleChange}/>
              <input name="confirmPassword" type="password" placeholder="Confirme sua senha"  onChange={handleChange}/>
              <button type="submit">{loading ? 'Carregando...' : 'Enviar'}</button>
            </form>
          </div>
    </div>
  )
}