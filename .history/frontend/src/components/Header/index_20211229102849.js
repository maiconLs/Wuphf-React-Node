import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import { AiFillHome } from 'react-icons/ai'

function Header(){
  return(
    <header>
      <div>Connect</div>
      <nav>
        <ul>
          <li>
            <Link>
              <AiFillHome color=""/>
              Home
            </Link>
          </li>
          <li><Link></Link></li>
          <li><Link></Link></li>

        </ul>
      </nav>

    </header>
  )
}