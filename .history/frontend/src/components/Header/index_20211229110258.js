import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import './header.scss'

import { GrHomeRounded } from 'react-icons/gr'
import { BsHeart } from 'react-icons/bs'

function Header(){
  return(
    <header className="header">
      <div className="container">
        <div>
          <h1>Connect</h1>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">
                <GrHomeRounded color="#FFF" size={24}/>
              
              </Link>
            </li>
            <li>
              <Link to="/notification">
                <BsHeart color="#ccc" size={24}/>
              </Link>
            </li>
            <li>
              <Link to="/profile">
              </Link>
            </li>

          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;