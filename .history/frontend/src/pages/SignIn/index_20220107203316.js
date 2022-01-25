import { useState } from "react"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/"

import image from '../../assets/estudando.png'
import '../SignUp/signup.scss'

export default function SignIn(){

  const [user, setUser] = useState({})

  const { login, loading } = useAuth()

  function handleChange(e){
    setUser({...user, [e.target.name]: e.target.value})

  }

  function handleSubmit(e){
    e.preventDefault()

    login(user)
    console.log(user)
  }

  return(
    <div className="login">
      <aside>
        <p>Falta pouco para se <span>conectar</span>!</p>
        <img src={image} alt="Menina estudando"/>
      </aside>
      <main>
        <div>
          <h1>Login</h1>
            <form className="auth" onSubmit={handleSubmit}>
              <input name="email" type="email" placeholder="Digite seu email"  onChange={handleChange}/>
              <input name="password" type="password" placeholder="Digite sua senha"  onChange={handleChange}/>
              <button type="submit">{loading ? 'Carregando...' : 'Entrar'}</button>
            </form>
          </div>
          <span>Não está cadastrado?<Link to="/register">clique aqui</Link></span>
        </main>
    
    </div>
  )
}