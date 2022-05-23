import { useEffect, useState } from 'react'
import api from '../../services/api'

import ShowPost from '../../components/ShowPost'

import { CgProfile } from 'react-icons/cg'
import { FiHeart } from 'react-icons/fi'
import { FaRegComment } from 'react-icons/fa'
import { BiDotsHorizontalRounded } from 'react-icons/bi'

import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import '../styleSlide/slide.scss'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import './post.scss'
import { Link } from 'react-router-dom'
import { IPostModel } from '../../lib/post/interfaces/IPostModel'

type Users = {
  name: string
  username: string
  email: string
  _id: any
  image: string
  [key: string]: any
}

type UserPost = {
  post: IPostModel
  user: Users
}

export default function Post({ post, user }: UserPost) {
  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const [comment, setComment] = useState('')
  const [currentComment, setCurrentComment] = useState('')
  const [userName, setUserName] = useState('')
  const [showPostModal, setShowPostModal] = useState(false)
  const [token] = useState(localStorage.getItem('token') || '')
  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id))
  }, [user._id, post.likes])

  function likeHandler(postId: string) {
    try {
      api.put(`/posts/${postId}/like`, { userId: user._id })
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1)

    setIsLiked(!isLiked)
  }

  function commentHandler(postId: string) {
    try {
      api.put(`/posts/${postId}/comment`, { text: comment, id: user._id })
      setCurrentComment(comment)
      setUserName(user.username)
      setComment('')
    } catch (err) {}
  }

  async function removePost(postId: string) {
    await api
      .delete(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        window.location.reload()
        return response.data
      })
      .catch((err) => {
        toast.error(JSON.stringify(err.response.data.message))
        return err.response.data
      })
  }

  function togglePostModal() {
    setShowPostModal(!showPostModal)
  }

  function toggleDeleteOption() {
    setShowDelete(!showDelete)
  }

  const fadeProperties = {
    transitionDuration: 200,
    pauseOnHover: true,
    autoplay: false,
    indicators: true,
  }

  return (
    <div className='post_container'>
      <div className='post'>
        <div className='user_post'>
          <>
            {post.user.image ? (
              <Link
                to={
                  post.user._id === user._id ? '/profile' : `${post.user._id}`
                }
              >
                <img
                  className='avatar'
                  src={`${process.env.REACT_APP_API}/images/users/${post.user.image}`}
                  alt='avatar'
                />
              </Link>
            ) : (
              <Link
                to={
                  post.user._id === user._id ? '/profile' : `${post.user._id}`
                }
              >
                <CgProfile className='avatar' size={25} />
              </Link>
            )}
            <Link
              to={post.user._id === user._id ? '/profile' : `${post.user._id}`}
            >
              <strong>{post.user.username}</strong>
            </Link>

            {post.user._id === user._id && (
              <>
                <BiDotsHorizontalRounded
                  onClick={toggleDeleteOption}
                  className='dots'
                  size={20}
                />

                <div
                  style={{ display: showDelete ? 'block' : 'none' }}
                  onClick={() => removePost(post._id)}
                  className='dropdown'
                >
                  Delete
                </div>
              </>
            )}
          </>
        </div>
        {post.images.length > 1 ? (
          <Slide className='slide' {...fadeProperties}>
            {post.images.map((currentImage, index) => (
              <div className='image' key={index}>
                <img
                  src={`${process.env.REACT_APP_API}/images/posts/${currentImage}`}
                  alt='user publication'
                />
              </div>
            ))}
          </Slide>
        ) : (
          <div className='image' key={post._id}>
            <img 
              src={`${process.env.REACT_APP_API}/images/posts/${post.images[0]}`}
              alt='user publication'
            />
          </div>
        )}
        <div className='footer_post'>
          <div>
            <div >
              {' '}
              <FiHeart
                onClick={() => likeHandler(post._id)}
                className={isLiked ? 'heart_red' : 'heart_white'}
                size={25}
              />
              <FaRegComment onClick={() => likeHandler(post._id)} className='heart_white' size={25} />
            </div>
          </div>
          {like > 0 && (
            <div>
              <strong>{like} likes</strong>
            </div>
          )}

          {post.subtitle && (
            <div>
              <Link
                to={
                  post.user._id === user._id ? '/profile' : `${post.user._id}`
                }
              >
                <strong>{post.user.username}</strong>
              </Link>{' '}
              {post.subtitle}
            </div>
          )}

          <div>
            {' '}
            {post.metadata.commentsLength > 0 &&
              (post.metadata.commentsLength > 1 ? (
                <div className='see_comment' onClick={() => togglePostModal()}>
                  see all {post.metadata.commentsLength} comments
                </div>
              ) : (
                <div className='see_comment' onClick={() => togglePostModal()}>
                  see {post.metadata.commentsLength} comment
                </div>
              ))}
          </div>
          <div>
            <Link to='/profile'>
              <strong>{userName}</strong>
            </Link>{' '}
            <span>{currentComment}</span>
          </div>
          <div className='form'>
            <textarea
              value={comment}
              placeholder='Add a comment...'
              onChange={(e) => setComment(e.target.value)}
            />
            {comment !== '' ? (
              <button onClick={() => commentHandler(post._id)}>Publish</button>
            ) : (
              <button disabled onClick={() => commentHandler(post._id)}>
                Publish
              </button>
            )}
          </div>
        </div>
      </div>

      {showPostModal && (
        <ShowPost close={togglePostModal} postId={post._id} userId={user._id} />
      )}
    </div>
  )
}
