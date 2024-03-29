import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import api from '../../services/api'

import Header from '../../components/Header/index'
import ShowPost from '../../components/ShowPost'

import avatar from '../../assets/avatar.png'

import { UserType, PostType } from '../../types'

import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

import './profile.scss'

export default function Profile(): JSX.Element {
  const [user, setUser] = useState({} as UserType)
  const [posts, setPosts] = useState([] as unknown as PostType)
  const [token] = useState(localStorage.getItem('token') || '')
  const [following, setFollowing] = useState()
  const [followers, setFollowers] = useState()
  const [postLength, setPostLength] = useState()
  const [showPostModal, setShowPostModal] = useState(false)
  const [idPost, setIdPost] = useState('')

  useEffect(() => {
    api
      .get('/users/checkuser', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data)
        setFollowing(response.data.following.length)
        setFollowers(response.data.followers.length)
      })
  }, [token])

  useEffect(() => {
    api
      .get('/posts/myposts', {
        headers: {
          Authorization: `Baerer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPosts(response.data.posts)
        setPostLength(response.data.posts.length)
      })
  }, [token])

  function togglePostModal(postId: string) {
    setShowPostModal(!showPostModal)
    setIdPost(postId)
  }

  return (
    <div>
      <Header />
      <section className='container_profile'>
        <div className='header_profile'>
          <div className='avatar'>
            <img
              src={
                user.image
                  ? `${process.env.REACT_APP_API}/images/users/${user.image}`
                  : avatar
              }
              alt='avatar'
            />
          </div>
          <section>
            <div className='row1'>
              <h2>{user.username}</h2>
              <button>
                <Link to='/edit'>Edit profile</Link>
              </button>
            </div>

            <div className='row2'>
              <ul>
                <li>
                  {postLength ? (
                    <strong>{postLength}</strong>
                  ) : (
                    <strong>0</strong>
                  )}{' '}
                  posts
                </li>
                <li>
                  <Link to='/profile/followers'>
                    {followers ? (
                      <strong>{followers}</strong>
                    ) : (
                      <strong>0</strong>
                    )}{' '}
                    followers
                  </Link>
                </li>
                <li>
                  <Link to='/profile/following'>
                    {following ? (
                      <strong>{following}</strong>
                    ) : (
                      <strong>0</strong>
                    )}{' '}
                    following
                  </Link>
                </li>
              </ul>
            </div>

            <div className='row3'>
              <h1>{user.name}</h1>
            </div>
          </section>
        </div>

        <hr />

        <article>
          <div className='posts'>
            {posts.length > 0 &&
              posts.map((post) => (
                <>
                  <div
                    className='post'
                    onClick={() => togglePostModal(post._id)}
                    key={post._id}
                  >
                    <img
                      src={`${process.env.REACT_APP_API}/images/posts/${post.images[0]}`}
                      alt='publicação do usuário'
                    />
                  </div>
                </>
              ))}
            {posts.length === 0 && <p>There are no registered posts yet!</p>}
          </div>
        </article>
      </section>
      {showPostModal && <ShowPost close={togglePostModal} postId={idPost} />}
    </div>
  )
}
