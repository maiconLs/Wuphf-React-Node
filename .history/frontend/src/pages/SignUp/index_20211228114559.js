import { useState } from "react"
import { Link } from "react-router-dom"

import imag
import './signup.scss'

export default function SignUp(){
  const [nome, setNome] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()

  function handleSubmit(){

  }

  return(
    <div className="register">
      <aside>

      </aside>
      <main>
        <div>
          <h1>Cadastro</h1>
            <form className="auth" onSubmit={handleSubmit}>
              <input type="text" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
              <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <input type="password" placeholder="Digite uma senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
              <input type="password" placeholder="Confirme sua senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
              <button type="submit">Cadastrar</button>
            </form>
          </div>
          <span>Já tem uma conta? <Link to="/login">clique aqui</Link></span>
        </main>
    
    </div>
  )
}