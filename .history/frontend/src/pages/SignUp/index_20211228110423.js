import { useState } from "react"

export default function SignUp(){
  const [nome, setNome] = useState
  return(
    <div>
      <h1>Cadastro</h1>
      <form>
        <input type="text" placeholder="Digite seu nome" value={nome}/>

      </form>
    </div>
  )
}