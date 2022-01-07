import { useEffect, useState } from "react"

import useAuth from "../../hooks/useAuth"

import api from '../../services/api';

export default function EditUser(){
  const [user, setUser] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')

  const {loading} = useAuth()

  useEffect(() => {
    api.get('/users/checkuser',{
      headers:{
        Authorization: `Bearer ${JSON.parse(token)} `,
      },
    })
    .then((response) => {
      setUser(response.data)
    })
   }, [token])

   function handleChange(e){
    setUser({...user, [e.target.name]: e.target.value})
   }

   function handleSubmit(){

   }

  return(
    <div>
         <div>
          <h1>Editar perfil</h1>
            <form className="edit" onSubmit={handleSubmit}>
              <input name="name" value={user.name || ''} type="text" placeholder="Digite seu nome"  onChange={handleChange}/>
              <input name="username" value={user.username || ''} type="text" placeholder="Digite um nome de utilizador "  onChange={handleChange}/>
              <input name="email" value={user.email || ''} type="email" placeholder="Digite seu email"  onChange={handleChange}/>
              <input name="password" type="password" placeholder="Digite uma senha"  onChange={handleChange}/>
              <input name="confirmPassword" type="password" placeholder="Confirme sua senha"  onChange={handleChange}/>
              <button type="submit">{loading ? 'Carregando...' : 'Enviar'}</button>
            </form>
          </div>
    </div>
  )
}

