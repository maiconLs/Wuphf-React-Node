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
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    })
    .then((response) => {
      setUser(response.data)
    })
  }, [token])

  return(
    <div>
      <Header/>
      <section className="container_profile">
        <div className="header_profile">
          <div className="avatar">
            <img src={user.image ?`${process.env.REACT_APP_API}/images/users/${user.image}` : avatar} alt="avatar"/>
          </div>
          <section>

            <div >
              <h2>{user.username}</h2>
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
              <h1>{user.name}</h1>
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