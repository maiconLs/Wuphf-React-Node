import { useEffect, useState } from "react"

import useAuth from "../../hooks/useAuth"

import api from '../../services/api';

import Header from '../../components/Header';
import avatar from '../../assets/avatar.png'

import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'; 

import { FiUpload } from "react-icons/fi";

export default function EditUser(){
  const [user, setUser] = useState({})
  const [preview, setPreview] = useState()
  const [loading, setLoading] = useState()
  const [token] = useState(localStorage.getItem('token') || '')

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

   function onFileChange(e){
     setPreview(e.target.files[0])
     setUser({...user, [e.target.name]: e.target.files[0]})
   }

   const handleSubmit = async (e) => {
     setLoading(true)
    e.preventDefault()

    const formData = new FormData()

    const userFormData = Object.keys(user).forEach((key) =>  
      formData.append(key, user[key]),git

    formData.append('user', userFormData)
    console.log(userFormData)

    await api.patch(`/users/edit/${user._id}`, formData, {
      headers:{
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      toast.success(JSON.stringify(response.data.message) )
      console.log(response.data)
      setLoading(false)
      return response.data
    })

    .catch((error) => {
      toast.error(JSON.stringify(error.response.data.message) )
      console.log(error)
      setLoading(false)
      return error.response.data
    })
   }

  return(
    <div>
      <Header/>
         <div>
          <h1>Editar perfil</h1>
          <div>

              <span>
                <FiUpload color="#FFF" size={25} />
              </span>

              {(user.image || preview) ? (
                <img
                  src={
                    preview ?
                    URL.createObjectURL(preview) :
                    `${process.env.REACT_APP_API}/images/users/${user.image}`
                  }
                  alt={user.name}
                />
              ): <img src={avatar} alt="Avatar"/>}
              </div>
            
            <form className="edit" onSubmit={handleSubmit}>
        
              <input name="image" type="file"  onChange={onFileChange}/>
              <input name="name" value={user.name || ''} type="text" placeholder="Digite seu nome"  onChange={handleChange}/>
              <input name="username" value={user.username || ''} type="text" placeholder="Digite um nome de utilizador "  onChange={handleChange}/>
              <input name="email" value={user.email || ''} type="email" placeholder="Digite seu email"  onChange={handleChange}/>
              <input name="password" type="password" placeholder="Digite uma senha"  onChange={handleChange}/>
              <input name="confirmpassword" type="password" placeholder="Confirme sua senha"  onChange={handleChange}/>
              <button type="submit">{loading ? 'Carregando...' : 'Enviar'}</button>
            </form>
          </div>
    </div>
  )
}
