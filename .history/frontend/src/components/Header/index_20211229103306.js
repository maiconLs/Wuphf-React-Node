import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import { AiFillHome } from 'react-icons/ai'
import { BsBookmarkHeart } from 'react-icons/bs'

function Header(){
  return(
    <header>
      <div>Connect</div>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <AiFillHome color="#FFF" size={24}/>
              Home
            </Link>
          </li>
          <li>
            <Link to="">
              <BsBookmarkHeart color="#FFF" size={24}/>
              Notificações
            </Link>
          </li>
          <li>
            <Link>
             Perfil
            </Link>
          </li>

        </ul>
      </nav>

    </header>
  )
}