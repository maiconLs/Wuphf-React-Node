import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import { AiFillHome } from 'react-icons/ai'
import { BsBookmarkHeart }

function Header(){
  return(
    <header>
      <div>Connect</div>
      <nav>
        <ul>
          <li>
            <Link>
              <AiFillHome color="#FFF" size={24}/>
              Home
            </Link>
          </li>
          <li>
            <Link>

            </Link>
          </li>
          <li>
            <Link>

            </Link>
          </li>

        </ul>
      </nav>

    </header>
  )
}