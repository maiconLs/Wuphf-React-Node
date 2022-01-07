import { useState } from "react"
import { Link } from "react-router-dom"

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

      </main>
    
    </div>
  )
}