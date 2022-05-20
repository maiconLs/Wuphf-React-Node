import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

import image from '../../assets/wuphf.png'
import '../SignUp/signup.scss'

interface IUser {
  email: string
  password: string
}

export default function SignIn() {
  const [user, setUser] = useState({} as IUser)

  const { login, loading } = useAuth()

  function handleChange(e: any) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    login(user)
    console.log(user)
  }

  return (
    <div className='container-login'>
      <div className='login'>
        <aside>
          <p>
            Just one step to <span>connect</span>
          </p>
          <img className='imageRegister' src={image} alt='Menina estudando' />
        </aside>
        <main>
          <div>
            <h1>Sign In</h1>
            <form className='auth' onSubmit={handleSubmit}>
              <input
                name='email'
                type='email'
                placeholder='Email'
                onChange={handleChange}
              />
              <input
                name='password'
                type='password'
                placeholder='Password'
                onChange={handleChange}
              />
              <button type='submit'>
                {loading ? 'Loading...' : 'Sign In'}
              </button>
            </form>
          </div>
          <span>
            Not registered?<Link to='/register'> Click here</Link>
          </span>
        </main>
      </div>
    </div>
  )
}
