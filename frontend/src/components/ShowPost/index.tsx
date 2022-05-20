import api from '../../services/api'
import { useState, useEffect } from 'react'

import { FiX } from 'react-icons/fi'

import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import '../styleSlide/slide.scss'

import { UserType } from '../../types'

import '../CreatePosts/CreatePosts.scss'

type Posts = {
  likes: number[]
  length: number
  subtitle: string
  comments: [c: { _id: string; Text: string }]
  _id: string
  images: string[]
  map(arg0: (image: string, index: number) => void): import('react').ReactNode
}

export default function ShowPost({ close, postId, userId }: any) {
  const [user, setUser] = useState({} as UserType)
  const [userComment, setUserComment] = useState([] as any)
  const [post, setPost] = useState([] as unknown as Posts)
  const [token] = useState(localStorage.getItem('token') || '')
  let userByComment: any = []

  useEffect(() => {
    api
      .get(`/posts/postById/${postId}`, {
        headers: {
          Authorization: `Baerer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPost(response.data.post)
        const users = response.data.post.comments.map((comment: any) => {
          return comment.postedBy
        })

      
        users.map(async (id: string) => {
          return (await api
            .get(`/users/${id}`, {
              headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
              },
            })
            .then((response) => {
              userByComment.push(response.data.user)
              setUserComment(userByComment)
              console.log(userByComment)
            }))
        })
      })
  }, [token, userComment])

  useEffect(() => {
    api
      .get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data.user)
      })
  }, [userId, token])

  const fadeProperties = {
    transitionDuration: 200,
    pauseOnHover: true,
    autoplay: false,
    indicators: true,
  }
  return (
    <article className='modal'>
      <button className='close' onClick={close}>
        <FiX size={30} color='#FFF' />
      </button>
      <section className='container_home'>
        <div>
          {post.images ? (
            <Slide {...fadeProperties}>
              {post.images.map((currentImage, index) => (
                <div key={index}>
                  <img
                    src={`${process.env.REACT_APP_API}/images/posts/${currentImage}`}
                    alt='publicação do usuário'
                  />
                </div>
              ))}
            </Slide>
          ) : (
            <div key={post._id}>
              <img
                src={`${process.env.REACT_APP_API}/images/posts/${post.images}`}
                alt='publicação do usuário'
              />
            </div>
          )}
        </div>
        <div>
          <h3>{user.name}</h3>
          <p>{post.subtitle}</p>
          <div>
            {post.comments
              ? post.comments.map((comment, index) => (
                  <>
                    <div>
                      <p key={index}>{comment.Text}</p>
                    </div>
                  </>
                ))
              : ''}
          </div>
        </div>
      </section>
    </article>
  )
}
