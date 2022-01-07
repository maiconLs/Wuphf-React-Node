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
              <button>
                <Link to="/editprofile">Editar perfil</Link>
              </button>
            </div>
            <ul>
              <li>Publicações</li>
              <li><Link to="/profile">Seguidores</Link></li>
              <li></li>
            </ul>

            <div>

            </div>
           
          </section>
        </div>

        <div></div>
        <div></div>
      </section>
    
      
    </div>
  )
}