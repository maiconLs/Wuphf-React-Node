import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

import image from '../../assets/wuphf.png'
import './signup.scss'

interface IUser {
  name: string
  username: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export default function SignUp() {
  const [user, setUser] = useState({} as IUser)

  const { register, loading } = useAuth()

  function handleChange(e: any) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: any) {
    e.preventDefault()

    register(user)
  }

  return (
    <div className='container-login'>
      <div className='register'>
        <aside>
          <p>
            Just one step to <span>connect</span>
          </p>
          <img className='imageRegister' src={image} alt='Menina estudando' />
        </aside>
        <main>
          <div>
            <h1>Sign Up</h1>
            <form className='auth' onSubmit={handleSubmit}>
              <input
                name='name'
                type='text'
                placeholder='Name'
                onChange={handleChange}
              />
              <input
                name='username'
                type='text'
                placeholder='Username'
                onChange={handleChange}
              />
              <input
                name='email'
                type='email'
                placeholder='Email'
                onChange={handleChange}
              />
              <input
                name='phone'
                type='text'
                placeholder='Phone number'
                onChange={handleChange}
              />
              <input
                name='password'
                type='password'
                placeholder='Password'
                onChange={handleChange}
              />
              <input
                name='confirmpassword'
                type='password'
                placeholder='Confirm your password'
                onChange={handleChange}
              />
              <button type='submit'>
                {loading ? 'Loading...' : 'Sign Up'}
              </button>
            </form>
          </div>
          <span>
            Already have an account? <Link to='/login'> Click here</Link>
          </span>
        </main>
      </div>
    </div>
  )
}
