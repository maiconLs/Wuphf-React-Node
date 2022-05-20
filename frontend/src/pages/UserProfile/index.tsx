import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import api from '../../services/api'

import Header from '../../components/Header/index'
import ShowPost from '../../components/ShowPost'

import avatar from '../../assets/avatar.png'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { UserType, PostType } from '../../types'

import '../Profile/profile.scss'

export default function UserProfile(): JSX.Element {
  const [user, setUser] = useState({} as UserType)
  const [showFollow, setShowFollow] = useState('')
  const { userid } = useParams()
  const [posts, setPosts] = useState([] as unknown as PostType)
  const [token] = useState(localStorage.getItem('token') || '')
  const [following, setFollowing] = useState(Number)
  const [followers, setFollowers] = useState(Number)
  const [postLength, setPostLength] = useState(Number)
  const [showPostModal, setShowPostModal] = useState(false)
  const [idPost, setIdPost] = useState('')

  useEffect(() => {
    api
      .get(`/users/${userid}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data.user)
        setPosts(response.data.posts)
        setFollowing(response.data.user.following.length)
        setFollowers(response.data.user.followers.length)
        setPostLength(response.data.posts.length)
      })
  }, [userid, token])

  useEffect(() => {
    api
      .get('/users/checkuser', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)} `,
        },
      })
      .then((response) => {
        console.log(response.data.following.includes(user._id))
        if (response.data.following.includes(user._id)) {
          setShowFollow('Unfollow')
        } else {
          setShowFollow('Follow')
        }
      })
  }, [token])

  function follow(userId: number) {
    api
      .put(`users/follow/${userId}`, {
        headers: {
          Authorization: `Baerer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        if (response.data.following.includes(user._id)) {
          setShowFollow('Follow')
          setFollowers(followers - 1)
        } else {
          setShowFollow('Unfollow')
          setFollowers(followers + 1)
        }
        return response.data
      })
      .catch((error) => {
        toast.error(JSON.stringify(error.response.data.message))
        return error.response.data
      })
  }

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
              <button onClick={() => follow(user._id)}>{showFollow}</button>
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
              ))}
            {posts.length === 0 && <p>There are no registered posts yet!</p>}
          </div>
        </article>
      </section>
      {showPostModal && <ShowPost close={togglePostModal} postId={idPost} />}
    </div>
  )
}
