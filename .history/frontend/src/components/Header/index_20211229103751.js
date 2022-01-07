import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import './header.scss'

import { GrHomeRounded } from 'react-icons/gr'
import { BsBookmarkHeart } from 'react-icons/bs'

function Header(){
  return(
    <header className="header">
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
            <Link to="/notification">
              <BsBookmarkHeart color="#FFF" size={24}/>
              Notificações
            </Link>
          </li>
          <li>
            <Link to="/profile">
             Perfil
            </Link>
          </li>

        </ul>
      </nav>

    </header>
  )
}

export default Header;