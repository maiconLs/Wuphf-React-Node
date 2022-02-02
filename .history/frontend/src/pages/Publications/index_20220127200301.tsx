import Header from '../../components/index'

import './home.scss'

export default function Publication(){
  return(
    <div>
      <Header/>
      <section className="container_home">
        <h1>Publicação</h1>

        <form>
          <input type="file" />
        </form>
      </section>
    
    </div>
  )
}