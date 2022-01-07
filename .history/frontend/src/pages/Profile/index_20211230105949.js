import { Link } from 'react-router-dom'

import Header from '../../components/Header'

import avatar from '../../assets/avatar.png'
import './profile.scss'

export default function Profile(){
  return(
    <div>
      <Header/>
      <section className="container_profile">
        <div>
          <div>
            <img src={avatar} alt="avatar"/>
          </div>
          <section>
            <div>
              <h2>Nome</h2>
            </div>
            <button>
              <Link to="/editprofile">Editar perfil</Link>
            </button>
            <ul>
              
            </ul>
          </section>
        </div>

        <div></div>
        <div></div>
      </section>
    
      
    </div>
  )
}