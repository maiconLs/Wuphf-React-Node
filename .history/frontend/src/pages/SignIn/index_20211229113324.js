import { useState } from "react"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

import image from '../../assets/estudando.png'
import './signup.scss'

export default function SignUp(){
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')
  const [user, setUser] = useState({})

  const { register, loading } = useAuth()

  function handleChange(e){
    setUser({...user, [e.target.name]: e.target.value})

  }

  function handleSubmit(e){
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
              <input name="email" type="email" placeholder="Digite seu email"  onChange={handleChange}/>
              <input name="password" type="password" placeholder="Digite uma senha"  onChange={handleChange}/>
              <input name="confirmPassword" type="password" placeholder="Confirme sua senha"  onChange={handleChange}/>
              <button type="submit">{loading ? 'Carregando...' : 'Cadastrar'}</button>
            </form>
          </div>
          <span><Link to="/register">clique aqui</Link></span>
        </main>
    
    </div>
  )
}