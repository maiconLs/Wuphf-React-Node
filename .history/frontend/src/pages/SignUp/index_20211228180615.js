import { useState } from "react"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

import image from '../../assets/estudando.png'
import './signup.scss'

export default function SignUp(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [user, setUser] = useState({})

  const { register, loading } = useAuth()

  function handleChange(e){
    setUser({...user, [e.target.name]: e.target.value})

  }

  function handleSubmit(e){
    e.preventDefault()

    register(user)
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
              <input name="name" type="text" placeholder="Digite seu name" value={name} onChange={handleChange}/>
              <input name="email" type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <input name="password" type="password" placeholder="Digite uma senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
              <input type="password" placeholder="Confirme sua senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
              <button type="submit">{loading ? 'Carregando...' : 'Cadastrar'}</button>
            </form>
          </div>
          <span>Já tem uma conta? <Link to="/login">clique aqui</Link></span>
        </main>
    
    </div>
  )
}