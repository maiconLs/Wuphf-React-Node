import { useState } from "react"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

import image from '../../assets/estudando.png' 
import './signup.scss'

interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp(){

  const [user, setUser] = useState({} as IUser)

  const { register, loading } = useAuth()

  function handleChange(e: any){
    setUser({...user, [e.target.name]: e.target.value})

  }

  function handleSubmit(e: any){
    e.preventDefault()

    register(user)
    console.log(user)
  }

  return(
    <div className="register">
      <aside>
        <p>Falta pouco para se <span>conectar</span>!</p>
        <img src={image} alt="Menina estudando"/>
      </aside>
      <main>
        <div>
          <h1>Cadastro</h1>
            <form className="auth" onSubmit={handleSubmit}>
              <input name="name" type="text" placeholder="Digite seu nome"  onChange={handleChange}/>
              <input name="username" type="text" placeholder="Digite um nome de utilizador"  onChange={handleChange}/>
              <input name="email" type="email" placeholder="Digite seu email"  onChange={handleChange}/>
              <input name="password" type="password" placeholder="Digite uma senha"  onChange={handleChange}/>
              <input name="confirmPassword" type="password" placeholder="Confirme sua senha"  onChange={handleChange}/>
              <button type="submit">{loading ? 'Carregando...' : 'Cadastrar'}</button>
            </form>
          </div>
          <span>Já tem uma conta? <Link to="/login">clique aqui</Link></span>
        </main>
    
    </div>
  )
}