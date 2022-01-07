import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import './header.scss'

import { GrHomeRounded } from 'react-icons/gr'
import { FiHeart } from 'react-icons/fi'
import {CgProfile} from 'react-icons/cg'
import { BiExit } from 'react-icons/bi'

function NavBar(){
  const { logout } = useAuth()
  const pathName = window.location.pathname

  return(
    <nav className="nav">
      <div className="container">
        <div>
          <h1>WUPHF</h1>
        </div>
        <div className="nav">
          <ul>
            <li className={pathName === '/' ? 'active' : ''} >
              <Link to="/">
                <GrHomeRounded  color="#FFF" size={24}/> 
              </Link>
            </li>
            <li className={pathName === '/notification' ? 'active' : ''}>
              <Link to="/notification">
                <FiHeart  size={24}/>
              </Link>
            </li>
            <li className={pathName === '/profile' ? 'active' : ''}>
              <Link to="/profile">
                <CgProfile  size={24}/>
              </Link>
            </li>
            <li onClick={logout}>    
                <BiExit size={24}/>   
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;