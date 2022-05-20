import { useEffect, useState } from 'react'
import Header from '../../components/Header'

import api from '../../services/api'

import ShowPost from '../../components/ShowPost'

import { UserType } from '../../types'

import './allposts.scss'

type PostType = {
  map(arg0: (p: any) => JSX.Element): import('react').ReactNode

  length: number
  subtitle: string[]
  comments: string[]
  _id: string
  images: string[]
}

export default function AllPosts() {
  const [user, setUser] = useState({} as UserType)
  const [posts, setPosts] = useState([] as unknown as PostType)
  const [token] = useState(localStorage.getItem('token') || '')
  const [showPostModal, setShowPostModal] = useState(false)

  useEffect(() => {
    api
      .get('/posts/allposts', {
        headers: {
          Authorization: `Baerer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPosts(response.data.posts)
      })
  }, [token])

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

  function togglePostModal() {
    setShowPostModal(!showPostModal)
  }

  return (
    <main>
      <Header />
      <div className='allposts' onClick={() => togglePostModal()} >
        {posts.map((p) => (
          <div key={p._id}>
            <img
              src={`${process.env.REACT_APP_API}/images/posts/${p.images[0]}`}
              alt='user publication'
            />
            {showPostModal && (
              <ShowPost
                close={togglePostModal}
                postId={p._id}
                userId={user._id}
              />
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
