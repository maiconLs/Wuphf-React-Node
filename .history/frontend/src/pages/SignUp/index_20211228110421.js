export default function SignUp(){
  const [nome, setNome] = useS
  return(
    <div>
      <h1>Cadastro</h1>
      <form>
        <input type="text" placeholder="Digite seu nome" value={nome}/>

      </form>
    </div>
  )
}