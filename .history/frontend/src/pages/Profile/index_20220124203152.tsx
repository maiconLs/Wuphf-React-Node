import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import api from '../../services/api';

import Header from '../../components/index'

import avatar from '../../assets/avatar.png'

import './profile.scss'

interface IUser {
  name: string;
  username: string;
  email: string;
  _id: string;
  image?: string;
}

export default function Profile(){
  const [user, setUser] = useState({} as IUser)
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api.get('/users/checkuser', {
      headers:{
        Authorization
      }
    })
  }, [])

  return(
    <div>
      <Header/>
      <section className="container_profile">
        <div className="header_profile">
          <div className="avatar">
            <img src={avatar} alt="avatar"/>
          </div>
          <section>

            <div >
              <h2>Nome utilizador</h2>
              <button>
                <Link to="/edit">Editar perfil</Link>
              </button>
            </div>

            <div>
              <ul>
                <li>Publicações</li>
                <li><Link to="/profile/followers">Seguidores</Link></li>
                <li><Link to="/profile/following">A seguir</Link></li>
              </ul>
            </div>

            <div>
              <h1>Nome</h1>
            </div>
           
          </section>
        </div>

        <article>
          <div>
            imagens
          </div>
        </article>
      </section>
    
      
    </div>
  )
}