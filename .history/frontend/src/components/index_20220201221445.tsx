import { Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import logo from '../assets/wuphf.png'
import './header.scss'

import { GrHomeRounded } from 'react-icons/gr'
import { FiHeart } from 'react-icons/fi'
import {CgProfile} from 'react-icons/cg'
import { BiExit } from 'react-icons/bi'

function Header(){
  const { logout } = useAuth()
  const pathName = window.location.pathname

  return(
    <header className="header">
      <div className="container">
        <div>
          <img src="" alt="" />
        </div>
        <nav>
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
        </nav>
      </div>
    </header>
  )
}

export default Header;