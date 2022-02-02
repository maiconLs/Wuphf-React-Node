import Header from '../../components/index'

import './home.scss'

export default function Publication(){

  function handleSubmit(){

  }

  return(
    <div>
      <Header/>
      <section className="container_home">
        <h1>Publicação</h1>

        <form onSubmit={handleSubmit}>
          <input type="file" name="" onChange={}/>
        </form>
      </section>
    
    </div>
  )
}