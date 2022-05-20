import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import useAuth from '../../hooks/useAuth'
import CreatePosts from '../CreatePosts'

import api from '../../services/api'

import logo from '../../assets/wuphf.png'

import './header.scss'

import { GrHomeRounded } from 'react-icons/gr'
import { FiHeart } from 'react-icons/fi'
import { CgProfile } from 'react-icons/cg'
import { BiExit } from 'react-icons/bi'
import { FiPlusSquare } from 'react-icons/fi'
import { ImCompass2 } from 'react-icons/im'

interface IUser {
  name: string
  username: string
  email: string
  _id: string
  image?: string
}

function Header() {
  const [user, setUser] = useState({} as IUser)
  const { logout } = useAuth()
  const [showPostModal, setShowPostModal] = useState(false)
  const [showModalProfile, setShowModalProfile] = useState(false)

  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api
      .get('/users/checkuser', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data)
      })
  }, [token])

  function togglePostModal() {
    setShowPostModal(!showPostModal)
  }

  function toggleModal() {
    setShowModalProfile(!showModalProfile)
  }


  return (
    <header className='header'>
      <div className='container'>
        <div>
          <Link to='/'>
            <img className='imageHeader' src={logo} alt='' />
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to='/'>
                <GrHomeRounded color='#FFF' size={25} />
              </Link>
            </li>
            <li>
              <Link to='/allposts'>
                <ImCompass2 size={25} />
              </Link>
            </li>
            <li onClick={() => togglePostModal()}>
              <FiPlusSquare size={25} />
            </li>
            <li onClick={toggleModal} className='profile'>
              {user.image ? (
                <img                 
                  className='avatar'
                  src={`${process.env.REACT_APP_API}/images/users/${user.image}`}
                  alt='avatar'
                />
              ) : (
                <CgProfile size={25} />
              )}

              <ul style={{ display: showModalProfile ? 'block' : 'none' }} className='dropdown'>
                <Link to='/profile'>
                  <li className="liDropdown">
                    <CgProfile size={25} /> <span>Profile</span>
                  </li>
                </Link>
                <li className="liDropdown" onClick={logout}>
                  <BiExit size={24} /> <span>To go out</span>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>

      {showPostModal && <CreatePosts close={togglePostModal} />}
    </header>
  )
}

export default Header
