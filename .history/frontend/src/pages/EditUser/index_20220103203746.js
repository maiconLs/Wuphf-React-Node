function EditUser(){
  return(
    <div>
         <div>
          <h1>Editar perfil</h1>
            <form className="auth" onSubmit={handleSubmit}>
              <input name="name" type="text" placeholder="Digite seu nome"  onChange={handleChange}/>
              <input name="username" type="text" placeholder="Digite seu um nome"  onChange={handleChange}/>
              <input name="email" type="email" placeholder="Digite seu email"  onChange={handleChange}/>
              <input name="password" type="password" placeholder="Digite uma senha"  onChange={handleChange}/>
              <input name="confirmPassword" type="password" placeholder="Confirme sua senha"  onChange={handleChange}/>
              <button type="submit">{loading ? 'Carregando...' : 'Enviar'}</button>
            </form>
          </div>
    </div>
  )
}