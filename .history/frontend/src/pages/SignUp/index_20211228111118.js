import { useState } from "react"

export default function SignUp(){
  const [nome, setNome] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()


  return(
    <div>
      <h1>Cadastro</h1>
      <form >
        <input type="text" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
        <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Digite uma senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input type="password" placeholder="Confirme sua senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  )
}