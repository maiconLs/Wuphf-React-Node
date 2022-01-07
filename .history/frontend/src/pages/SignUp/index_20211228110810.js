import { useState } from "react"

export default function SignUp(){
  const [nome, setNome] = useState()

  return(
    <div>
      <h1>Cadastro</h1>
      <form>
        <input type="text" placeholder="Digite seu nome" value={nome} onChange={() => setNome}/>
        <input type="email" placeholder="Digite seu email" value={email}/>
        <input type="password" placeholder="Digite uma senha" value={password}/>
        <input type="password" placeholder="Confirme sua senha" value={confirmPassword}/>
      </form>
    </div>
  )
}