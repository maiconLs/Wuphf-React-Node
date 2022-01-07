import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import './header.scss'

import { GrHomeRounded } from 'react-icons/gr'
import { FiHeart } from 'react-icons/fi'
import {CgProfile} from 'react-icons/cg'
import { BiExit } from 'react-icons/bi'

function Header(){
  const { logout } = useAuth()

  function changeClassName
  return(
    <header className="header">
      <div className="container">
        <div>
          <h1>WUPHF</h1>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">
                <GrHomeRounded onClick={() => changeClassName()} color="#FFF" size={24}/> 
              </Link>
            </li>
            <li>
              <Link to="/notification">
                <FiHeart  size={24}/>
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <CgProfile  size={24}/>
              </Link>
            </li>
            <li onClick={logout}>    
                <BiExit size={24}/>   
            </li>

          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;