import api from '../../services/api'
import { useState, useEffect } from 'react'

import Header from '../../components/Header/index'
import Post from '../../components/Post'
import './home.scss'

import avatar from '../../assets/avatar.png'

import { UserType } from '../../types'
import { Link } from 'react-router-dom'

type PostType = {
  map(arg0: (p: any) => JSX.Element): import('react').ReactNode

  length: number
  subtitle: string[]
  comments: string[]
  _id: string
  images: string[]
}

export default function Home() {
  const [user, setUser] = useState({} as UserType)
  const [posts, setPosts] = useState([] as unknown as PostType)
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api
      .get('/users/checkuser', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)} `,
        },
      })
      .then((response) => {
        setUser(response.data)
      })
  }, [token])

  useEffect(() => {
    api
      .get('/posts/postsByFollowing', {
        headers: {
          Authorization: `Baerer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        console.log(response.data.posts)
        setPosts(response.data.posts)
      })
  }, [token])

  return (
    <div>
      <Header />
      <section className='container_home'>
        <div className='posts'>
          {posts.map((p) => (
            <Post key={p._id} post={p} user={user} />
          ))}
        </div>
        <article className='article'>
          <div>
            <Link to='/profile'>
              <img
                className='avatar'
                src={
                  user.image
                    ? `${process.env.REACT_APP_API}/images/users/${user.image}`
                    : avatar
                }
                alt='avatar'
              />
            </Link>{' '}
            <div>
              {' '}
              <span>
                <Link to='/profile'>
                  <strong>{user.username}</strong>
                </Link>
              </span>
              <span className='name'>{user.name}</span>
            </div>
          </div>
          <section>
            <span>
              <strong>Suggestions for you</strong>
            </span>
          </section>
        </article>
      </section>
    </div>
  )
}
